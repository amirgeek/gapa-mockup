import { useState } from 'react'
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

function formatTime(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function SessionsPage() {
  const { currentUser, state, enrollInSession } = useAppContext()
  const [search, setSearch] = useState('')

  const filtered = state.sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.professional.toLowerCase().includes(search.toLowerCase()),
  )

  const today = filtered.slice(0, Math.ceil(filtered.length / 2))
  const upcoming = filtered.slice(Math.ceil(filtered.length / 2))

  return (
    <div className="px-6 max-w-5xl mx-auto py-6">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-4 leading-tight font-headline">
          Espacios de <br />
          <span className="italic text-primary">Contención</span>
        </h1>
        <p className="text-on-surface-variant max-w-lg leading-relaxed">
          Encuentra calma y guía en nuestras sesiones grupales. Elige el momento que mejor se
          adapte a tu ritmo.
        </p>
      </section>

      <div className="mb-10">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-highest border-none focus:ring-2 focus:ring-secondary/20 focus:outline-none"
            placeholder="Buscar por tema o facilitador..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {today.length > 0 && (
        <div className="mb-12">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-2xl font-bold font-headline">Próximas</h2>
            <span className="text-on-surface-variant text-sm uppercase tracking-widest">
              Sesiones disponibles
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {today.map((session, index) => {
              const isJoined = currentUser?.joinedSessionIds?.includes(session.id)
              const seatsLeft = session.capacity - session.enrolledUserIds.length
              const isFeatured = index === 0

              if (isFeatured) {
                return (
                  <div
                    key={session.id}
                    className="col-span-1 md:col-span-2 bg-surface-container-low rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm"
                  >
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80"
                        alt=""
                      />
                      {isJoined ? (
                        <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                          Inscripto
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {session.category}
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-2xl font-bold font-headline mb-2">{session.title}</h3>
                        <p className="text-on-surface-variant mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">person</span>
                          {session.professional}
                        </p>
                        <p className="text-on-surface-variant text-sm mb-4">{session.description}</p>
                        {isJoined && (
                          <div className="flex items-center gap-3 bg-surface-container-high p-4 rounded-lg mb-4">
                            <span className="material-symbols-outlined text-secondary">link</span>
                            <a
                              href={session.meetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-mono text-secondary truncate hover:underline"
                            >
                              {session.meetLink}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-primary block">
                            {formatTime(session.datetime)}
                          </span>
                          <span className="text-xs text-on-surface-variant">{seatsLeft} cupos</span>
                        </div>
                        <button
                          type="button"
                          disabled={isJoined}
                          onClick={() => enrollInSession(session.id)}
                          className={`px-8 py-3 rounded-lg font-bold hover:opacity-90 flex items-center gap-2 ${
                            isJoined
                              ? 'bg-surface-container-high text-on-surface-variant cursor-default'
                              : 'bg-secondary text-on-secondary'
                          }`}
                        >
                          {isJoined ? 'Inscripto' : 'Unirse'}{' '}
                          {!isJoined && (
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={session.id}
                  className="bg-surface-container-lowest border-l-4 border-primary rounded-xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between mb-4">
                      <span className="text-xs font-bold text-primary-container uppercase tracking-widest">
                        {session.category}
                      </span>
                      <span className="text-sm font-medium text-on-surface-variant">
                        {formatTime(session.datetime)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">{session.title}</h3>
                    <p className="text-sm text-on-surface-variant mb-4 italic">
                      Con {session.professional}
                    </p>
                    <p className="text-sm text-on-surface-variant mb-4">{session.description}</p>
                    {isJoined && (
                      <div className="flex items-center gap-2 bg-surface-container p-3 rounded-lg mb-4">
                        <span className="material-symbols-outlined text-secondary text-sm">link</span>
                        <a
                          href={session.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-secondary truncate hover:underline"
                        >
                          {session.meetLink}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-on-surface-variant">
                      <span>{session.duration}</span>
                      <span>{seatsLeft} cupos libres</span>
                    </div>
                    <button
                      type="button"
                      disabled={isJoined}
                      onClick={() => enrollInSession(session.id)}
                      className={`w-full py-3 rounded-lg font-bold transition-colors ${
                        isJoined
                          ? 'bg-surface-container-high text-on-surface-variant cursor-default'
                          : 'bg-surface-container-high text-on-surface hover:bg-primary-fixed'
                      }`}
                    >
                      {isJoined ? 'Inscripto' : 'Inscribirse'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="mb-16">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-2xl font-bold font-headline">Más sesiones</h2>
            <span className="text-on-surface-variant text-sm uppercase tracking-widest">
              Agenda completa
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcoming.map((session) => {
              const isJoined = currentUser?.joinedSessionIds?.includes(session.id)
              const seatsLeft = session.capacity - session.enrolledUserIds.length

              return (
                <div
                  key={session.id}
                  className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">groups</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{session.title}</h4>
                      <p className="text-xs text-on-surface-variant">{session.professional}</p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant">{session.description}</p>
                  {isJoined && (
                    <div className="flex items-center gap-2 bg-surface-container p-3 rounded-lg">
                      <span className="material-symbols-outlined text-secondary text-sm">link</span>
                      <a
                        href={session.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-secondary truncate hover:underline"
                      >
                        {session.meetLink}
                      </a>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-semibold block">
                        {formatTime(session.datetime)}
                      </span>
                      <span className="text-xs text-on-surface-variant">{seatsLeft} cupos</span>
                    </div>
                    <button
                      type="button"
                      disabled={isJoined}
                      onClick={() => enrollInSession(session.id)}
                      className={`font-bold text-sm px-4 py-2 rounded-lg ${
                        isJoined
                          ? 'text-on-surface-variant cursor-default'
                          : 'text-secondary hover:bg-secondary/10'
                      }`}
                    >
                      {isJoined ? 'Inscripto' : 'Inscribirme'}
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="bg-primary-container text-on-primary-container rounded-xl p-6 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-4xl mb-4">self_improvement</span>
              <h4 className="font-bold text-xl mb-1">Pausa de Calma</h4>
              <p className="text-xs opacity-80 mb-4">¿Necesitas un respiro ahora?</p>
              <button className="bg-surface-container-lowest text-primary px-6 py-2 rounded-full font-bold text-sm shadow-sm">
                Iniciar Ejercicio
              </button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline mb-4 block">
            calendar_month
          </span>
          <h3 className="font-headline text-2xl mb-2">No se encontraron sesiones</h3>
          <p className="text-on-surface-variant">Intenta con otro término de búsqueda.</p>
        </div>
      )}
    </div>
  )
}
