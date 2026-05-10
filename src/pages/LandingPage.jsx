import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#f6faf7]/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">diversity_1</span>
            <span className="font-headline italic text-2xl font-bold text-primary">GAPA</span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="border-2 border-secondary text-secondary px-5 py-2 rounded-xl font-semibold text-sm hover:bg-secondary/5 transition-all"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="bg-tertiary text-on-tertiary px-5 py-2 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
            >
              Registrarme
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 text-primary mb-8">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-xs font-semibold tracking-widest uppercase">Terapia grupal guiada por profesionales</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-[1.1] tracking-tight mb-8">
              Tu espacio seguro para{' '}
              <span className="italic text-primary block">sanar en comunidad</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mb-10 leading-relaxed">
              Redescubre tu bienestar emocional a través del apoyo colectivo y la guía experta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/registro"
                className="bg-tertiary text-on-tertiary px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
              >
                Comenzar gratis{' '}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                to="/login"
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/5 flex items-center justify-center"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1200&q=80"
                alt="Comunidad GAPA"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <span
              className="material-symbols-outlined text-4xl text-primary mb-4 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
            <h3 className="font-headline text-3xl mb-4">Metodología GAPA</h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              Integramos técnicas de mindfulness y psicología positiva en cada sesión grupal,
              creando un entorno de crecimiento libre de juicios.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                Sesiones moderadas por expertos
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                Grupos reducidos y seguros
              </li>
            </ul>
          </div>
          <div className="bg-secondary-container/20 rounded-xl p-8 border border-secondary/10 flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl text-secondary mb-4">forum</span>
            <div>
              <h3 className="font-headline text-3xl mb-2">Comunidad 24/7</h3>
              <p className="text-on-surface-variant text-sm">
                Nunca caminas solo. Conéctate con personas que entienden tu proceso.
              </p>
            </div>
            <div className="mt-6 p-4 bg-surface rounded-lg border border-outline-variant/20 italic text-sm text-secondary font-medium">
              "Encontré la fuerza que me faltaba a través de sus historias."
            </div>
          </div>
        </div>

        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: 'psychology',
              color: 'text-primary',
              title: 'Calma',
              body: 'Un entorno claro para bajar fricción desde el primer ingreso. La experiencia está pensada para orientar rápido.',
            },
            {
              icon: 'verified_user',
              color: 'text-secondary',
              title: 'Confianza',
              body: 'Acompañamiento profesional con sesiones, campus y recorrido guiado dentro de una plataforma simple de usar.',
            },
            {
              icon: 'groups',
              color: 'text-tertiary',
              title: 'Comunidad',
              body: 'GAPA combina profesionales, recursos y comunidad para construir una experiencia de apoyo continuo.',
            },
          ].map((pillar) => (
            <article
              key={pillar.title}
              className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10"
            >
              <span className={`material-symbols-outlined text-3xl ${pillar.color} mb-4 block`}>
                {pillar.icon}
              </span>
              <h3 className="font-headline text-xl font-bold mb-2">{pillar.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{pillar.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 surface-card bg-surface-container-low rounded-xl p-12 text-center">
          <h2 className="font-headline text-4xl mb-4">
            Una plataforma clara para que el usuario sienta apoyo desde la primera pantalla
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Si querés recorrer la experiencia completa, el siguiente paso es entrar por el
            onboarding y activar la membresía.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registro"
              className="bg-tertiary text-on-tertiary px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 shadow-lg flex items-center justify-center gap-2"
            >
              Comenzar gratis <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/login"
              className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/5 flex items-center justify-center"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
