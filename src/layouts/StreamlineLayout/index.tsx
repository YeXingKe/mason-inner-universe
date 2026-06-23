import Header from './components/Header'
import LayoutConfigDrawer from '@/layouts/components/LayoutConfigDrawer'
import MainContent from '@/layouts/components/MainContent'
import MenuSearchModal from '@/layouts/components/MenuSearchModal'
import { useLayoutTabs } from '@/layouts/hooks/useLayoutTabs'
import './index.css'

export default function StreamlineLayout() {
  const { activePath, openTab } = useLayoutTabs()

  return (
    <div className="streamline-layout">
      <Header activePath={activePath} onMenuClick={openTab} />
      <div className="streamline-layout__body">
        <MainContent />
      </div>
      <LayoutConfigDrawer />
      <MenuSearchModal onSelect={openTab} />
    </div>
  )
}
