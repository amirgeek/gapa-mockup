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
    eyebrow: 'Proceso',
    title: 'Un recorrido sostenido cambia la experiencia.',
    body: 'La membresía abre acceso a campus, sesiones y seguimiento para sostener un proceso continuo.',
    foot: 'Acompañamiento continuo',
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
    body: 'El alta crea tu cuenta y desbloquea sesiones, campus y seguimiento al mismo tiempo.',
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
    price: '$24.999',
    suffix: 'por mes, cancelable cuando quieras',
    desc: 'Para empezar el recorrido con acceso completo a la experiencia principal de GAPA.',
    items: [
      'Acceso al campus con contenido clínico',
      'Acceso a sesiones publicadas en la plataforma',
      'Recorrido personalizado según onboarding',
      'Agenda y seguimiento personal',
    ],
  },
  {
    name: 'Trimestral',
    flag: 'Recomendada',
    price: '$69.900',
    suffix: 'cada 3 meses, equivalente a $23.300 por mes',
    desc: 'Pensada para sostener continuidad y evitar cortar el proceso al primer mes.',
    featured: true,
    items: [
      'Todo lo del plan mensual',
      'Mayor continuidad de uso',
      'Campus recomendado según perfil interno',
      'Mejor organización del proceso en el tiempo',
    ],
  },
]

const team = [
  {
    name: 'Agustina',
    role: 'Psicóloga MP 47942',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Juan Pablo',
    role: 'Psicólogo MP 47102',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
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
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80"
          alt="Espacio sereno de acompañamiento"
        />
        <div className="hero-content wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow hero-eyebrow">
                Grupo de Afrontamiento contra Problemas de Ansiedad
              </p>
              <h1 style={{ marginTop: 16 }}>
                Afrontar la ansiedad con <em>herramientas reales.</em>
              </h1>
              <p className="lead">
                Psicología clara, sin vueltas. Una plataforma de membresía con sesiones
                profesionales, campus clínico y seguimiento para sostener un proceso sin
                sobrecargar.
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
                  <strong>Onboarding</strong>perfilamiento inicial para ordenar el recorrido
                </div>
                <div className="hero-meta">
                  <strong>Campus</strong>psicoeducación, herramientas y seguimiento
                </div>
                <div className="hero-meta">
                  <strong>Sesiones</strong>encuentros grupales con acceso privado
                </div>
              </div>
            </div>
            <div className="hero-tile">
              <p className="eyebrow hero-eyebrow no-rule">Dentro de la plataforma</p>
              <h3 style={{ marginTop: 8 }}>Sesiones grupales, campus y seguimiento en un mismo lugar.</h3>
              <p className="body-sm" style={{ color: 'rgba(251,251,250,0.78)', marginTop: 10 }}>
                Los encuentros se cargan desde administración con link privado de Meet, y cada
                usuario accede a contenidos y herramientas según su perfil interno.
              </p>
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
                <span className="quote" style={{ color: '#FBFBFA', fontSize: 42 }}>
                  4
                </span>
                <p className="body-sm" style={{ color: 'rgba(251,251,250,0.78)' }}>
                  módulos clave: inicio, sesiones, campus y mi proceso
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
              No es una app para distraerte. <em className="accent">Es una plataforma para entender qué te pasa y responder mejor.</em>
            </h2>
            <p className="lead muted">
              Cada decisión de producto busca bajar carga cognitiva, ordenar el proceso y acercar
              herramientas concretas para afrontar la ansiedad con más claridad.
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
                alt="Espacio de acompañamiento profesional"
              />
            </div>
            <div className="testimonial-body">
              <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
                Enfoque GAPA
              </p>
              <p className="quote">
                “No trabajamos etiquetas. Trabajamos con cómo funciona tu ansiedad y con qué
                herramientas pueden ayudarte a responder distinto.”
              </p>
              <div className="testimonial-attr">
                <strong>Recorrido guiado</strong>
                <span>Psicoeducación, comunidad, proceso y herramientas en el momento</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="equipo" className="section">
        <div className="wrap stack-lg">
          <div className="stack" style={{ maxWidth: 760 }}>
            <p className="eyebrow">Profesionales</p>
            <h2 className="h2">Psicología clara, sin vueltas, sostenida por un equipo real.</h2>
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
            <h2 className="h2">Una sola membresía para sostener el proceso con continuidad.</h2>
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
              Si querés afrontar la ansiedad con herramientas reales, el próximo paso es entrar.
            </h2>
            <p className="lead" style={{ maxWidth: '44ch', marginTop: 16 }}>
              Ya podés recorrer onboarding, membresía, sesiones, campus, comunidad y seguimiento
              dentro de la plataforma.
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
