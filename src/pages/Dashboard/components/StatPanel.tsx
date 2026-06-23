import {
  AppstoreOutlined,
  FileTextOutlined,
  LineChartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useCountUp } from '../hooks/useCountUp'

const statIcons = {
  'line-chart': LineChartOutlined,
  'file-text': FileTextOutlined,
  users: TeamOutlined,
  appstore: AppstoreOutlined,
} as const

export type StatIconKey = keyof typeof statIcons

interface StatPanelProps {
  title: string
  value: number
  trend: string
  icon: StatIconKey
  color: string
}

export default function StatPanel({ title, value, trend, icon, color }: StatPanelProps) {
  const animated = useCountUp(value)
  const Icon = statIcons[icon]

  return (
    <div className="dashboard__stat dashboard__card">
      <div className="dashboard__stat-title">{title}</div>
      <div className="dashboard__stat-body">
        <div className="dashboard__stat-main">
          <Icon style={{ color, fontSize: 20 }} />
          <span className="dashboard__stat-value">{animated.toLocaleString()}</span>
        </div>
        <div className="dashboard__stat-trend">{trend}</div>
      </div>
    </div>
  )
}
