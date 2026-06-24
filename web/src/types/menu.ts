import type { ReactNode } from 'react'

export interface MenuItem {
  key: string
  path: string
  title: string
  icon?: ReactNode
  children?: MenuItem[]
}

export interface TabItem {
  key: string
  path: string
  title: string
}

export interface AdminInfo {
  nickname: string
  avatar: string
  lastLoginTime: string
}
