export const mockRemark =
  'BuildAdmin 是基于 ThinkPHP8 + Vue3 的开源后台管理系统，支持 CRUD 一键生成、模块市场、前后台分离等特性。'

export const mockStats = [
  { key: 'userReg', title: '会员注册', value: 5456, trend: '+14%', icon: 'line-chart', color: '#8595F4' },
  { key: 'file', title: '附件上传数', value: 1234, trend: '+50%', icon: 'file-text', color: '#AD85F4' },
  { key: 'users', title: '会员总数', value: 9486, trend: '+28%', icon: 'users', color: '#74A8B5' },
  { key: 'addons', title: '已装插件数', value: 875, trend: '+88%', icon: 'appstore', color: '#F48595' },
] as const

export const mockNewUsers = [
  { name: '妙码生花', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miaoma' },
  { name: '码上生花', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mashang' },
  { name: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
  { name: '纯属虚构', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xugou' },
]

export function getGreet() {
  const hour = new Date().getHours()
  if (hour < 6) return '凌晨好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 17) return '下午好'
  if (hour < 19) return '傍晚好'
  return '晚上好'
}
