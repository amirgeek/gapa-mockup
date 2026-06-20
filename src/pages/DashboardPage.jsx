import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

const sessionImages = [
  'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80',
]

const guidedSteps = [
  'Entender qué me pasa',
  'Identificar mi patrón',
  'Aprender herramientas',
  'Aplicarlas en mi vida',
]

const explainPillars = [
  'Qué es la ansiedad y por qué no siempre es peligrosa',
  'Cómo funciona en vos: disparador, interpretación, activación y mantenimiento',
  'Por qué se sostiene: evitación, control excesivo e hipervigilancia',
  'Cómo regularla desde cuerpo, pensamiento, conducta y emoción',
]

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(dateString))
}

function formatTime(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function DashboardPage() {
  const {
    currentUser,
    state,
    enrollInSession,
    saveDailyCheckIn,
    saveProcessGoals,
    saveProcessEntry,
    addExposureStep,
  } = useAppContext()
  const [goalsDraft, setGoalsDraft] = useState(() => (currentUser?.processGoals ?? []).join('\n'))
  const [entryForm, setEntryForm] = useState({
    situation: '',
    thought: '',
    response: '',
    outcome: '',
  })
  const [exposureInput, setExposureInput] = useState('')
  const [feedback, setFeedback] = useState('')

  const today = new Date().toISOString().slice(0, 10)
  const todaysCheckIn = currentUser?.dailyCheckIns?.find((entry) => entry.date === today)?.level ?? null
  const recommendedResources = state.campusItems.filter((item) =>
    item.audienceProfiles?.includes(currentUser?.profileCategory),
  )
  const upcomingSessions = [...state.sessions].sort((a, b) => a.datetime.localeCompare(b.datetime))
  const featuredSession = upcomingSessions[0]
  const joinedSessions = upcomingSessions.filter((session) =>
    currentUser?.joinedSessionIds?.includes(session.id),
  )
  const processEntries = currentUser?.processEntries ?? []
  const exposureSteps = currentUser?.exposureSteps ?? []

  function handleSaveGoals() {
    const result = saveProcessGoals(
      goalsDraft
        .split('\n')
        .map((goal) => goal.trim())
        .filter(Boolean),
    )

    if (result?.ok) {
      setFeedback('Objetivos actualizados.')
    }
  }

  function handleEntrySubmit(event) {
    event.preventDefault()
    const result = saveProcessEntry(entryForm)

    if (result?.ok) {
      setEntryForm({
        situation: '',
        thought: '',
        response: '',
        outcome: '',
      })
      setFeedback('Registro guardado en Mi proceso.')
    }
  }

  function handleAddExposure(event) {
    event.preventDefault()
    const result = addExposureStep(exposureInput)

    if (result?.ok) {
      setExposureInput('')
      setFeedback('Desafío agregado a tu hoja de ruta.')
    }
  }

  return (
    <div className="dashboard-grid">
      <section className="dash-hero">
        <div>
          <p className="eyebrow no-rule" style={{ color: 'var(--green-light)' }}>
            Inicio para miembros
          </p>
          <h2 className="h2" style={{ marginTop: 10, color: '#FBFBFA' }}>
            Tu proceso, tus sesiones y tus recursos ya están ordenados.
          </h2>
          <p className="body" style={{ color: 'rgba(251,251,250,0.82)', marginTop: 12 }}>
            Este espacio está pensado para personas con membresía activa. Acá no hay panel
            operativo ni configuraciones de admin, solo tu recorrido dentro de GAPA.
          </p>
          <div className="hero-meta-row">
            {Array.from({ length: 10 }, (_, index) => {
              const level = index + 1
              const active = todaysCheckIn === level
              return (
                <button
                  key={level}
                  type="button"
                  className="hero-meta"
                  style={{
                    border: active ? '1px solid rgba(255,255,255,0.52)' : '1px solid transparent',
                    background: active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                  }}
                  onClick={() => saveDailyCheckIn(level)}
                >
                  <strong>{level}</strong>
                </button>
              )
            })}
          </div>
          <p className="body-sm" style={{ color: 'rgba(251,251,250,0.78)', marginTop: 12 }}>
            ¿Cómo estás hoy? {todaysCheckIn ? `${todaysCheckIn}/10` : 'Todavía no cargaste tu nivel.'}
          </p>
        </div>
        <div className="hero-art">
          <img src={sessionImages[0]} alt="Momento de pausa" />
        </div>
      </section>

      <section className="grid-4">
        <article className="stat-tile">
          <span className="label">Perfil actual</span>
          <span className="value" style={{ fontSize: 28 }}>
            {currentUser?.profileCategory ?? 'Sin definir'}
          </span>
          <span className="trend">Mapeado desde onboarding</span>
        </article>
        <article className="stat-tile">
          <span className="label">Sesiones reservadas</span>
          <span className="value">{currentUser?.joinedSessionIds?.length ?? 0}</span>
          <span className="trend">Acceso privado al Meet</span>
        </article>
        <article className="stat-tile">
          <span className="label">Recursos sugeridos</span>
          <span className="value">{recommendedResources.length}</span>
          <span className="trend">Según tu perfil interno</span>
        </article>
        <article className="stat-tile">
          <span className="label">Estado de hoy</span>
          <span className="value">{todaysCheckIn ?? '-'}</span>
          <span className="trend">Escala rápida 0-10</span>
        </article>
      </section>

      {feedback ? (
        <section className="member-feedback">
          <p className="body-sm">{feedback}</p>
        </section>
      ) : null}

      <section className="member-section">
        <div className="member-section-head">
          <div>
            <p className="eyebrow no-rule">Info / Psicoeducación</p>
            <h3 className="h3" style={{ marginTop: 6 }}>
              Entender cómo funciona tu ansiedad
            </h3>
          </div>
          <Link to="/app/campus" className="btn btn-ghost btn-sm">
            Abrir campus
          </Link>
        </div>
        <p className="body-sm" style={{ maxWidth: '66ch' }}>
          El foco es bajar la idea de peligro y reemplazarla por comprensión: qué se activa, cómo
          se mantiene y qué herramientas podés empezar a aplicar en situaciones reales.
        </p>
        <div className="member-topic-list">
          {explainPillars.map((item) => (
            <div key={item} className="member-topic-item">
              <span className="member-topic-bullet" />
              <p className="body">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="member-section">
        <div className="member-section-head">
          <div>
            <p className="eyebrow no-rule">Reuniones</p>
            <h3 className="h3" style={{ marginTop: 6 }}>
              Tus próximas sesiones y el acceso a tus encuentros
            </h3>
          </div>
          <Link to="/app/sesiones" className="btn btn-ghost btn-sm">
            Ver agenda completa
          </Link>
        </div>
        <div className="member-section-grid">
          <div className="stack">
            {upcomingSessions.slice(0, 2).map((session, index) => (
              <article key={session.id} className="resource-card">
                <div className="resource-cover" style={{ height: 180 }}>
                  <img src={sessionImages[index % sessionImages.length]} alt={session.title} />
                  <span className="cover-tag">
                    {formatDate(session.datetime)} · {formatTime(session.datetime)}
                  </span>
                </div>
                <div className="body">
                  <h3 className="h4">{session.title}</h3>
                  <p className="body-sm" style={{ marginTop: 8 }}>
                    {session.professional} · {session.category}
                  </p>
                  <div className="row-wrap" style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => enrollInSession(session.id)}
                    >
                      Reservar lugar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Ya reservadas</p>
              <h4 className="h4" style={{ marginTop: 6 }}>
                Encuentros inscriptos
              </h4>
            </div>
            {joinedSessions.length ? (
              joinedSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="member-lined-item">
                  <strong>{session.title}</strong>
                  <span>
                    {formatDate(session.datetime)} · {formatTime(session.datetime)} · acceso privado
                  </span>
                </div>
              ))
            ) : (
              <p className="body-sm">
                Todavía no reservaste encuentros. Desde esta sección podés sumarte a las próximas
                sesiones publicadas.
              </p>
            )}
            {featuredSession ? (
              <div className="member-note">
                <strong>Próxima sugerida:</strong> {featuredSession.title}
              </div>
            ) : null}
          </article>
        </div>
      </section>

      <section className="member-section">
        <div className="member-section-head">
          <div>
            <p className="eyebrow no-rule">Mi proceso</p>
            <h3 className="h3" style={{ marginTop: 6 }}>
              Seguimiento personal, hoja de ruta y exposición gradual
            </h3>
          </div>
          <span className="tag neutral">{processEntries.length} registros guardados</span>
        </div>
        <div className="member-section-grid">
          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Objetivos actuales</p>
              <p className="body-sm" style={{ marginTop: 8 }}>
                Un objetivo por línea para sostener foco y continuidad.
              </p>
            </div>
            <textarea
              rows={5}
              value={goalsDraft}
              onChange={(event) => setGoalsDraft(event.target.value)}
              placeholder="Escribí tus objetivos actuales"
            />
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveGoals}>
              Guardar objetivos
            </button>
            <div className="member-step-strip">
              {guidedSteps.map((step, index) => (
                <div key={step} className="member-step-item">
                  <span className="label">Paso {index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Mapa rápido de ansiedad</p>
              <p className="body-sm" style={{ marginTop: 8 }}>
                Registrá situación, pensamiento, respuesta y resultado.
              </p>
            </div>
            <form className="stack-sm" onSubmit={handleEntrySubmit}>
              <input
                value={entryForm.situation}
                onChange={(event) =>
                  setEntryForm((current) => ({ ...current, situation: event.target.value }))
                }
                placeholder="Situación que activó la ansiedad"
              />
              <input
                value={entryForm.thought}
                onChange={(event) =>
                  setEntryForm((current) => ({ ...current, thought: event.target.value }))
                }
                placeholder="Qué pensé"
              />
              <input
                value={entryForm.response}
                onChange={(event) =>
                  setEntryForm((current) => ({ ...current, response: event.target.value }))
                }
                placeholder="Qué hice o qué evité"
              />
              <textarea
                rows={3}
                value={entryForm.outcome}
                onChange={(event) =>
                  setEntryForm((current) => ({ ...current, outcome: event.target.value }))
                }
                placeholder="Qué pasó después"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Guardar registro
              </button>
            </form>
          </article>
        </div>

        <div className="member-section-grid">
          <article className="surface-card stack">
            <div className="row-between">
              <div>
                <p className="eyebrow no-rule">Exposición gradual</p>
                <p className="body-sm" style={{ marginTop: 8 }}>
                  Desafíos concretos para no quedar atrapado en la evitación.
                </p>
              </div>
              <span className="tag neutral">{exposureSteps.length} desafíos</span>
            </div>
            <form className="row-wrap" onSubmit={handleAddExposure}>
              <input
                value={exposureInput}
                onChange={(event) => setExposureInput(event.target.value)}
                placeholder="Ej: responder un mensaje sin releerlo cinco veces"
              />
              <button type="submit" className="btn btn-ghost btn-sm">
                Agregar desafío
              </button>
            </form>
            <div className="stack-sm">
              {exposureSteps.slice(0, 4).map((step) => (
                <div key={step.id} className="member-lined-item">
                  <strong>{step.text}</strong>
                  <span>Pendiente</span>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card stack">
            <div>
              <p className="eyebrow no-rule">Últimos registros</p>
              <p className="body-sm" style={{ marginTop: 8 }}>
                Tu recorrido queda visible para que puedas detectar patrones con más claridad.
              </p>
            </div>
            <div className="stack-sm">
              {processEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="member-journal-entry">
                  <strong>{entry.situation}</strong>
                  <p className="body-sm">
                    <strong>Pensamiento:</strong> {entry.thought}
                  </p>
                  <p className="body-sm">
                    <strong>Respuesta:</strong> {entry.response}
                  </p>
                  <p className="body-sm">
                    <strong>Resultado:</strong> {entry.outcome}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
