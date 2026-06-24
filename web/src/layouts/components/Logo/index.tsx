import { mockSiteName } from '@/mocks/adminInfo'
import './index.css'

interface LogoProps {
  collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`layout-logo ${collapsed ? 'layout-logo--collapsed' : ''}`}>
      <img src="/logo.svg" alt="logo" className="layout-logo__img" />
      {!collapsed && <span className="layout-logo__name">{mockSiteName}</span>}
    </div>
  )
}
