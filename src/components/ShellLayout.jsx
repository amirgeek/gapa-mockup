import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { AppIcon } from './AppIcon.jsx'
import { BrandLogo } from './BrandLogo.jsx'
import { MembershipPendingGate } from './MembershipPendingGate.jsx'
import { SosAssistant } from './SosAssistant.jsx'

function SidebarLink({ to, icon, label, badge, end = false }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
      <AppIcon name={icon} />
      <span>{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </NavLink>
  )
}

function usePageCopy(admin) {
  const location = useLocation()

  if (admin) {
    return {
      title: 'Panel general',
      subtitle: 'Operación de usuarios, sesiones y contenidos en una sola vista.',
    }
  }

  if (location.pathname.includes('/sesiones')) {
    return {
      title: 'Sesiones',
      subtitle: 'Agenda grupal con inscripción, cupos y acceso privado al Meet.',
    }
  }

  if (location.pathname.includes('/campus')) {
    return {
      title: 'Campus',
      subtitle: 'Recursos ordenados para acompañar tu proceso con calma y claridad.',
    }
  }

  if (location.pathname.includes('/perfil')) {
    return {
      title: 'Mi perfil',
      subtitle: 'Tu membresía, tu perfil interno y el resumen de tu punto de partida.',
    }
  }

  return {
    title: 'Inicio',
    subtitle: 'Tu agenda, tus recursos y tu seguimiento ya están ordenados.',
  }
}

export function ShellLayout({ admin = false }) {
  const { currentUser, logout, state } = useAppContext()
  const navigate = useNavigate()
  const page = usePageCopy(admin)
  const membershipPending = !admin && currentUser?.membershipStatus !== 'active'

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className={`app-shell ${admin ? 'app-shell-admin' : 'app-shell-member'}`}>
      <div className="app-layout">
        <aside className={`app-sidebar ${admin ? 'app-sidebar-admin' : 'app-sidebar-member'}`}>
          <div>
            <BrandLogo to={admin ? '/admin' : '/app'} />
            <div className="side-nav-section">
              {admin ? 'Operación interna' : 'Experiencia de membresía'}
            </div>
            <div className="side-nav">
              {admin ? (
                <>
                  <SidebarLink to="/admin" icon="settings" label="Panel operativo" end />
                  <SidebarLink to="/app" icon="home" label="Ir a experiencia miembro" end />
                </>
              ) : (
                <>
                  <SidebarLink to="/app" icon="home" label="Inicio" end />
                  <SidebarLink to="/app/perfil" icon="user" label="Mi perfil" />
                  <SidebarLink
                    to="/app/sesiones"
                    icon="calendar"
                    label="Sesiones"
                    badge={String(state.sessions.length)}
                  />
                  <SidebarLink to="/app/campus" icon="book" label="Campus" />
                </>
              )}
            </div>
            <div className="shell-note">
              <p className="eyebrow no-rule">{admin ? 'Backoffice' : 'Miembros pagos'}</p>
              <p className="body-sm" style={{ marginTop: 8 }}>
                {admin
                  ? 'Alta de sesiones, publicación de contenido y seguimiento operativo de la plataforma.'
                  : 'Campus clínico, agenda de encuentros y herramientas para sostener el proceso.'}
              </p>
            </div>
          </div>

          <div>
            <div className="sidebar-user">
              <div className="avatar">{currentUser?.name?.charAt(0)?.toUpperCase() ?? 'G'}</div>
              <div>
                <strong>{currentUser?.name ?? 'Miembro GAPA'}</strong>
                <span>{admin ? 'Administrador' : membershipPending ? 'Membresía pendiente' : 'Membresía activa'}</span>
              </div>
            </div>
            <button
              type="button"
              className="side-link"
              style={{ marginTop: 8, width: '100%' }}
              onClick={handleLogout}
            >
              <AppIcon name="logout" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>

        <main className="app-main">
          <div className="app-topbar">
            <div>
              <p className="eyebrow no-rule">{admin ? 'Administración GAPA' : 'GAPA miembros'}</p>
              <h1 className="h2" style={{ marginTop: 8 }}>
                {page.title}
              </h1>
              <p className="body-sm" style={{ marginTop: 8 }}>
                {page.subtitle}
              </p>
            </div>
            <div className="search-shell">
              <AppIcon name="search" />
              <span>{admin ? 'Usuarios, sesiones y recursos' : 'Sesiones, campus y proceso'}</span>
            </div>
          </div>
          {membershipPending ? <MembershipPendingGate /> : <Outlet />}
        </main>
      </div>
      {admin ? null : <SosAssistant />}
    </div>
  )
}
