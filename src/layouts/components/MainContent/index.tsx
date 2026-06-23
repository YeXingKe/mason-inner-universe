import { Outlet } from 'react-router-dom'
import './index.css'

export default function MainContent() {
  return (
    <main className="layout-main">
      <div className="layout-main__scrollbar">
        <Outlet />
      </div>
    </main>
  )
}
