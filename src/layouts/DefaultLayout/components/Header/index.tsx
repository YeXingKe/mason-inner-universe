import NavMenus from '@/layouts/components/NavMenus'
import NavTabs from '@/layouts/components/NavTabs'
import type { TabItem } from '@/types/menu'
import './index.css'

interface HeaderProps {
  tabs: TabItem[]
  activeKey: string
  onTabClick: (key: string) => void
  onTabClose: (key: string) => void
}

export default function Header({ tabs, activeKey, onTabClick, onTabClose }: HeaderProps) {
  return (
    <header className="layout-header">
      <NavTabs tabs={tabs} activeKey={activeKey} onTabClick={onTabClick} onTabClose={onTabClose} />
      <NavMenus />
    </header>
  )
}
