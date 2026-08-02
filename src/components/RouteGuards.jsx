import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'

function AuthSplash() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--bg)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            margin: '0 auto 16px',
            borderRadius: '999px',
            border: '3px solid rgba(47,107,62,0.18)',
            borderTopColor: 'var(--green)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{'@keyframes spin { to { transform: rotate(360deg) } }'}</style>
        <p className="body-sm" style={{ color: 'var(--muted)' }}>
          Cargando GAPA…
        </p>
      </div>
    </div>
  )
}

export function PrivateRoute({ children }) {
  const { currentUser, authReady } = useAppContext()
  const location = useLocation()

  if (!authReady) {
    return <AuthSplash />
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export function PublicOnlyRoute({ children }) {
  const { currentUser, authReady } = useAppContext()

  if (!authReady) {
    return <AuthSplash />
  }

  if (!currentUser) {
    return children
  }

  return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/app'} replace />
}

export function AdminOnlyRoute({ children }) {
  const { currentUser, authReady } = useAppContext()

  if (!authReady) {
    return <AuthSplash />
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/app" replace />
  }

  return children
}
