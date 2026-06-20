import { Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { AdminOnlyRoute, PrivateRoute, PublicOnlyRoute } from './components/RouteGuards.jsx'
import { ShellLayout } from './components/ShellLayout.jsx'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { SessionsPage } from './pages/SessionsPage.jsx'
import { CampusPage } from './pages/CampusPage.jsx'
import { ComunidadPage } from './pages/ComunidadPage.jsx'
import { AdminPage } from './pages/AdminPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <ShellLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="sesiones" element={<SessionsPage />} />
          <Route path="campus" element={<CampusPage />} />
          <Route path="comunidad" element={<ComunidadPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminOnlyRoute>
              <ShellLayout admin />
            </AdminOnlyRoute>
          }
        >
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
