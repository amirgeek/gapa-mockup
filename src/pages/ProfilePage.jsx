import { useMemo } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

function lastCheckInLabel(dailyCheckIns) {
  if (!dailyCheckIns?.length) {
    return 'Todavía no registraste tu estado de hoy.'
  }

  const latest = [...dailyCheckIns].sort((a, b) => b.date.localeCompare(a.date))[0]
  return `${latest.level}/10 · ${latest.date}`
}

export function ProfilePage() {
  const { currentUser } = useAppContext()

  const stats = useMemo(
    () => [
      {
        label: 'Membresía',
        value: currentUser?.membershipPlan ?? 'Sin plan',
        note: currentUser?.membershipStatus ?? 'pendiente',
      },
      {
        label: 'Perfil interno',
        value: currentUser?.profileCategory ?? 'Sin definir',
        note: 'Detectado desde onboarding',
      },
      {
        label: 'Check-in reciente',
        value: lastCheckInLabel(currentUser?.dailyCheckIns),
        note: 'Registro emocional',
      },
    ],
    [currentUser],
  )

  const supportMessage =
    currentUser?.onboardingSummary?.supportMessage ??
    'Tu cuenta está activa y lista para seguir avanzando dentro del campus, las sesiones y tu proceso.'

  return (
    <div className="page-stack">
      <section className="page-cover">
        <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
          Mi perfil
        </p>
        <h1 style={{ color: '#FBFBFA', marginTop: 10 }}>Tu cuenta, tu membresía y tu punto de partida.</h1>
        <p className="lead" style={{ marginTop: 16, maxWidth: '58ch' }}>
          Acá podés ver cómo quedó configurado tu acceso a GAPA, qué perfil interno detectó el
          onboarding y desde dónde estás arrancando hoy.
        </p>
      </section>

      <section className="grid-3">
        {stats.map((stat) => (
          <article key={stat.label} className="surface-card">
            <p className="eyebrow no-rule">{stat.label}</p>
            <h2 className="h3" style={{ marginTop: 10 }}>
              {stat.value}
            </h2>
            <p className="body-sm" style={{ marginTop: 8 }}>
              {stat.note}
            </p>
          </article>
        ))}
      </section>

      <section className="member-section-grid">
        <article className="surface-card stack">
          <div>
            <p className="eyebrow no-rule">Datos de cuenta</p>
            <h2 className="h3" style={{ marginTop: 8 }}>
              Información principal
            </h2>
          </div>
          <div className="member-lined-item">
            <strong>Nombre</strong>
            <span>{currentUser?.name ?? '-'}</span>
          </div>
          <div className="member-lined-item">
            <strong>Correo</strong>
            <span>{currentUser?.email ?? '-'}</span>
          </div>
          <div className="member-lined-item">
            <strong>Proveedor de membresía</strong>
            <span>{currentUser?.membershipProvider ?? 'No informado'}</span>
          </div>
          <div className="member-lined-item">
            <strong>Estado</strong>
            <span>{currentUser?.membershipStatus ?? 'pendiente'}</span>
          </div>
        </article>

        <article className="surface-card stack">
          <div>
            <p className="eyebrow no-rule">Resumen clínico inicial</p>
            <h2 className="h3" style={{ marginTop: 8 }}>
              Lo que detectó tu onboarding
            </h2>
          </div>
          <p className="body-sm">{supportMessage}</p>
          <div className="member-lined-item">
            <strong>Bienestar afectado</strong>
            <span>{currentUser?.onboardingSummary?.wellbeingLevel ?? '-'} / 10</span>
          </div>
          <div className="member-lined-item">
            <strong>Ansiedad actual</strong>
            <span>{currentUser?.onboardingSummary?.intensityNow ?? '-'} / 10</span>
          </div>
          <div className="member-lined-item">
            <strong>Riesgo reportado</strong>
            <span>{currentUser?.onboardingSummary?.riskLevel ?? 'nunca'}</span>
          </div>
        </article>
      </section>
    </div>
  )
}
