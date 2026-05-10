import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

const sessionImages = [
  'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
]

const resourceImages = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
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
  const { currentUser, state, enrollInSession } = useAppContext()
  const upcomingSessions = [...state.sessions].sort((a, b) => a.datetime.localeCompare(b.datetime))
  const featured = upcomingSessions[0]
  const recommendedResources = state.campusItems.filter((item) =>
    item.audienceProfiles?.includes(currentUser?.profileCategory),
  )

  return (
    <div className="dashboard-grid">
      <section className="dash-hero">
        <div>
          <p className="eyebrow no-rule" style={{ color: 'var(--green-light)' }}>
            Tu próxima sesión
          </p>
          <h2 className="h2" style={{ marginTop: 10, color: '#FBFBFA' }}>
            {featured?.title ?? 'Tu agenda se está armando'}
          </h2>
          <p className="body" style={{ color: 'rgba(251,251,250,0.82)', marginTop: 12 }}>
            Hola, {currentUser?.name?.split(' ')[0] ?? 'miembro'}. Acá ves primero lo que importa:
            sesión siguiente, recursos recomendados y seguimiento ordenado.
          </p>
          {featured ? (
            <>
              <div className="row-wrap" style={{ marginTop: 16 }}>
                <span className="status confirmed">Inscripción abierta</span>
                <span style={{ color: 'rgba(251,251,250,0.72)', fontSize: 14 }}>
                  {formatDate(featured.datetime)} · {formatTime(featured.datetime)} · {featured.duration}
                </span>
              </div>
              <div className="row-wrap" style={{ marginTop: 22 }}>
                <button type="button" className="btn btn-on-dark" onClick={() => enrollInSession(featured.id)}>
                  Reservar lugar
                  <AppIcon name="arrow" size={16} />
                </button>
                <Link to="/app/sesiones" className="btn btn-ghost-on-dark">
                  Ver agenda completa
                </Link>
              </div>
            </>
          ) : null}
        </div>
        <div className="hero-art">
          <img src={sessionImages[0]} alt="Espacio de calma" />
        </div>
      </section>

      {currentUser?.profileCategory ? (
        <section className="member-banner">
          <div className="dot" />
          <div>
            <strong>Tu recorrido inicial es {currentUser.profileCategory}.</strong>
            <span style={{ color: 'var(--muted)' }}>
              {' '}
              Ajustamos campus, sesiones sugeridas y comunidad alrededor de ese perfil.
            </span>
          </div>
        </section>
      ) : null}

      <section className="grid-4">
        <article className="stat-tile">
          <span className="label">Sesiones inscriptas</span>
          <span className="value">{currentUser?.joinedSessionIds?.length ?? 0}</span>
          <span className="trend">Tu seguimiento activo</span>
        </article>
        <article className="stat-tile">
          <span className="label">Sesiones totales</span>
          <span className="value">{state.sessions.length}</span>
          <span className="trend">Agenda compartida</span>
        </article>
        <article className="stat-tile">
          <span className="label">Recursos campus</span>
          <span className="value">{state.campusItems.length}</span>
          <span className="trend">Biblioteca activa</span>
        </article>
        <article className="stat-tile">
          <span className="label">Recomendados</span>
          <span className="value">{recommendedResources.length}</span>
          <span className="trend">Curados para vos</span>
        </article>
      </section>

      <section className="grid-2">
        <div className="stack">
          <div className="row-between">
            <h3 className="h3">Tu agenda de la semana</h3>
            <Link to="/app/sesiones" className="btn btn-ghost btn-sm">
              Ver todas
            </Link>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            {upcomingSessions.slice(0, 3).map((session) => {
              const isJoined = currentUser?.joinedSessionIds?.includes(session.id)
              return (
                <article key={session.id} className="session-card">
                  <div className="session-date">
                    <span className="day">{formatDate(session.datetime).split(' ')[0]}</span>
                    <span className="month">{formatDate(session.datetime).split(' ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="h4">{session.title}</h3>
                    <div className="session-meta">
                      <span>{session.professional}</span>
                      <span>{formatTime(session.datetime)}</span>
                    </div>
                  </div>
                  <span className={`status ${isJoined ? 'confirmed' : 'open'}`}>
                    {isJoined ? 'Inscripta' : 'Disponible'}
                  </span>
                </article>
              )
            })}
          </div>
        </div>

        <div className="stack">
          <div className="row-between">
            <h3 className="h3">Para tu momento</h3>
            <Link to="/app/campus" className="btn btn-ghost btn-sm">
              Ir al campus
            </Link>
          </div>
          {recommendedResources.slice(0, 1).map((item, index) => (
            <article key={item.id} className="resource-card">
              <div className="resource-cover">
                <img src={resourceImages[index % resourceImages.length]} alt={item.title} />
                <span className="cover-tag">
                  {item.type} · {item.readTime}
                </span>
              </div>
              <div className="body">
                <h3 className="h3">{item.title}</h3>
                <div className="resource-meta">
                  <strong>{item.author}</strong>
                  <span>Recomendado para vos</span>
                </div>
              </div>
            </article>
          ))}
          {recommendedResources.slice(1, 3).map((item, index) => (
            <article key={item.id} className="card" style={{ padding: 18 }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="h4">{item.title}</h3>
                  <p className="body-sm" style={{ marginTop: 6 }}>
                    {item.author} · {item.readTime}
                  </p>
                </div>
                <span className="tag neutral">{index === 0 ? 'Audio' : 'Lectura'}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
