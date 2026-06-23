import Aside from './components/Aside'
import Header from './components/Header'
import LayoutConfigDrawer from '@/layouts/components/LayoutConfigDrawer'
import MainContent from '@/layouts/components/MainContent'
import MenuSearchModal from '@/layouts/components/MenuSearchModal'
import { useLayoutTabs } from '@/layouts/hooks/useLayoutTabs'
import './index.css'

export default function DefaultLayout() {
  const { tabs, activeKey, openTab, handleTabClick, handleTabClose } = useLayoutTabs()

  return (
    <div className="layout">
      <Aside activePath={activeKey} onMenuClick={openTab} />
      <div className="layout__body">
        <Header tabs={tabs} activeKey={activeKey} onTabClick={handleTabClick} onTabClose={handleTabClose} />
        <MainContent />
      </div>
      <LayoutConfigDrawer />
      <MenuSearchModal onSelect={openTab} />
    </div>
  )
}
