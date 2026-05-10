import { Link } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

const pillars = [
  {
    eyebrow: 'Calma',
    title: 'Un entorno claro, sin estímulos innecesarios.',
    body: 'Cada pantalla está pensada para bajar carga cognitiva. Sin alarmas, sin ruido, sin decisiones de más.',
    foot: 'Diseño basado en evidencia',
  },
  {
    eyebrow: 'Confianza',
    title: 'Profesionales matriculados y sesiones grupales reales.',
    body: 'Sesiones con agenda visible, cupos concretos y acceso privado solo para quienes están inscriptos.',
    foot: 'Equipo verificado',
  },
  {
    eyebrow: 'Comunidad',
    title: 'Atravesarlo acompañado cambia la experiencia.',
    body: 'La membresía abre acceso a campus, comunidad y seguimiento para sostener un proceso continuo.',
    foot: 'Comunidad hispanohablante',
  },
]

const steps = [
  {
    n: '01',
    title: 'Onboarding breve para conocernos.',
    body: 'Entendemos tu momento actual y organizamos un punto de partida claro dentro del campus.',
  },
  {
    n: '02',
    title: 'Activás la membresía.',
    body: 'El alta crea tu cuenta y desbloquea sesiones, campus y comunidad al mismo tiempo.',
  },
  {
    n: '03',
    title: 'Entrás a tu recorrido.',
    body: 'Agenda, recursos curados y seguimiento ordenado en una sola plataforma.',
  },
]

const plans = [
  {
    name: 'Mensual',
    flag: 'Empezar',
    price: '$14.900',
    suffix: 'por mes, cancelable cuando quieras',
    desc: 'Para probar la plataforma y ver cómo encaja en tu semana.',
    items: [
      'Acceso al campus completo',
      'Inscripción a 4 sesiones grupales por mes',
      'Recorrido personalizado según onboarding',
      'Comunidad y agenda compartida',
    ],
  },
  {
    name: 'Trimestral',
    flag: 'Recomendada',
    price: '$11.900',
    suffix: 'por mes, pago cada 3 meses',
    desc: 'Pensada para procesos con continuidad real y mejor seguimiento.',
    featured: true,
    items: [
      'Todo lo del plan mensual',
      'Sesiones grupales ilimitadas',
      'Seguimiento profesional cada 4 semanas',
      'Acceso anticipado a nuevos talleres',
    ],
  },
  {
    name: 'Anual',
    flag: 'Compromiso',
    price: '$9.500',
    suffix: 'por mes, pago anual',
    desc: 'Para sostener un proceso largo con el mejor precio por mes.',
    items: [
      'Todo lo del plan trimestral',
      'Sesión individual de orientación al inicio',
      'Acceso a talleres en vivo y archivo',
      'Pausa de membresía hasta 30 días',
    ],
  },
]

const team = [
  {
    name: 'Dra. María Eugenia Soler',
    role: 'Directora clínica, Mat. 12.483',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lic. Tomás Iribarren',
    role: 'Psicólogo, ansiedad y pánico',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lic. Florencia Castro',
    role: 'Psicóloga, procesos grupales',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
  },
]

const faqs = [
  {
    q: '¿GAPA reemplaza a un tratamiento clínico?',
    a: 'No. GAPA es un acompañamiento grupal y un campus de recursos. Puede convivir con un tratamiento individual y sumar estructura a tu proceso.',
  },
  {
    q: '¿Cómo son las sesiones grupales?',
    a: 'Son encuentros por video, en grupos chicos, conducidos por psicólogos matriculados. Duran entre 60 y 75 minutos y trabajan una temática concreta.',
  },
  {
    q: '¿Puedo cancelar la membresía?',
    a: 'Sí. La membresía se puede cancelar sin formularios extensos y se mantiene activa hasta el final del período pago.',
  },
]

export function LandingPage() {
  return (
    <div className="shell">
      <header className="nav">
        <div className="wrap nav-inner">
          <BrandLogo />
          <nav className="nav-links">
            <a href="#como-funciona" className="nav-link">
              Cómo funciona
            </a>
            <a href="#equipo" className="nav-link">
              Profesionales
            </a>
            <a href="#planes" className="nav-link">
              Planes
            </a>
            <a href="#preguntas" className="nav-link">
              Preguntas
            </a>
          </nav>
          <div className="nav-cta">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="btn btn-primary btn-sm">
              Activar membresía
            </Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <img
          className="hero-media"
          src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1600&q=80"
          alt="Comunidad en un espacio sereno"
        />
        <div className="hero-content wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow hero-eyebrow">
                Grupo de Afrontamiento contra Problemas de Ansiedad
              </p>
              <h1 style={{ marginTop: 16 }}>
                Cuando la ansiedad pide pausa, <em>acá hay una sala que ya está armada.</em>
              </h1>
              <p className="lead">
                Una plataforma de membresía con sesiones profesionales, campus de recursos y
                comunidad hispanohablante, pensada para sostener un proceso sin sobrecargar.
              </p>
              <div className="row-wrap" style={{ marginTop: 28 }}>
                <Link to="/registro" className="btn btn-primary btn-lg">
                  Activar membresía
                  <AppIcon name="arrow" size={16} />
                </Link>
                <Link to="/login" className="btn btn-ghost-on-dark btn-lg">
                  Ya soy miembro
                </Link>
              </div>
              <div className="hero-meta-row">
                <div className="hero-meta">
                  <strong>2.400+</strong>miembros activos
                </div>
                <div className="hero-meta">
                  <strong>18</strong>profesionales matriculados
                </div>
                <div className="hero-meta">
                  <strong>96%</strong>renueva al 3er mes
                </div>
              </div>
            </div>
            <div className="hero-tile">
              <p className="eyebrow hero-eyebrow no-rule">Próxima sesión abierta</p>
              <h3 style={{ marginTop: 8 }}>Rumiación nocturna y técnicas para frenar el bucle</h3>
              <p className="body-sm" style={{ color: 'rgba(251,251,250,0.78)', marginTop: 10 }}>
                Lic. Tomás Iribarren, jueves 21:00 ART, 12 lugares disponibles para una práctica
                concreta y guiada.
              </p>
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
                <span className="quote" style={{ color: '#FBFBFA', fontSize: 42 }}>
                  7
                </span>
                <p className="body-sm" style={{ color: 'rgba(251,251,250,0.78)' }}>
                  cupos disponibles antes del cierre de inscripción
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack-lg">
          <div className="stack" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Por qué GAPA</p>
            <h2 className="h2">
              No es una app de meditación. <em className="accent">Es una plataforma de acompañamiento profesional.</em>
            </h2>
            <p className="lead muted">
              Cada decisión de producto busca bajar ansiedad, ordenar el proceso y sostener una
              sensación de acompañamiento inmediato.
            </p>
          </div>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article key={pillar.eyebrow} className="card">
                <div className="stack">
                  <p className="eyebrow">{pillar.eyebrow}</p>
                  <h3 className="h3">{pillar.title}</h3>
                </div>
                <p className="body">{pillar.body}</p>
                <div className="pillar-foot">{pillar.foot}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section" style={{ background: 'var(--bg-deeper)' }}>
        <div className="wrap stack-lg">
          <div className="grid-2" style={{ alignItems: 'end' }}>
            <div className="stack">
              <p className="eyebrow">Cómo funciona</p>
              <h2 className="h2">Un recorrido predecible, sin sorpresas innecesarias.</h2>
            </div>
            <p className="body muted" style={{ maxWidth: '50ch' }}>
              El objetivo es pasar de “no sé por dónde empezar” a tener una agenda clara de la
              semana, con sesiones, recursos y un punto de contacto humano.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article key={step.n} className="card step-card">
                <div className="quote" style={{ fontSize: 30 }}>
                  {step.n}
                </div>
                <p className="eyebrow muted no-rule">Paso {step.n}</p>
                <h3 className="h3">{step.title}</h3>
                <p className="body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <article className="testimonial">
            <div className="testimonial-photo">
              <img
                className="photo-fill"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                alt="Miembro de GAPA"
              />
            </div>
            <div className="testimonial-body">
              <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
                Historia real
              </p>
              <p className="quote">
                “Llegué con miedo de volver a sentir lo mismo. En GAPA encontré orden, agenda y
                gente que ya pasó por algo parecido.”
              </p>
              <div className="testimonial-attr">
                <strong>Camila R.</strong>
                <span>Miembro desde marzo, Buenos Aires</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="equipo" className="section">
        <div className="wrap stack-lg">
          <div className="stack" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Profesionales</p>
            <h2 className="h2">Un equipo clínico presente, visible y humano.</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <article key={member.name} className="card team-card">
                <div className="team-photo">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="stack-sm">
                  <h3 className="h3">{member.name}</h3>
                  <p className="body-sm">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="section" style={{ background: 'var(--bg-deeper)' }}>
        <div className="wrap stack-lg">
          <div className="stack" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Planes</p>
            <h2 className="h2">Una sola membresía, distintos ritmos de continuidad.</h2>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <article key={plan.name} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
                <div className="row-between">
                  <h3 className="h3">{plan.name}</h3>
                  <span className="plan-flag tag">{plan.flag}</span>
                </div>
                <div>
                  <div className="plan-price">{plan.price}</div>
                  <p className="body-sm">{plan.suffix}</p>
                </div>
                <p className="body">{plan.desc}</p>
                <ul className="plan-items">
                  {plan.items.map((item) => (
                    <li key={item} className="row">
                      <AppIcon name="check" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/registro" className="btn btn-primary" style={{ width: '100%' }}>
                  Elegir {plan.name.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preguntas" className="section">
        <div className="wrap stack-lg">
          <div className="stack" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="h2">Respuestas claras, sin vueltas.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.q} className="faq-item">
                <div className="faq-q">
                  <h4 className="h4">{faq.q}</h4>
                </div>
                <p className="faq-a body">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="page-cover">
            <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
              Empezar
            </p>
            <h2 className="h2" style={{ color: '#FBFBFA', marginTop: 10 }}>
              Si querés ver cómo se ordena tu proceso, el próximo paso es entrar.
            </h2>
            <p className="lead" style={{ maxWidth: '44ch', marginTop: 16 }}>
              Ya podés recorrer onboarding, membresía, sesiones, campus, comunidad y panel
              administrativo dentro de la plataforma.
            </p>
            <div className="row-wrap" style={{ marginTop: 26 }}>
              <Link to="/registro" className="btn btn-primary btn-lg">
                Activar membresía
              </Link>
              <Link to="/login" className="btn btn-ghost-on-dark btn-lg">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
