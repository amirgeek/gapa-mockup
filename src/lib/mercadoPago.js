export async function createMercadoPagoPreference(payload) {
  const response = await fetch('/api/create-preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data?.message ?? 'No pudimos preparar el pago con Mercado Pago en este momento.',
    )
  }

  return data
}
