import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/useAppContext.jsx'
import { BrandLogo } from '../components/BrandLogo.jsx'
import { AppIcon } from '../components/AppIcon.jsx'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAppContext()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await login(formData.email, formData.password)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate(result.user.role === 'admin' ? '/admin' : '/app')
  }

  return (
    <div className="auth-page">
      <div className="auth-art">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80"
          alt="Espacio sereno de GAPA"
        />
        <div className="auth-art-content">
          <BrandLogo to="/" inverted />
          <div className="auth-art-quote">
            <p className="eyebrow" style={{ color: 'var(--green-light)' }}>
              Una sala que ya está armada
            </p>
            <p className="quote" style={{ color: '#FBFBFA' }}>
              “Volver a entrar es lo más parecido a abrir la puerta de un lugar conocido.”
            </p>
            <p className="attr">Camila R., miembro desde marzo</p>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="stack-sm">
            <p className="eyebrow">Iniciar sesión</p>
            <h2 className="h2">Bienvenida de vuelta.</h2>
            <p className="body-sm">
              Ingresá con tu correo para volver a tu campus, tus sesiones y tu seguimiento
              personal.
            </p>
          </div>

          <div className="field">
            <label htmlFor="login-email">Correo</label>
            <input
              id="login-email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="••••••••"
              required
            />
          </div>

          <div className="row-between auth-support-row" style={{ fontSize: 14 }}>
            <label className="row" style={{ gap: 8, color: 'var(--muted)' }}>
              <input type="checkbox" style={{ width: 16 }} defaultChecked />
              Recordarme
            </label>
            <span style={{ color: 'var(--blue)', fontWeight: 700 }}>
              Si no recordás tu clave, pedí asistencia al equipo.
            </span>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', opacity: submitting ? 0.7 : 1 }}
            disabled={submitting}
          >
            {submitting ? 'Entrando...' : 'Entrar'}
            <AppIcon name="arrow" size={16} />
          </button>

          <p className="body-sm" style={{ textAlign: 'center' }}>
            ¿Todavía no tenés cuenta?{' '}
            <Link to="/registro" style={{ color: 'var(--green-deep)', fontWeight: 700 }}>
              Activar membresía
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
