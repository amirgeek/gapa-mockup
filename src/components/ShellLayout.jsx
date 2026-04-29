import { NavLink, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { BrandLogo } from './BrandLogo.jsx'

function AppNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === '/app' || to === '/admin'}
      className={({ isActive }) => (isActive ? 'nav-pill nav-pill-active' : 'nav-pill')}
    >
      {children}
    </NavLink>
  )
}

export function ShellLayout({ admin = false }) {
  const { currentUser, logout } = useAppContext()

  return (
    <div className="app-shell">
      <header className="topbar">
        <BrandLogo
          to={admin ? '/admin' : '/app'}
          subtitle="Plataforma de bienestar"
          size="sm"
        />
        <div className="topbar-actions">
          <div className="profile-chip">
            <span>{currentUser?.name}</span>
            <strong>{currentUser?.role === 'admin' ? 'Admin' : 'Membresia activa'}</strong>
          </div>
          <button type="button" className="ghost-button" onClick={logout}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <div className="shell-body">
        <aside className="sidebar">
          <div className="sidebar-card">
            <p className="eyebrow">Navegacion</p>
            {admin ? (
              <>
                <AppNavLink to="/admin">Panel general</AppNavLink>
                <AppNavLink to="/app">Ver experiencia usuario</AppNavLink>
              </>
            ) : (
              <>
                <AppNavLink to="/app">Inicio</AppNavLink>
                <AppNavLink to="/app/sesiones">Sesiones</AppNavLink>
                <AppNavLink to="/app/campus">Campus</AppNavLink>
                {currentUser?.role === 'admin' ? <AppNavLink to="/admin">Admin</AppNavLink> : null}
              </>
            )}
          </div>
          <div className="sidebar-card sidebar-highlight">
            <p className="eyebrow">Estado beta</p>
            <h3>Base funcional para validar la plataforma</h3>
            <p>
              La demo ya muestra acceso, sesiones, campus, recomendaciones y operacion admin dentro
              de una experiencia unificada.
            </p>
          </div>
        </aside>

        <main className="content-panel">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
