import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function DashboardPage() {
  const { currentUser, state } = useAppContext()
  const joinedCount = currentUser?.joinedSessionIds.length ?? 0
  const featuredSession = state.sessions.find((session) => session.featured) ?? state.sessions[0]
  const categories = [...new Set(state.campusItems.map((item) => item.category))]
  const recommendedCount = state.campusItems.filter((item) =>
    item.audienceProfiles?.includes(currentUser?.profileCategory),
  ).length

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Inicio privado</p>
          <h1>Hola, {currentUser?.name}</h1>
          <p>
            Tu membresia esta activa y ya podes acceder a sesiones grupales, contenido profesional y
            seguimiento desde la misma plataforma.
          </p>
          {currentUser?.profileCategory ? (
            <div className="profile-banner">
              <span className="eyebrow">Tu recorrido hoy</span>
              <strong>{currentUser.profileCategory}</strong>
              <p>
                El campus y las sugerencias iniciales se ordenan tomando esta categoria como punto
                de partida.
              </p>
            </div>
          ) : null}
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <strong>{joinedCount}</strong>
            <span>Sesiones reservadas</span>
          </article>
          <article className="stat-card">
            <strong>{state.campusItems.length}</strong>
            <span>Recursos en campus</span>
          </article>
          <article className="stat-card">
            <strong>{categories.length}</strong>
            <span>Categorias activas</span>
          </article>
          <article className="stat-card">
            <strong>{recommendedCount}</strong>
            <span>Recursos sugeridos</span>
          </article>
        </div>
      </section>

      <section className="cards-grid">
        <article className="surface-card">
          <p className="eyebrow">Proxima sesion destacada</p>
          <h2>{featuredSession.title}</h2>
          <p>{featuredSession.description}</p>
          <p className="meta-copy">
            {featuredSession.professional} · {formatDate(featuredSession.datetime)}
          </p>
          <Link className="secondary-button" to="/app/sesiones">
            Ver sesiones
          </Link>
        </article>

        <article className="surface-card">
          <p className="eyebrow">Campus</p>
          <h2>Contenido ordenado para que entres rapido</h2>
          <p>
            Profesionales pueden subir recursos en distintos formatos y los usuarios navegan por
            categoria.
          </p>
          <div className="tag-row">
            {categories.map((category) => (
              <span key={category} className="tag">
                {category}
              </span>
            ))}
          </div>
          <Link className="secondary-button" to="/app/campus">
            Ir al campus
          </Link>
        </article>
      </section>
    </div>
  )
}
