import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext.jsx'
import { BrandLogo } from './BrandLogo.jsx'

function BottomNavItem({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? 'flex flex-col items-center text-primary bg-surface-container-high rounded-full px-4 py-2'
          : 'flex flex-col items-center text-on-surface/50 hover:opacity-80'
      }
    >
      {({ isActive }) => (
        <>
          <span
            className="material-symbols-outlined"
            style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {icon}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export function ShellLayout({ admin = false }) {
  const { currentUser, logout } = useAppContext()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-[#f6faf7]/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <BrandLogo to={admin ? '/admin' : '/app'} />
          <div className="flex items-center gap-4">
            {admin ? (
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary-container/20 px-3 py-1 rounded-full">
                Admin
              </span>
            ) : (
              <button className="material-symbols-outlined text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low transition-all text-2xl">
                search
              </button>
            )}
            <div
              className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold cursor-pointer border-2 border-primary-fixed"
              onClick={() => logout()}
              title="Cerrar sesión"
            >
              {currentUser?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-28">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full rounded-t-[2rem] z-50 bg-[#f6faf7]/80 backdrop-blur-lg shadow-lg">
        <div className="flex justify-around items-center px-4 pb-6 pt-3">
          {admin ? (
            <>
              <BottomNavItem to="/admin" icon="admin_panel_settings" label="Admin" end />
              <BottomNavItem to="/app" icon="person" label="Usuario" end />
            </>
          ) : (
            <>
              <BottomNavItem to="/app" icon="home" label="Home" end />
              <BottomNavItem to="/app/sesiones" icon="calendar_month" label="Sessions" />
              <BottomNavItem to="/app/comunidad" icon="groups" label="Community" />
              <BottomNavItem to="/app/campus" icon="school" label="Campus" />
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
