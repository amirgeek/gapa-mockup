/* global process */
import { getSupabaseAdmin } from './_supabaseAdmin.js'

const preapprovalStatusToMembershipStatus = {
  authorized: 'active',
  paused: 'past_due',
  cancelled: 'cancelled',
  pending: 'pending',
}

async function fetchMercadoPagoResource(path, accessToken) {
  const result = await fetch(`https://api.mercadopago.com${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!result.ok) {
    return null
  }

  return result.json()
}

async function handlePreapprovalNotification({ preapprovalId, accessToken, supabaseAdmin }) {
  const preapproval = await fetchMercadoPagoResource(`/preapproval/${preapprovalId}`, accessToken)

  if (!preapproval?.external_reference) {
    return
  }

  const profileId = preapproval.external_reference
  const membershipStatus = preapprovalStatusToMembershipStatus[preapproval.status] ?? 'pending'

  await supabaseAdmin
    .from('profiles')
    .update({
      membership_status: membershipStatus,
      membership_provider: 'mercado_pago',
    })
    .eq('id', profileId)

  await supabaseAdmin
    .from('membership_payments')
    .update({
      status: preapproval.status,
      paid_at: membershipStatus === 'active' ? new Date().toISOString() : null,
    })
    .eq('provider_reference', preapprovalId)
}

async function handlePaymentNotification({ paymentId, accessToken, supabaseAdmin }) {
  const payment = await fetchMercadoPagoResource(`/v1/payments/${paymentId}`, accessToken)

  if (!payment?.external_reference) {
    return
  }

  const profileId = payment.external_reference
  const isApproved = payment.status === 'approved'

  const { data: existing } = await supabaseAdmin
    .from('membership_payments')
    .select('id')
    .eq('provider_reference', String(paymentId))
    .maybeSingle()

  if (existing?.id) {
    await supabaseAdmin
      .from('membership_payments')
      .update({
        status: payment.status,
        paid_at: isApproved ? new Date().toISOString() : null,
      })
      .eq('id', existing.id)
  } else {
    await supabaseAdmin.from('membership_payments').insert({
      profile_id: profileId,
      provider: 'mercado_pago',
      provider_reference: String(paymentId),
      amount_in_ars: Math.round(payment.transaction_amount ?? 0),
      currency: 'ARS',
      status: payment.status,
      paid_at: isApproved ? new Date().toISOString() : null,
    })
  }

  if (isApproved) {
    await supabaseAdmin
      .from('profiles')
      .update({ membership_status: 'active', membership_provider: 'mercado_pago' })
      .eq('id', profileId)
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Método no permitido.' })
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  const supabaseAdmin = getSupabaseAdmin()

  if (!accessToken || !supabaseAdmin) {
    return response.status(503).json({
      message: 'Faltan credenciales para procesar la notificación de Mercado Pago.',
    })
  }

  const body = request.body ?? {}
  const query = request.query ?? {}
  const type = body.type ?? body.topic ?? query.type ?? query.topic
  const resourceId = body.data?.id ?? query['data.id'] ?? query.id

  if (!resourceId) {
    return response.status(200).json({ message: 'Notificación sin id de recurso, ignorada.' })
  }

  try {
    if (type === 'subscription_preapproval' || type === 'preapproval') {
      await handlePreapprovalNotification({ preapprovalId: resourceId, accessToken, supabaseAdmin })
    } else if (type === 'payment') {
      await handlePaymentNotification({ paymentId: resourceId, accessToken, supabaseAdmin })
    }

    return response.status(200).json({ received: true })
  } catch (error) {
    return response.status(500).json({
      message: 'No pudimos procesar la notificación de Mercado Pago.',
      details: error?.message ?? 'Error desconocido',
    })
  }
}
