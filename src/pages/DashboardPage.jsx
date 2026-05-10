import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'

function formatTime(dateString) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

const sessionImages = [
  'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=80',
]

export function DashboardPage() {
  const { currentUser, state, enrollInSession } = useAppContext()
  const upcomingSessions = state.sessions.slice(0, 3)

  return (
    <div className="px-6 max-w-4xl mx-auto space-y-10 py-6">
      {/* Greeting Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-primary-container p-8 text-on-primary-container shadow-xl">
        <div className="relative z-10 space-y-2">
          <h2 className="font-headline text-3xl font-bold">
            Hola, {currentUser?.name?.split(' ')[0] ?? 'bienvenido'}
          </h2>
          <p className="text-on-primary-container/80 max-w-xs">
            Tu santuario digital está listo. Tómate un momento para respirar.
          </p>
          {currentUser?.profileCategory && (
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-sm">spa</span>
                Perfil: {currentUser.profileCategory}
              </div>
            </div>
          )}
        </div>
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4">
        <Link
          to="/app/comunidad"
          className="flex flex-col items-start justify-between p-6 bg-surface-container-lowest rounded-3xl shadow-sm hover:shadow-md transition-all group aspect-square"
        >
          <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">forum</span>
          </div>
          <div className="text-left">
            <span className="block font-headline text-xl font-bold">Ir al Foro</span>
            <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
              Comunidad activa
            </span>
          </div>
        </Link>

        <Link
          to="/app/campus"
          className="flex flex-col items-start justify-between p-6 bg-surface-container-lowest rounded-3xl shadow-sm hover:shadow-md transition-all group aspect-square"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div className="text-left">
            <span className="block font-headline text-xl font-bold">Explorar Campus</span>
            <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
              Nuevo contenido
            </span>
          </div>
        </Link>
      </section>

      {/* Upcoming Sessions */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-headline text-2xl font-bold">Próximas Sesiones</h3>
            <p className="text-sm text-on-surface-variant">Tu camino hacia el bienestar grupal</p>
          </div>
          <Link to="/app/sesiones" className="text-primary font-bold text-sm hover:underline">
            Ver todo
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-4">
          {upcomingSessions.map((session, index) => {
            const isJoined = currentUser?.joinedSessionIds?.includes(session.id)
            return (
              <div
                key={session.id}
                className="flex-none w-72 bg-surface-container-low rounded-3xl overflow-hidden"
              >
                <div className="relative h-40">
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    src={sessionImages[index % sessionImages.length]}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-on-surface-variant text-xs font-bold rounded-full">
                    {formatTime(session.datetime)}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="font-headline text-lg font-bold">{session.title}</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>{session.professional}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => enrollInSession(session.id)}
                    disabled={isJoined}
                    className={`w-full py-3 rounded-xl font-bold text-sm ${
                      isJoined
                        ? 'bg-surface-container-highest text-on-surface-variant cursor-default'
                        : 'bg-secondary text-white hover:opacity-90'
                    }`}
                  >
                    {isJoined ? 'Ya inscripto' : index === 0 ? 'Unirme ahora' : 'Reservar plaza'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: currentUser?.joinedSessionIds?.length ?? 0, label: 'Sesiones reservadas' },
          { value: state.sessions.length, label: 'Sesiones totales' },
          { value: state.campusItems.length, label: 'Recursos campus' },
          {
            value: state.campusItems.filter((i) =>
              i.audienceProfiles?.includes(currentUser?.profileCategory),
            ).length,
            label: 'Recomendados',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-2xl p-5 text-center shadow-sm"
          >
            <strong className="block text-3xl font-bold text-primary font-headline">
              {stat.value}
            </strong>
            <span className="text-xs text-on-surface-variant font-medium">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Quote */}
      <section className="bg-surface-container-highest rounded-3xl p-8 border border-outline-variant/15 text-center italic font-headline text-on-surface-variant">
        <span className="material-symbols-outlined block mb-4 text-3xl text-primary/40">
          format_quote
        </span>
        "El bienestar no es un destino, sino la forma en que viajamos."
      </section>
    </div>
  )
}
