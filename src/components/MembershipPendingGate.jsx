import { useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { createMercadoPagoSubscription } from '../lib/mercadoPago.js'
import { AppIcon } from './AppIcon.jsx'

const statusCopy = {
  pending: {
    title: 'Tu pago está en proceso.',
    body: 'Ya creamos tu cuenta. En cuanto Mercado Pago confirme la suscripción vas a tener acceso completo al campus, las sesiones y tu seguimiento.',
  },
  past_due: {
    title: 'Tu suscripción quedó pausada.',
    body: 'Mercado Pago no pudo procesar el último cobro. Reintentá el pago para reactivar tu membresía.',
  },
  cancelled: {
    title: 'Tu membresía está cancelada.',
    body: 'Iniciá una nueva suscripción para volver a tener acceso completo a GAPA.',
  },
}

export function MembershipPendingGate() {
  const { currentUser, refreshCurrentProfile } = useAppContext()
  const [creatingPreference, setCreatingPreference] = useState(false)
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState('')

  const copy = statusCopy[currentUser?.membershipStatus] ?? statusCopy.pending

  async function handleRetryCheckout() {
    setMessage('')
    setCreatingPreference(true)

    try {
      const subscription = await createMercadoPagoSubscription({
        plan: currentUser.membershipPlan ?? 'Mensual',
        email: currentUser.email,
        profileId: currentUser.id,
      })

      if (subscription.initPoint) {
        window.open(subscription.initPoint, '_blank', 'noopener,noreferrer')
        setMessage('Abrimos el checkout de Mercado Pago en otra pestaña.')
      } else {
        setMessage('No recibimos un link de checkout. Probá de nuevo en unos minutos.')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setCreatingPreference(false)
    }
  }

  async function handleCheckStatus() {
    setMessage('')
    setChecking(true)
    const result = await refreshCurrentProfile()
    setChecking(false)

    if (!result.ok) {
      setMessage(result.message ?? 'No pudimos actualizar tu estado todavía.')
      return
    }

    if (result.user?.membershipStatus === 'active') {
      setMessage('¡Listo! Tu membresía ya está activa.')
      return
    }

    setMessage('Mercado Pago todavía no confirmó el pago. Probá de nuevo en unos minutos.')
  }

  return (
    <div className="card" style={{ padding: 32, maxWidth: 560, margin: '40px auto' }}>
      <p className="eyebrow no-rule" style={{ color: 'var(--red)' }}>
        Membresía pendiente
      </p>
      <h2 className="h2" style={{ marginTop: 8 }}>
        {copy.title}
      </h2>
      <p className="body-sm" style={{ marginTop: 12 }}>
        {copy.body}
      </p>

      <div className="row-wrap" style={{ marginTop: 24, gap: 12 }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRetryCheckout}
          disabled={creatingPreference}
          style={{ opacity: creatingPreference ? 0.7 : 1 }}
        >
          {creatingPreference ? 'Preparando checkout...' : 'Reintentar con Mercado Pago'}
          <AppIcon name="arrow" size={16} />
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={handleCheckStatus}
          disabled={checking}
        >
          {checking ? 'Actualizando...' : 'Ya pagué, revisar estado'}
        </button>
      </div>

      {message ? (
        <p className="body-sm" style={{ marginTop: 16 }}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
