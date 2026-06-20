/* global process */

const planCatalog = {
  Mensual: {
    title: 'Membresía GAPA Mensual',
    amount: 24999,
    frequency: 1,
    frequencyType: 'months',
  },
  Trimestral: {
    title: 'Membresía GAPA Trimestral',
    amount: 69900,
    frequency: 3,
    frequencyType: 'months',
  },
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Método no permitido.' })
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    return response.status(503).json({
      message:
        'Mercado Pago ya está preparado, pero faltan las credenciales reales para crear la suscripción recurrente.',
      code: 'mercadopago_not_configured',
    })
  }

  const {
    plan = 'Mensual',
    email,
    successUrl,
  } = request.body ?? {}

  const selectedPlan = planCatalog[plan] ?? planCatalog.Mensual

  try {
    const result = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        reason: selectedPlan.title,
        external_reference: `gapa-${plan.toLowerCase()}-${Date.now()}`,
        payer_email: email,
        back_url: successUrl ?? 'https://gapa-mockup.vercel.app/login',
        auto_recurring: {
          frequency: selectedPlan.frequency,
          frequency_type: selectedPlan.frequencyType,
          start_date: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          transaction_amount: selectedPlan.amount,
          currency_id: 'ARS',
        },
        status: 'pending',
      }),
    })

    const data = await result.json()

    if (!result.ok) {
      return response.status(result.status).json({
        message: 'No pudimos crear la suscripción en Mercado Pago.',
        details: data?.message ?? data?.cause ?? 'Error desconocido',
      })
    }

    return response.status(200).json({
      id: data.id,
      initPoint: data.init_point,
      status: data.status,
      amount: selectedPlan.amount,
      frequency: selectedPlan.frequency,
      frequencyType: selectedPlan.frequencyType,
      payerEmail: email,
      reason: selectedPlan.title,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'No pudimos crear la suscripción recurrente.',
      details: error?.message ?? 'Error desconocido',
    })
  }
}
