import {
  AppstoreOutlined,
  CloudUploadOutlined,
  CodeOutlined,
  DashboardOutlined,
  DeleteOutlined,
  FileTextOutlined,
  LockOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import type { MenuItem } from '@/types/menu'

export { flattenMenus } from '@/utils/menu'

/** 模拟 BuildAdmin 后台菜单结构 */
export const mockMenus: MenuItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: '控制台',
    icon: <DashboardOutlined />,
  },
  {
    key: 'auth',
    path: '/auth',
    title: '权限管理',
    icon: <LockOutlined />,
    children: [
      { key: 'auth-admin', path: '/auth/admin', title: '管理员管理', icon: <UserOutlined /> },
      { key: 'auth-admin-log', path: '/auth/admin-log', title: '管理员日志', icon: <FileTextOutlined /> },
      { key: 'auth-rule', path: '/auth/rule', title: '菜单规则', icon: <AppstoreOutlined /> },
      { key: 'auth-group', path: '/auth/group', title: '角色组', icon: <TeamOutlined /> },
    ],
  },
  {
    key: 'user',
    path: '/user',
    title: '会员管理',
    icon: <UserOutlined />,
    children: [
      { key: 'user-user', path: '/user/user', title: '会员管理', icon: <UserOutlined /> },
      { key: 'user-group', path: '/user/group', title: '会员分组', icon: <TeamOutlined /> },
      { key: 'user-rule', path: '/user/rule', title: '会员规则', icon: <AppstoreOutlined /> },
      { key: 'user-score-log', path: '/user/score-log', title: '积分日志', icon: <WalletOutlined /> },
      { key: 'user-money-log', path: '/user/money-log', title: '余额日志', icon: <WalletOutlined /> },
    ],
  },
  {
    key: 'routine',
    path: '/routine',
    title: '常规管理',
    icon: <SettingOutlined />,
    children: [
      { key: 'routine-config', path: '/routine/config', title: '系统配置', icon: <SettingOutlined /> },
      { key: 'routine-attachment', path: '/routine/attachment', title: '附件管理', icon: <CloudUploadOutlined /> },
    ],
  },
  {
    key: 'security',
    path: '/security',
    title: '安全管理',
    icon: <SafetyOutlined />,
    children: [
      { key: 'security-data-recycle', path: '/security/data-recycle', title: '数据回收', icon: <DeleteOutlined /> },
      { key: 'security-data-recycle-log', path: '/security/data-recycle-log', title: '回收日志', icon: <FileTextOutlined /> },
      { key: 'security-sensitive-data', path: '/security/sensitive-data', title: '敏感数据', icon: <LockOutlined /> },
      { key: 'security-sensitive-data-log', path: '/security/sensitive-data-log', title: '敏感日志', icon: <FileTextOutlined /> },
    ],
  },
  {
    key: 'crud',
    path: '/crud',
    title: '数据开发',
    icon: <CodeOutlined />,
    children: [
      { key: 'crud-index', path: '/crud/index', title: 'CRUD', icon: <CodeOutlined /> },
      { key: 'crud-log', path: '/crud/log', title: '日志', icon: <FileTextOutlined /> },
    ],
  },
  {
    key: 'module',
    path: '/module/store',
    title: '模块市场',
    icon: <ShopOutlined />,
  },
]

export function findMenuByPath(path: string, menus: MenuItem[] = mockMenus): MenuItem | undefined {
  for (const menu of menus) {
    if (menu.path === path) return menu
    if (menu.children) {
      const found = findMenuByPath(path, menu.children)
      if (found) return found
    }
  }
  return undefined
}

export function getFirstLeafMenu(menus: MenuItem[] = mockMenus): MenuItem {
  for (const menu of menus) {
    if (menu.children?.length) {
      const child = getFirstLeafMenu(menu.children)
      if (child) return child
    } else {
      return menu
    }
  }
  return menus[0]
}
