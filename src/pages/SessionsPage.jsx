import { useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

const coverImage =
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80'
const sessionPhoto =
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
  }).format(new Date(dateString))
}

function formatTime(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function SessionsPage() {
  const { currentUser, state, enrollInSession } = useAppContext()
  const [search, setSearch] = useState('')
  const [enrollingId, setEnrollingId] = useState(null)
  const [enrollErrors, setEnrollErrors] = useState({})

  async function handleEnroll(sessionId) {
    setEnrollingId(sessionId)
    setEnrollErrors((current) => ({ ...current, [sessionId]: null }))
    const result = await enrollInSession(sessionId)
    setEnrollingId(null)
    if (!result?.ok) {
      setEnrollErrors((current) => ({
        ...current,
        [sessionId]: result?.message || 'No pudimos reservar tu lugar en esta sesión.',
      }))
    }
  }

  const filtered = useMemo(
    () =>
      state.sessions.filter(
        (session) =>
          session.title.toLowerCase().includes(search.toLowerCase()) ||
          session.professional.toLowerCase().includes(search.toLowerCase()) ||
          session.category.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, state.sessions],
  )

  const joined = filtered.filter((session) => currentUser?.joinedSessionIds?.includes(session.id))
  const open = filtered.filter((session) => !currentUser?.joinedSessionIds?.includes(session.id))

  return (
    <div className="page-stack">
      <section className="page-cover">
        <img
          src={coverImage}
          alt="Sesiones grupales"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
        />
        <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
          Sesiones grupales
        </p>
        <h1 style={{ color: '#FBFBFA', marginTop: 10 }}>
          Agenda compartida con personas que están atravesando algo parecido.
        </h1>
        <p className="lead" style={{ marginTop: 16, maxWidth: '58ch' }}>
          Grupos chicos, profesionales matriculados y un link privado que solo aparece cuando ya
          estás inscripta.
        </p>
      </section>

      <section className="search-shell">
        <AppIcon name="search" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por tema, profesional o categoría"
          style={{ border: 0, background: 'transparent', padding: 0, boxShadow: 'none' }}
        />
      </section>

      {joined.length > 0 ? (
        <section className="page-stack">
          <div className="row-between">
            <h2 className="h3">Tus sesiones</h2>
            <span className="tag">{joined.length} inscriptas</span>
          </div>
          {joined.map((session) => (
            <article key={session.id} className="session-large">
              <div className="photo">
                <img src={sessionPhoto} alt={session.professional} />
              </div>
              <div>
                <div className="row-wrap">
                  <span className="status confirmed">Inscripta</span>
                  <span className="tag neutral">{session.category}</span>
                </div>
                <h3 className="h3" style={{ marginTop: 14 }}>
                  {session.title}
                </h3>
                <p className="body-sm" style={{ marginTop: 12 }}>
                  {session.description}
                </p>
                <div className="meta-row">
                  <div>
                    <span>Profesional</span>
                    <strong>{session.professional}</strong>
                  </div>
                  <div>
                    <span>Cuándo</span>
                    <strong>
                      {formatDate(session.datetime)} · {formatTime(session.datetime)}
                    </strong>
                  </div>
                  <div>
                    <span>Duración</span>
                    <strong>{session.duration}</strong>
                  </div>
                </div>
                <div className="meet-box">
                  <div>
                    <div className="label">Link privado de Meet</div>
                    <a href={session.meetLink} target="_blank" rel="noreferrer">
                      {session.meetLink}
                    </a>
                  </div>
                  <a href={session.meetLink} target="_blank" rel="noreferrer" className="btn btn-green btn-sm">
                    Abrir
                    <AppIcon name="arrow" size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="page-stack">
        <div className="row-between">
          <h2 className="h3">Próximas sesiones abiertas</h2>
          <div className="capsule-row">
            <span className="chip active">Todas</span>
            <span className="chip">Ansiedad</span>
            <span className="chip">Sueño</span>
            <span className="chip">Vínculos</span>
          </div>
        </div>

        <div className="stack" style={{ gap: 16 }}>
          {open.map((session) => {
            const seatsLeft = session.capacity - session.enrolledUserIds.length
            return (
              <article key={session.id} className="card">
                <div className="grid-2" style={{ alignItems: 'start' }}>
                  <div>
                    <div className="row-wrap">
                      <span className="status open">Disponible</span>
                      <span className="tag neutral">{session.category}</span>
                    </div>
                    <h3 className="h3" style={{ marginTop: 14 }}>
                      {session.title}
                    </h3>
                    <p className="body-sm" style={{ marginTop: 12 }}>
                      {session.description}
                    </p>
                  </div>
                  <div className="stack-sm">
                    <div className="grid-two">
                      <div>
                        <p className="eyebrow muted no-rule">Profesional</p>
                        <strong style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: 17, fontWeight: 400, color: 'var(--green-deep)' }}>
                          {session.professional}
                        </strong>
                      </div>
                      <div>
                        <p className="eyebrow muted no-rule">Fecha</p>
                        <strong style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: 17, fontWeight: 400, color: 'var(--green-deep)' }}>
                          {formatDate(session.datetime)}
                        </strong>
                      </div>
                    </div>
                    <div className="grid-two">
                      <div>
                        <p className="eyebrow muted no-rule">Hora</p>
                        <strong style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: 17, fontWeight: 400, color: 'var(--green-deep)' }}>
                          {formatTime(session.datetime)}
                        </strong>
                      </div>
                      <div>
                        <p className="eyebrow muted no-rule">Cupos</p>
                        <strong style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: 17, fontWeight: 400, color: 'var(--green-deep)' }}>
                          {seatsLeft} libres
                        </strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={enrollingId === session.id}
                      onClick={() => handleEnroll(session.id)}
                    >
                      {enrollingId === session.id ? 'Reservando...' : 'Reservar plaza'}
                      <AppIcon name="arrow" size={16} />
                    </button>
                    {enrollErrors[session.id] ? (
                      <p className="form-error">{enrollErrors[session.id]}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
