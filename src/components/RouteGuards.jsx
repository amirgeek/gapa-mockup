import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'

export function PrivateRoute({ children }) {
  const { currentUser } = useAppContext()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export function PublicOnlyRoute({ children }) {
  const { currentUser } = useAppContext()

  if (!currentUser) {
    return children
  }

  return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/app'} replace />
}

export function AdminOnlyRoute({ children }) {
  const { currentUser } = useAppContext()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/app" replace />
  }

  return children
}
