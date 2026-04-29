import { Link } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo.jsx'

const pillars = [
  {
    eyebrow: 'Calma',
    title: 'Un entorno claro para bajar friccion desde el primer ingreso',
    body:
      'La experiencia esta pensada para orientar rapido, sostener una lectura tranquila y evitar sobrecarga visual en momentos sensibles.',
  },
  {
    eyebrow: 'Confianza',
    title: 'Acompanamiento profesional con sesiones, campus y recorrido guiado',
    body:
      'La membresia organiza acceso a encuentros, recursos y seguimiento dentro de una plataforma simple de usar.',
  },
  {
    eyebrow: 'Comunidad',
    title: 'No se trata solo de contenido, se trata de no atravesarlo en soledad',
    body:
      'GAPA combina profesionales, recursos y comunidad para construir una experiencia de apoyo continuo.',
  },
]

const steps = [
  'Completar un onboarding breve para detectar tu categoria interna.',
  'Activar la membresia para acceder a la plataforma completa.',
  'Entrar a sesiones, campus y recomendaciones personalizadas.',
]

const plans = [
  {
    name: 'Membresia mensual',
    detail: 'Para validar adopcion y uso continuo.',
    items: ['Acceso al campus', 'Inscripcion a sesiones', 'Recomendado para vos'],
  },
  {
    name: 'Membresia trimestral',
    detail: 'Pensada para procesos con mayor continuidad.',
    items: ['Todo lo mensual', 'Seguimiento mas sostenido', 'Mejor marco para retencion'],
  },
]

export function LandingPage() {
  return (
    <div className="marketing-shell">
      <header className="marketing-header">
        <BrandLogo />
        <nav className="marketing-nav">
          <a href="#nosotros">Nosotros</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#planes">Planes</a>
        </nav>
        <div className="header-actions">
          <Link className="ghost-button" to="/login">
            Iniciar sesion
          </Link>
          <Link className="primary-button" to="/registro">
            Activar membresia
          </Link>
        </div>
      </header>

      <main className="marketing-main landing-stack">
        <section className="hero-grid landing-hero">
          <div className="hero-copy">
            <div className="hero-badge">Grupo de afrontamiento, sesiones y campus en un solo lugar</div>
            <h2>
              Un espacio digital de apoyo para <span>atravesar la ansiedad con mas contencion</span>
            </h2>
            <p>
              GAPA es una plataforma de membresia pensada para acompanar a personas de la comunidad
              hispanoparlante que buscan un entorno claro, humano y profesional para su proceso.
            </p>
            <div className="cta-row">
              <Link className="primary-button" to="/registro">
                Quiero conocer GAPA
              </Link>
              <Link className="secondary-button" to="/login">
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          <div className="hero-card hero-card-tall">
            <p className="eyebrow">Sobre GAPA</p>
            <h3>Grupo de Afrontamiento contra Problemas de Ansiedad</h3>
            <p>
              La propuesta combina acompanamiento, orientacion y acceso ordenado a recursos para que
              cada usuario sienta apoyo real desde el primer contacto.
            </p>
            <div className="hero-card-list">
              <span>Sesiones con profesionales</span>
              <span>Campus con contenido segmentado</span>
              <span>Onboarding con perfil interno</span>
            </div>
          </div>
        </section>

        <section id="nosotros" className="marketing-section">
          <div className="section-heading">
            <p className="eyebrow">Nosotros</p>
            <h2>Una plataforma construida sobre empatia, evidencia y acompanamiento</h2>
            <p>
              GAPA busca traducir contencion emocional en una experiencia digital ordenada. Nada en
              la interfaz deberia sentirse agresivo, confuso o distante.
            </p>
          </div>

          <div className="marketing-panels marketing-panels-three">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="info-card">
                <p className="eyebrow">{pillar.eyebrow}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="marketing-section">
          <div className="section-heading">
            <p className="eyebrow">Como funciona</p>
            <h2>El recorrido esta pensado para llevar a valor sin abrumar</h2>
          </div>

          <div className="journey-grid">
            <article className="surface-card journey-card">
              <span className="journey-number">1</span>
              <h3>Conocemos tu momento actual</h3>
              <p>
                Un cuestionario breve perfila al usuario para ordenar mejor el punto de partida
                dentro del campus.
              </p>
            </article>
            <article className="surface-card journey-card">
              <span className="journey-number">2</span>
              <h3>La membresia habilita el acceso completo</h3>
              <p>
                El alta no se separa del modelo de negocio: la cuenta se crea junto con la
                activacion de la membresia.
              </p>
            </article>
            <article className="surface-card journey-card">
              <span className="journey-number">3</span>
              <h3>El usuario entra a sesiones, campus y recomendaciones</h3>
              <p>
                Todo queda dentro de un mismo flujo: recursos, agenda y contenidos asociados a su
                categoria interna.
              </p>
            </article>
          </div>

          <div className="surface-card process-card">
            <p className="eyebrow">Recorrido resumido</p>
            <ul className="feature-list">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="planes" className="marketing-section">
          <div className="section-heading">
            <p className="eyebrow">Planes</p>
            <h2>La membresia es la puerta de entrada a la experiencia completa</h2>
            <p>
              Hoy la demo muestra dos formatos simples para presentar el modelo. El foco esta en
              dejar claro que el valor no es solo acceso, sino acompanamiento continuo.
            </p>
          </div>

          <div className="plan-grid">
            {plans.map((plan) => (
              <article key={plan.name} className="surface-card plan-card">
                <p className="eyebrow">{plan.name}</p>
                <h3>$XX</h3>
                <p>{plan.detail}</p>
                <ul className="feature-list">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card closing-card">
          <div>
            <p className="eyebrow">Empezar</p>
            <h2>Una plataforma clara para que el usuario sienta apoyo desde la primera pantalla</h2>
            <p>
              Si queres recorrer la experiencia completa, el siguiente paso es entrar por el
              onboarding y activar la membresia.
            </p>
          </div>
          <div className="cta-row">
            <Link className="primary-button" to="/registro">
              Ver onboarding
            </Link>
            <Link className="ghost-button" to="/login">
              Ingresar
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
