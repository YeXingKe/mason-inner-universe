import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { LayoutConfigProvider } from '@/contexts/LayoutConfigContext'
import '@/styles/global.css'
import '@/styles/tokens.css'

dayjs.locale('zh-cn')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LayoutConfigProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LayoutConfigProvider>
  </StrictMode>,
)
