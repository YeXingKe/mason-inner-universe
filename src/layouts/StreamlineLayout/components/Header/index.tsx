import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import Logo from '@/layouts/components/Logo'
import NavMenus from '@/layouts/components/NavMenus'
import { buildKeyPathMap, buildMenuItems } from '@/layouts/utils/buildMenuProps'
import { mockMenus } from '@/mocks/menus'
import './index.css'

interface HeaderProps {
  activePath: string
  onMenuClick: (path: string) => void
}

export default function Header({ activePath, onMenuClick }: HeaderProps) {
  const menuItems = useMemo(() => buildMenuItems(mockMenus, { horizontal: true }), [])
  const keyPathMap = useMemo(() => buildKeyPathMap(mockMenus), [])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const path = keyPathMap.get(key as string)
    if (path) onMenuClick(path)
  }

  return (
    <header className="streamline-header">
      <div className="streamline-header__logo">
        <Logo collapsed={false} />
      </div>
      <div className="streamline-header__menu">
        <Menu mode="horizontal" selectedKeys={[activePath]} items={menuItems} onClick={handleMenuClick} />
      </div>
      <NavMenus />
    </header>
  )
}
