import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import { flattenMenus, mockMenus } from '@/mocks/menus'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Placeholder from '@/pages/Placeholder'
import type { MenuItem } from '@/types/menu'

const leafMenus = flattenMenus(mockMenus)

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        {leafMenus
          .filter((menu: MenuItem) => menu.path !== '/dashboard')
          .map((menu: MenuItem) => (
            <Route key={menu.path} path={menu.path.slice(1)} element={<Placeholder />} />
          ))}
      </Route>
    </Routes>
  )
}
