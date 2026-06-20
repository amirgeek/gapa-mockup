import { useMemo } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'

function formatMonth(dateString) {
  return new Intl.DateTimeFormat('es-AR', { month: 'short' }).format(new Date(dateString))
}

function lastCheckInLabel(dailyCheckIns) {
  if (!dailyCheckIns?.length) {
    return 'Todavía no registraste tu estado de hoy.'
  }

  const latest = [...dailyCheckIns].sort((a, b) => b.date.localeCompare(a.date))[0]
  return `${latest.level}/10 · ${latest.date}`
}

function buildCheckInChart(dailyCheckIns = []) {
  return [...dailyCheckIns]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .map((entry) => ({
      ...entry,
      height: `${Math.max(18, entry.level * 10)}%`,
    }))
}

function buildMonthlyReport(currentUser) {
  const dailyCheckIns = currentUser?.dailyCheckIns ?? []
  const processEntries = currentUser?.processEntries ?? []
  const exposureSteps = currentUser?.exposureSteps ?? []
  const sosHistory = currentUser?.sosHistory ?? []
  const checkInChart = buildCheckInChart(dailyCheckIns)

  const averageCheckIn = dailyCheckIns.length
    ? (
        dailyCheckIns.reduce((sum, entry) => sum + Number(entry.level || 0), 0) /
        dailyCheckIns.length
      ).toFixed(1)
    : null

  const monthlyBuckets = new Map()
  dailyCheckIns.forEach((entry) => {
    const key = entry.date.slice(0, 7)
    const current = monthlyBuckets.get(key) ?? { total: 0, count: 0, label: formatMonth(entry.date) }
    monthlyBuckets.set(key, {
      ...current,
      total: current.total + Number(entry.level || 0),
      count: current.count + 1,
    })
  })

  const monthTrend = [...monthlyBuckets.entries()].slice(-3).map(([key, value]) => ({
    key,
    label: value.label,
    average: (value.total / value.count).toFixed(1),
    width: `${Math.max(14, (value.total / value.count) * 10)}%`,
  }))

  return {
    averageCheckIn,
    checkInChart,
    monthTrend,
    processEntriesCount: processEntries.length,
    exposureStepsCount: exposureSteps.length,
    sosUsesCount: sosHistory.length,
  }
}

export function ProfilePage() {
  const { currentUser } = useAppContext()
  const monthlyReport = useMemo(() => buildMonthlyReport(currentUser), [currentUser])

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

      <section className="member-section">
        <div className="member-section-head">
          <div>
            <p className="eyebrow no-rule">Seguimiento y reportes</p>
            <h2 className="h3" style={{ marginTop: 6 }}>
              Tu evolución dentro de la plataforma
            </h2>
          </div>
          <span className="tag neutral">Actualización continua</span>
        </div>

        <div className="profile-report-grid">
          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Tendencia reciente</p>
              <h3 className="h3" style={{ marginTop: 8 }}>
                Check-ins de los últimos días
              </h3>
            </div>
            {monthlyReport.checkInChart.length ? (
              <div className="profile-chart">
                {monthlyReport.checkInChart.map((entry) => (
                  <div key={entry.date} className="profile-chart-bar-wrap">
                    <div className="profile-chart-bar" style={{ height: entry.height }}>
                      <span>{entry.level}</span>
                    </div>
                    <small>{entry.date.slice(5)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="body-sm">
                Cuando empieces a registrar tu estado diario, acá vas a ver una curva simple de
                evolución.
              </p>
            )}
          </article>

          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Reporte mensual</p>
              <h3 className="h3" style={{ marginTop: 8 }}>
                Lectura rápida de actividad
              </h3>
            </div>
            <div className="grid-3">
              <div className="member-lined-item">
                <strong>{monthlyReport.averageCheckIn ?? '-'}</strong>
                <span>Promedio de check-in</span>
              </div>
              <div className="member-lined-item">
                <strong>{monthlyReport.processEntriesCount}</strong>
                <span>Registros del proceso</span>
              </div>
              <div className="member-lined-item">
                <strong>{monthlyReport.exposureStepsCount}</strong>
                <span>Desafíos activos</span>
              </div>
            </div>
            <div className="stack-sm">
              {monthlyReport.monthTrend.length ? (
                monthlyReport.monthTrend.map((month) => (
                  <div key={month.key} className="profile-progress-row">
                    <div>
                      <strong>{month.label}</strong>
                      <span>Promedio {month.average}/10</span>
                    </div>
                    <div className="profile-progress-track">
                      <div className="profile-progress-fill" style={{ width: month.width }} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="body-sm">Todavía no hay suficientes datos para armar reporte mensual.</p>
              )}
            </div>
          </article>
        </div>

        <div className="profile-report-grid">
          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Actividad de proceso</p>
              <h3 className="h3" style={{ marginTop: 8 }}>
                Cómo venís usando tus herramientas
              </h3>
            </div>
            <div className="stack-sm">
              <div className="member-lined-item">
                <strong>{monthlyReport.processEntriesCount}</strong>
                <span>Registros cargados en “Mi proceso”</span>
              </div>
              <div className="member-lined-item">
                <strong>{monthlyReport.exposureStepsCount}</strong>
                <span>Pasos de exposición gradual guardados</span>
              </div>
              <div className="member-lined-item">
                <strong>{monthlyReport.sosUsesCount}</strong>
                <span>Usos recientes del espacio SOS</span>
              </div>
            </div>
          </article>

          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Lectura clínica simple</p>
              <h3 className="h3" style={{ marginTop: 8 }}>
                Señales para seguir el recorrido
              </h3>
            </div>
            <p className="body-sm">
              Este perfil no busca etiquetarte, sino ayudarte a ver si estás logrando registrar,
              sostener hábitos y construir evidencia nueva frente a la ansiedad.
            </p>
            <div className="member-note">
              <strong>Lectura actual:</strong>{' '}
              {monthlyReport.processEntriesCount > 0
                ? 'ya hay movimiento real en tu proceso y podemos empezar a mirar patrones.'
                : 'el siguiente buen paso es empezar a cargar registros y check-ins para tener trazabilidad.'}
            </div>
          </article>
        </div>
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
