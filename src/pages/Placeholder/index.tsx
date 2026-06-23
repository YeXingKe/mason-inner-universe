import { Card, Empty } from 'antd'
import { useLocation } from 'react-router-dom'
import { findMenuByPath } from '@/mocks/menus'

export default function Placeholder() {
  const { pathname } = useLocation()
  const menu = findMenuByPath(pathname)

  return (
    <div className="page">
      <Card variant="borderless" style={{ boxShadow: 'var(--app-shadow)' }}>
        <Empty
          description={
            <span>
              「{menu?.title ?? pathname}」页面内容区域
              <br />
              <small style={{ color: 'var(--app-text-muted)' }}>当前为静态演示，数据均为模拟数据</small>
            </span>
          }
        />
      </Card>
    </div>
  )
}
