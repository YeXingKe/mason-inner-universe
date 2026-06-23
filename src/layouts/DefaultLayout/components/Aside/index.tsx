import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import Logo from '@/layouts/components/Logo'
import { buildKeyPathMap, buildMenuItems } from '@/layouts/utils/buildMenuProps'
import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import { mockMenus } from '@/mocks/menus'
import { getOpenKeysByPath } from '@/utils/menu'
import './index.css'

interface AsideProps {
  activePath: string
  onMenuClick: (path: string) => void
}

export default function Aside({ activePath, onMenuClick }: AsideProps) {
  const { menuCollapse, toggleMenuCollapse, setShowMenuSearch } = useLayoutConfig()
  const menuItems = useMemo(() => buildMenuItems(mockMenus), [])
  const keyPathMap = useMemo(() => buildKeyPathMap(mockMenus), [])
  const [openKeys, setOpenKeys] = useState<string[]>(() => getOpenKeysByPath(activePath, mockMenus))

  useEffect(() => {
    if (!menuCollapse) {
      setOpenKeys(getOpenKeysByPath(activePath, mockMenus))
    }
  }, [activePath, menuCollapse])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const path = keyPathMap.get(key as string)
    if (path) onMenuClick(path)
  }

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    if (!menuCollapse) setOpenKeys(keys)
  }

  return (
    <aside className={`layout-aside ${menuCollapse ? 'layout-aside--collapsed' : ''}`}>
      <Logo collapsed={menuCollapse} />
      <div className="layout-aside__menu">
        <Menu
          mode="inline"
          inlineCollapsed={menuCollapse}
          selectedKeys={[activePath]}
          openKeys={menuCollapse ? [] : openKeys}
          onOpenChange={handleOpenChange}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
      <div className={`layout-aside__toolbar ${menuCollapse ? 'layout-aside__toolbar--collapsed' : ''}`}>
        <span className="layout-aside__toolbar-item" onClick={toggleMenuCollapse} title="折叠菜单">
          {menuCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <span className="layout-aside__toolbar-item" onClick={() => setShowMenuSearch(true)} title="菜单搜索">
          <SearchOutlined />
        </span>
      </div>
    </aside>
  )
}
