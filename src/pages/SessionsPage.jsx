import { useAppContext } from '../context/useAppContext.jsx'

function formatLongDate(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function SessionsPage() {
  const { currentUser, state, enrollInSession } = useAppContext()

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Sesiones</p>
          <h1>Agenda de encuentros grupales</h1>
          <p>
            Los admins cargan sesiones con link de Meet. El usuario ve el enlace solo cuando ya esta
            inscripto.
          </p>
        </div>
      </section>

      <section className="cards-grid">
        <article className="surface-card">
          <p className="eyebrow">Como funciona</p>
          <h2>Te inscribis, reservamos tu lugar y recien ahi mostramos el acceso</h2>
          <p>
            La experiencia busca ser clara y segura: primero elegis, despues confirmas, y el link
            privado aparece dentro de tu propia agenda.
          </p>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Tu estado</p>
          <h2>{currentUser?.joinedSessionIds.length ?? 0} sesiones en seguimiento</h2>
          <p>
            Todas las reservas quedan visibles dentro de la plataforma para que el usuario no tenga
            que salir a buscar accesos o informacion dispersa.
          </p>
        </article>
      </section>

      <div className="cards-grid cards-grid-wide">
        {state.sessions.map((session) => {
          const isJoined = currentUser?.joinedSessionIds.includes(session.id)
          const seatsLeft = session.capacity - session.enrolledUserIds.length

          return (
            <article key={session.id} className="surface-card session-card">
              <div className="session-header">
                <div>
                  <p className="eyebrow">{session.category}</p>
                  <h2>{session.title}</h2>
                </div>
                <span className={isJoined ? 'status-badge status-badge-active' : 'status-badge'}>
                  {isJoined ? 'Inscripto' : 'Disponible'}
                </span>
              </div>

              <p>{session.description}</p>

              <div className="meta-list">
                <span>{session.professional}</span>
                <span>{formatLongDate(session.datetime)}</span>
                <span>{session.duration}</span>
                <span>{seatsLeft} cupos libres</span>
              </div>

              {isJoined ? (
                <div className="private-link-box">
                  <span>Link privado de Meet</span>
                  <a href={session.meetLink} target="_blank" rel="noreferrer">
                    {session.meetLink}
                  </a>
                </div>
              ) : null}

              <div className="cta-row">
                <button
                  type="button"
                  className={isJoined ? 'ghost-button' : 'primary-button'}
                  onClick={() => enrollInSession(session.id)}
                  disabled={isJoined}
                >
                  {isJoined ? 'Ya inscripto' : 'Inscribirme'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
