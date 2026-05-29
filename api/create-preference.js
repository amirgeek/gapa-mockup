/* global process */
import { MercadoPagoConfig, Preference } from 'mercadopago'

const planCatalog = {
  Mensual: {
    title: 'Membresía GAPA Mensual',
    price: 14900,
  },
  Trimestral: {
    title: 'Membresía GAPA Trimestral',
    price: 11900,
  },
  Anual: {
    title: 'Membresía GAPA Anual',
    price: 9500,
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
        'Mercado Pago ya está preparado, pero faltan las credenciales reales para crear la preferencia de pago.',
      code: 'mercadopago_not_configured',
    })
  }

  const {
    plan = 'Mensual',
    email,
    fullName,
    successUrl,
    failureUrl,
    pendingUrl,
  } = request.body ?? {}

  const selectedPlan = planCatalog[plan] ?? planCatalog.Mensual

  try {
    const client = new MercadoPagoConfig({ accessToken })
    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: [
          {
            title: selectedPlan.title,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: selectedPlan.price,
          },
        ],
        payer: {
          email,
          name: fullName,
        },
        back_urls: {
          success: successUrl ?? 'https://gapa-mockup.vercel.app/login',
          failure: failureUrl ?? 'https://gapa-mockup.vercel.app/registro',
          pending: pendingUrl ?? 'https://gapa-mockup.vercel.app/registro',
        },
        auto_return: 'approved',
      },
    })

    return response.status(200).json({
      id: result.id,
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
    })
  } catch (error) {
    return response.status(500).json({
      message: 'No pudimos crear la preferencia de pago.',
      details: error?.message ?? 'Error desconocido',
    })
  }
}
