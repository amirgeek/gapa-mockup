import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'

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
    <div className="min-h-screen flex items-center justify-center px-6 bg-surface">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-5xl text-primary mb-2 block">diversity_1</span>
          <h1 className="font-headline text-4xl font-bold text-primary italic">GAPA</h1>
          <p className="text-on-surface-variant mt-2">Bienvenido de vuelta</p>
        </div>

        <form className="bg-surface-container-low rounded-xl p-8 shadow-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((c) => ({ ...c, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
              Contraseña
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((c) => ({ ...c, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          {error ? (
            <p className="text-sm font-bold text-error">{error}</p>
          ) : null}

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all mt-2"
          >
            Ingresar
          </button>

          <p className="text-center text-sm text-on-surface-variant">
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="text-primary font-bold hover:underline">
              Registrarme
            </Link>
          </p>
        </form>

        <Link
          to="/"
          className="mt-6 flex items-center gap-2 text-on-surface-variant text-sm mx-auto hover:text-on-surface transition-colors justify-center"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
