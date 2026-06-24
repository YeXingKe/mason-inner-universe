import { RightOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import { useMemo } from 'react'
import { EChartBox } from '@/components'
import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import { mockAdminInfo } from '@/mocks/adminInfo'
import StatPanel from './components/StatPanel'
import { getGreet, mockNewUsers, mockRemark, mockStats } from './constants'
import { useWorkingTimer } from './hooks/useWorkingTimer'
import {
  getFileGrowthOption,
  getUserGrowthOption,
  getUserSourceOption,
  getUserSurnameOption,
} from './utils/chartOptions'
import './index.css'

export default function Dashboard() {
  const { isDark } = useLayoutConfig()
  const { workingTimeFormat, pauseWork, toggleWorkState } = useWorkingTimer()

  const userGrowthOption = useMemo(() => getUserGrowthOption(isDark), [isDark])
  const fileGrowthOption = useMemo(() => getFileGrowthOption(isDark), [isDark])
  const userSourceOption = useMemo(() => getUserSourceOption(), [])
  const userSurnameOption = useMemo(() => getUserSurnameOption(isDark), [isDark])

  return (
    <div className="page dashboard">
      <div className="dashboard__banner">
        <Row gutter={10}>
          <Col xs={24} lg={18}>
            <div className="dashboard__welcome dashboard__card">
              <img className="dashboard__welcome-image" src="/dashboard/header-1.svg" alt="" />
              <div className="dashboard__welcome-body">
                <div className="dashboard__welcome-title">
                  {mockAdminInfo.nickname}，{getGreet()}！
                </div>
                <div className="dashboard__welcome-note">{mockRemark}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={6} className="dashboard__timer-col">
            <div className="dashboard__timer">
              <img className="dashboard__timer-image" src="/dashboard/coffee.svg" alt="" />
              <div className="dashboard__timer-text">
                今日已工作<span className="dashboard__timer-value">{workingTimeFormat}</span>
              </div>
              <div className="dashboard__timer-action" onClick={toggleWorkState}>
                {pauseWork ? '继续工作' : '休息一下'}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="dashboard__stats">
        <Row gutter={20}>
          {mockStats.map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.key}>
              <StatPanel {...item} icon={item.icon} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="dashboard__charts">
        <Row gutter={20}>
          <Col xs={24} md={12} lg={9} className="dashboard__col--stack">
            <Card hoverable title="会员增长">
              <EChartBox option={userGrowthOption} className="dashboard__chart--user-growth" height={260} />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={9} className="dashboard__col--stack">
            <Card hoverable title="附件增长">
              <EChartBox option={fileGrowthOption} className="dashboard__chart--file-growth" height={260} />
            </Card>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <Card hoverable title="新会员" className="dashboard__members-card">
              <div className="dashboard__members">
                {mockNewUsers.map((user) => (
                  <div className="dashboard__member dashboard__card" key={user.name}>
                    <img className="dashboard__member-avatar" src={user.avatar} alt={user.name} />
                    <div className="dashboard__member-body">
                      <div className="dashboard__member-name">{user.name}</div>
                      <div className="dashboard__member-time">12分钟前加入了我们</div>
                    </div>
                    <RightOutlined className="dashboard__member-arrow" style={{ color: '#8595F4' }} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="dashboard__charts">
        <Row gutter={20}>
          <Col xs={24} lg={12} className="dashboard__col--stack">
            <Card hoverable title="会员来源">
              <EChartBox option={userSourceOption} className="dashboard__chart--user-source" height={400} />
            </Card>
          </Col>
          <Col xs={24} lg={12} className="dashboard__col--stack">
            <Card hoverable title="会员姓氏">
              <EChartBox option={userSurnameOption} className="dashboard__chart--user-surname" height={400} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
