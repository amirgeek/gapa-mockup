import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

const sessionImages = [
  'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80',
]

const moduleCards = [
  {
    id: 'entender',
    label: 'Info / Psicoeducación',
    title: 'Entender qué pasa con tu ansiedad',
    body: 'Base conceptual sin patologizar: qué es la ansiedad, cuándo se vuelve problema, qué la dispara y cómo se mantiene.',
  },
  {
    id: 'grupo',
    label: 'Reuniones',
    title: 'Encontrar apoyo en comunidad',
    body: 'Sesiones, encuentros y un espacio donde identificarte con otras personas que transitan algo parecido.',
  },
  {
    id: 'proceso',
    label: 'Mi proceso',
    title: 'Registrar avances y sostener cambios',
    body: 'Seguimiento personal, hoja de ruta, desafíos y exposición gradual para no perder continuidad.',
  },
  {
    id: 'sos',
    label: 'Botón de emergencia',
    title: 'Tener herramientas en el momento',
    body: 'Respiración guiada, grounding, protocolos cortos y acciones claras para cuando sube la ansiedad.',
  },
]

const guidedSteps = [
  'Entender qué me pasa',
  'Identificar mi patrón',
  'Aprender herramientas',
  'Aplicarlas en mi vida',
]

const explainPillars = [
  'Qué es la ansiedad y por qué no siempre es peligrosa',
  'El ciclo de la ansiedad: disparador, interpretación, activación y mantenimiento',
  'Por qué se sostiene: evitación, certeza, hipervigilancia y control excesivo',
  'Cómo regularla desde cuerpo, pensamientos, conducta y emoción',
]

const sosTools = [
  'Respiración guiada de 2 minutos',
  'Grounding 5-4-3-2-1',
  'Protocolo “si estoy con ansiedad ahora, hago esto”',
]

const sosProtocols = {
  'Respiración guiada de 2 minutos': [
    'Apoyá ambos pies en el piso y aflojá hombros y mandíbula.',
    'Inhalá en 4 tiempos por nariz.',
    'Exhalá en 6 tiempos por boca, sin forzarte.',
    'Repetilo durante 2 minutos y dejá que el cuerpo baje de a poco.',
  ],
  'Grounding 5-4-3-2-1': [
    'Nombrá 5 cosas que ves a tu alrededor.',
    'Tocá 4 superficies distintas y notá su textura.',
    'Escuchá 3 sonidos presentes.',
    'Identificá 2 olores y 1 sabor o sensación en la boca.',
  ],
  'Protocolo “si estoy con ansiedad ahora, hago esto”': [
    'Nombrá en voz baja: “esto es ansiedad, no peligro”.',
    'Elegí una herramienta corporal corta: respiración o grounding.',
    'No tomes decisiones grandes en los próximos 10 minutos.',
    'Elegí una acción pequeña y segura para sostenerte ahora.',
  ],
}

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
    logSosUse,
  } = useAppContext()
  const [activeModule, setActiveModule] = useState('entender')
  const [goalsDraft, setGoalsDraft] = useState(() => (currentUser?.processGoals ?? []).join('\n'))
  const [entryForm, setEntryForm] = useState({
    situation: '',
    thought: '',
    response: '',
    outcome: '',
  })
  const [exposureInput, setExposureInput] = useState('')
  const [activeSosTool, setActiveSosTool] = useState(sosTools[0])
  const [feedback, setFeedback] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const todaysCheckIn = currentUser?.dailyCheckIns?.find((entry) => entry.date === today)?.level ?? null

  const upcomingSessions = [...state.sessions].sort((a, b) => a.datetime.localeCompare(b.datetime))
  const featuredSession = upcomingSessions[0]
  const recommendedResources = state.campusItems.filter((item) =>
    item.audienceProfiles?.includes(currentUser?.profileCategory),
  )
  const processEntries = currentUser?.processEntries ?? []
  const exposureSteps = currentUser?.exposureSteps ?? []
  const sosHistory = currentUser?.sosHistory ?? []

  function handleSaveGoals() {
    const goals = goalsDraft
      .split('\n')
      .map((goal) => goal.trim())
      .filter(Boolean)

    const result = saveProcessGoals(goals)

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
      setFeedback('Mapa de ansiedad guardado.')
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

  function handleUseSosTool(tool) {
    setActiveSosTool(tool)
    const result = logSosUse(tool)

    if (result?.ok) {
      setFeedback(`Herramienta registrada: ${tool}.`)
    }
  }

  const moduleContent = (() => {
    if (activeModule === 'entender') {
      return (
        <div className="stack">
          <h3 className="h3">Bloque Entender</h3>
          <p className="body-sm">
            Queremos bajar la idea de peligro y reemplazarla por comprensión: qué es la ansiedad,
            cómo funciona en vos y por qué a veces se termina manteniendo sola.
          </p>
          <div className="stack-sm">
            {explainPillars.map((item) => (
              <article key={item} className="card" style={{ padding: 18 }}>
                <p className="body">{item}</p>
              </article>
            ))}
          </div>
          <Link to="/app/campus" className="btn btn-ghost">
            Ir al bloque de psicoeducación
          </Link>
        </div>
      )
    }

    if (activeModule === 'grupo') {
      return (
        <div className="stack">
          <h3 className="h3">Grupo y reuniones</h3>
          <p className="body-sm">
            Este espacio apunta a que te identifiques, te sientas contenido y puedas incorporar
            recursos desde experiencias compartidas.
          </p>
          <div className="stack" style={{ gap: 14 }}>
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
                </div>
              </article>
            ))}
          </div>
          <div className="row-wrap">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => featuredSession && enrollInSession(featuredSession.id)}
            >
              Reservar próxima reunión
            </button>
            <Link to="/app/comunidad" className="btn btn-ghost">
              Ir a comunidad
            </Link>
          </div>
        </div>
      )
    }

    if (activeModule === 'proceso') {
      return (
        <div className="stack">
          <h3 className="h3">Mi proceso</h3>
          <p className="body-sm">
            Registro inicial, avances, hoja de ruta y entrenamiento gradual para que puedas ver tu
            recorrido con más claridad.
          </p>
          <div className="grid-two">
            <article className="card" style={{ padding: 20 }}>
              <p className="eyebrow no-rule">Objetivos actuales</p>
              <textarea
                rows={5}
                style={{ marginTop: 14 }}
                value={goalsDraft}
                onChange={(event) => setGoalsDraft(event.target.value)}
                placeholder="Un objetivo por línea"
              />
              <div className="row-wrap" style={{ marginTop: 14 }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveGoals}>
                  Guardar objetivos
                </button>
              </div>
            </article>
            <article className="card" style={{ padding: 20 }}>
              <p className="eyebrow no-rule">Seguimiento personal</p>
              <div className="stack-sm" style={{ marginTop: 14 }}>
                <p className="body-sm">Registro de ansiedad: {todaysCheckIn ?? 'sin cargar hoy'}/10</p>
                <p className="body-sm">
                  Próximo paso sugerido: {exposureSteps[0]?.text ?? 'sumar una exposición gradual simple.'}
                </p>
                <p className="body-sm">
                  Recursos recomendados hoy: {recommendedResources.length} según tu patrón interno.
                </p>
              </div>
            </article>
          </div>
          <div className="grid-two">
            <article className="card" style={{ padding: 20 }}>
              <div className="row-between">
                <p className="eyebrow no-rule">Mapa rápido de ansiedad</p>
                <span className="tag neutral">Situación · pensamiento · respuesta</span>
              </div>
              <form className="stack-sm" style={{ marginTop: 14 }} onSubmit={handleEntrySubmit}>
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
                  placeholder="Qué hice o evité"
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
            <article className="card" style={{ padding: 20 }}>
              <div className="row-between">
                <p className="eyebrow no-rule">Exposición gradual</p>
                <span className="tag neutral">{exposureSteps.length} desafíos</span>
              </div>
              <form className="stack-sm" style={{ marginTop: 14 }} onSubmit={handleAddExposure}>
                <input
                  value={exposureInput}
                  onChange={(event) => setExposureInput(event.target.value)}
                  placeholder="Ej: responder un audio sin postergarlo"
                />
                <button type="submit" className="btn btn-ghost btn-sm">
                  Agregar desafío
                </button>
              </form>
              <div className="stack-sm" style={{ marginTop: 14 }}>
                {exposureSteps.slice(0, 3).map((step) => (
                  <div key={step.id} className="card" style={{ padding: 14 }}>
                    <p className="body-sm">{step.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <article className="card" style={{ padding: 20 }}>
            <div className="row-between">
              <p className="eyebrow no-rule">Últimos registros</p>
              <span className="tag neutral">{processEntries.length} guardados</span>
            </div>
            <div className="stack-sm" style={{ marginTop: 14 }}>
              {processEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="card" style={{ padding: 16 }}>
                  <strong style={{ display: 'block', color: 'var(--green-deep)' }}>{entry.situation}</strong>
                  <p className="body-sm" style={{ marginTop: 8 }}>
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
          <article className="card" style={{ padding: 20 }}>
            <p className="eyebrow no-rule">Recorrido guiado</p>
            <div className="grid-4" style={{ marginTop: 14 }}>
              {guidedSteps.map((step, index) => (
                <div key={step} className="stat-tile" style={{ padding: 16 }}>
                  <span className="label">Paso {index + 1}</span>
                  <span style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: 20, color: 'var(--green-deep)' }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      )
    }

    return (
      <div className="stack">
        <h3 className="h3">Herramientas en el momento / S.O.S</h3>
        <p className="body-sm">
          Un espacio ultra práctico para usar ahora mismo cuando la ansiedad sube y necesitás una
          secuencia clara.
        </p>
        <div className="stack-sm">
          {sosTools.map((tool) => (
            <article key={tool} className="card" style={{ padding: 18 }}>
              <div className="row-between">
                <p className="body">{tool}</p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleUseSosTool(tool)}
                >
                  Usar ahora
                </button>
              </div>
            </article>
          ))}
        </div>
        <article className="page-cover" style={{ padding: 28, minHeight: 'auto' }}>
          <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
            Protocolo rápido
          </p>
          <h3 style={{ color: '#FBFBFA', marginTop: 10 }}>Si estoy con ansiedad ahora, hago esto</h3>
          <p className="body-sm" style={{ color: 'rgba(251,251,250,0.82)', marginTop: 10 }}>
            1. Frenar y nombrar lo que siento. 2. Bajar al cuerpo con respiración o grounding. 3.
            Recordar que la ansiedad es una respuesta, no un peligro en sí. 4. Elegir una acción
            pequeña que me sostenga los próximos diez minutos.
          </p>
        </article>
        <article className="card" style={{ padding: 20 }}>
          <div className="row-between">
            <p className="eyebrow no-rule">Herramienta activa</p>
            <span className="tag neutral">{sosHistory.length} usos registrados</span>
          </div>
          <h4 className="h4" style={{ marginTop: 12 }}>
            {activeSosTool}
          </h4>
          <div className="stack-sm" style={{ marginTop: 14 }}>
            {sosProtocols[activeSosTool].map((step) => (
              <div key={step} className="card" style={{ padding: 14 }}>
                <p className="body-sm">{step}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    )
  })()

  return (
    <div className="dashboard-grid">
      <section className="dash-hero">
        <div>
          <p className="eyebrow no-rule" style={{ color: 'var(--green-light)' }}>
            ¿Cómo estás hoy?
          </p>
          <h2 className="h2" style={{ marginTop: 10, color: '#FBFBFA' }}>
            Tu inicio ya se parece más a un recorrido clínico guiado.
          </h2>
          <p className="body" style={{ color: 'rgba(251,251,250,0.82)', marginTop: 12 }}>
            Al entrar, primero ves tu estado actual, el módulo que necesitás abrir y una lectura
            rápida de tu proceso. La idea es que no tengas que adivinar por dónde seguir.
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
                    border: active ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
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
            Estado actual cargado: {todaysCheckIn ? `${todaysCheckIn}/10` : 'todavía no respondido hoy'}
          </p>
        </div>
        <div className="hero-art">
          <img src={sessionImages[0]} alt="Momento de pausa" />
        </div>
      </section>

      <section className="grid-4">
        <article className="stat-tile">
          <span className="label">Perfil predominante</span>
          <span className="value" style={{ fontSize: 28 }}>
            {currentUser?.profileCategory ?? 'Sin definir'}
          </span>
          <span className="trend">Mapeado desde onboarding</span>
        </article>
        <article className="stat-tile">
          <span className="label">Sesiones inscriptas</span>
          <span className="value">{currentUser?.joinedSessionIds?.length ?? 0}</span>
          <span className="trend">Agenda activa</span>
        </article>
        <article className="stat-tile">
          <span className="label">Recursos sugeridos</span>
          <span className="value">{recommendedResources.length}</span>
          <span className="trend">Ajustados a tu patrón</span>
        </article>
        <article className="stat-tile">
          <span className="label">Estado de hoy</span>
          <span className="value">{todaysCheckIn ?? '-'}</span>
          <span className="trend">Escala rápida 0-10</span>
        </article>
      </section>

      <section className="grid-4">
        {moduleCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="card"
            style={{
              padding: 24,
              textAlign: 'left',
              borderColor:
                activeModule === card.id ? 'rgba(47,107,62,0.35)' : undefined,
              boxShadow:
                activeModule === card.id ? '0 0 0 4px rgba(47,107,62,0.08)' : undefined,
            }}
            onClick={() => setActiveModule(card.id)}
          >
            <p className="eyebrow no-rule">{card.label}</p>
            <h3 className="h4" style={{ marginTop: 10 }}>
              {card.title}
            </h3>
            <p className="body-sm" style={{ marginTop: 10 }}>
              {card.body}
            </p>
          </button>
        ))}
      </section>

      <section className="grid-2">
        <article className="card">{moduleContent}</article>

        <div className="stack">
          {feedback ? (
            <article className="card" style={{ padding: 16, background: 'var(--green-wash)' }}>
              <p className="body-sm" style={{ color: 'var(--green-deep)' }}>
                {feedback}
              </p>
            </article>
          ) : null}
          <article className="card" style={{ padding: 22 }}>
            <div className="row-between">
              <h3 className="h3">Próxima reunión</h3>
              <Link to="/app/sesiones" className="btn btn-ghost btn-sm">
                Ver agenda
              </Link>
            </div>
            {featuredSession ? (
              <div className="stack-sm" style={{ marginTop: 16 }}>
                <p className="body">{featuredSession.title}</p>
                <p className="body-sm">
                  {featuredSession.professional} · {formatDate(featuredSession.datetime)} ·{' '}
                  {formatTime(featuredSession.datetime)}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => enrollInSession(featuredSession.id)}
                >
                  Reservar lugar
                  <AppIcon name="arrow" size={16} />
                </button>
              </div>
            ) : (
              <p className="body-sm" style={{ marginTop: 12 }}>
                Todavía no hay reuniones cargadas.
              </p>
            )}
          </article>

          <article className="card" style={{ padding: 22 }}>
            <div className="row-between">
              <h3 className="h3">Aplicarlo en la vida</h3>
              <Link to="/app/campus" className="btn btn-ghost btn-sm">
                Abrir campus
              </Link>
            </div>
            <div className="stack-sm" style={{ marginTop: 16 }}>
              <p className="body-sm">
                Lo próximo es bajar del contenido a situaciones reales: exposición gradual, práctica
                semanal y sostén de cambios.
              </p>
              {recommendedResources.slice(0, 2).map((item) => (
                <div key={item.id} className="card" style={{ padding: 16 }}>
                  <strong style={{ display: 'block', fontFamily: 'Georgia, Times New Roman, serif', fontSize: 18, fontWeight: 400, color: 'var(--green-deep)' }}>
                    {item.title}
                  </strong>
                  <span className="body-sm">{item.type} · {item.readTime}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
