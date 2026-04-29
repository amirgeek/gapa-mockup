import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { BrandLogo } from '../components/BrandLogo.jsx'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAppContext()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const result = login(formData.email, formData.password)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate(result.user.role === 'admin' ? '/admin' : '/app')
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <BrandLogo to="/" size="lg" />
        <div>
          <p className="eyebrow">Bienvenido de vuelta</p>
          <h1>Ingresar a GAPA</h1>
          <p className="muted-copy">
            Volve a tus sesiones, recomendaciones y recursos en un entorno simple y acompanado.
          </p>
        </div>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            placeholder="tu@email.com"
          />
        </label>

        <label className="field">
          <span>Contrasena</span>
          <input
            type="password"
            value={formData.password}
            onChange={(event) =>
              setFormData((current) => ({ ...current, password: event.target.value }))
            }
            placeholder="********"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit">
          Ingresar
        </button>

        <div className="auth-footer">
          <Link to="/">Volver al inicio</Link>
          <Link to="/registro">Crear cuenta con membresia</Link>
        </div>
      </form>
    </div>
  )
}
