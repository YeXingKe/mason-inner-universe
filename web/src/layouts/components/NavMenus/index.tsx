import {
  DesktopOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Popover } from 'antd'
import dayjs from 'dayjs'
import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import { mockAdminInfo } from '@/mocks/adminInfo'
import './index.css'

export default function NavMenus() {
  const { setShowConfigDrawer } = useLayoutConfig()

  const langItems = [
    { key: 'zh-cn', label: '简体中文' },
    { key: 'en', label: 'English' },
  ]

  return (
    <div className="nav-menus">
      <a className="nav-menus__item" href="/login" title="登录页">
        <DesktopOutlined />
      </a>

      <Dropdown menu={{ items: langItems }} trigger={['click']} placement="bottom">
        <span className="nav-menus__item" title="语言切换">
          <GlobalOutlined />
        </span>
      </Dropdown>

      <span className="nav-menus__item" title="全屏">
        <FullscreenOutlined />
      </span>

      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <div className="nav-menus__profile-popover">
            <div className="nav-menus__profile-header">
              <Avatar size={70} src={mockAdminInfo.avatar} />
              <div className="nav-menus__profile-name--large">{mockAdminInfo.nickname}</div>
              <div className="nav-menus__profile-time">
                上次登录：{dayjs(mockAdminInfo.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
            <div className="nav-menus__profile-footer">
              <Button type="primary" ghost icon={<UserOutlined />}>
                个人资料
              </Button>
              <Button danger ghost icon={<LogoutOutlined />}>
                退出登录
              </Button>
            </div>
          </div>
        }
      >
        <div className="nav-menus__profile">
          <Avatar size={25} src={mockAdminInfo.avatar} />
          <span className="nav-menus__profile-name">{mockAdminInfo.nickname}</span>
        </div>
      </Popover>

      <span className="nav-menus__item" title="布局配置" onClick={() => setShowConfigDrawer(true)}>
        <SettingOutlined />
      </span>
    </div>
  )
}
