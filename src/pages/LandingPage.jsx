import { Link } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo.jsx'

export function LandingPage() {
  return (
    <div className="marketing-shell">
      <header className="marketing-header">
        <BrandLogo subtitle="Terapia grupal guiada" />
        <div className="header-actions">
          <Link className="ghost-button" to="/login">
            Iniciar sesion
          </Link>
          <Link className="primary-button" to="/registro">
            Activar membresia
          </Link>
        </div>
      </header>

      <main className="marketing-main">
        <section className="hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">Membresia, campus y sesiones guiadas en un solo lugar</div>
            <h2>
              Una plataforma calma, clara y humana para <span>no transitarlo en soledad</span>
            </h2>
            <p>
              GAPA organiza acompanamiento profesional, sesiones grupales y contenido recomendado
              en una experiencia simple de usar, pensada para transmitir apoyo desde la primera
              interaccion.
            </p>
            <div className="cta-row">
              <Link className="primary-button" to="/registro">
                Comenzar con membresia
              </Link>
              <Link className="secondary-button" to="/login">
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <p className="eyebrow">Plataforma demo funcional</p>
            <h3>Que ya se puede recorrer hoy</h3>
            <ul className="feature-list">
              <li>Auth con roles `admin` y `usuario`</li>
              <li>Membresia obligatoria antes del alta</li>
              <li>Onboarding con perfil interno y recomendaciones</li>
              <li>Sesiones con inscripcion y acceso privado</li>
              <li>Campus con contenidos por categoria y sugerencias</li>
            </ul>
          </div>
        </section>

        <section className="marketing-panels">
          <article className="info-card">
            <p className="eyebrow">Experiencia</p>
            <h3>Contencion profesional, interfaz predecible</h3>
            <p>
              Cada flujo intenta bajar friccion: primero acompanar, despues orientar, y por ultimo
              llevar a la accion sin saturar.
            </p>
          </article>
          <article className="info-card accent-card">
            <p className="eyebrow">Valor de la membresia</p>
            <h3>El acceso paga por acompanamiento continuo</h3>
            <p>
              La cuenta no se crea sin membresia porque el producto gira alrededor del acceso a
              sesiones, campus y seguimiento personalizado.
            </p>
          </article>
          <article className="info-card">
            <p className="eyebrow">Accesos demo</p>
            <p>
              Admin: <strong>admin@gapa.app</strong> / <strong>admin123</strong>
            </p>
            <p>
              Usuario: <strong>elena@gapa.app</strong> / <strong>demo123</strong>
            </p>
          </article>
        </section>
      </main>
    </div>
  )
}
