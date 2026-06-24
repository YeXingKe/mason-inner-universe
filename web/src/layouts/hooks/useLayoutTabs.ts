import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { findMenuByPath, getFirstLeafMenu } from '@/mocks/menus'
import type { TabItem } from '@/types/menu'

export function useLayoutTabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const [tabs, setTabs] = useState<TabItem[]>(() => {
    const first = getFirstLeafMenu()
    return [{ key: first.path, path: first.path, title: first.title }]
  })

  const activePath = location.pathname

  const activeKey = useMemo(() => {
    const tab = tabs.find((t) => t.path === activePath)
    return tab?.key ?? activePath
  }, [tabs, activePath])

  const openTab = useCallback(
    (path: string) => {
      const menu = findMenuByPath(path)
      if (!menu) return

      setTabs((prev) => {
        if (prev.some((t) => t.path === path)) return prev
        return [...prev, { key: path, path, title: menu.title }]
      })
      navigate(path)
    },
    [navigate],
  )

  useEffect(() => {
    const menu = findMenuByPath(activePath)
    if (!menu) return
    setTabs((prev) => {
      if (prev.some((t) => t.path === activePath)) return prev
      return [...prev, { key: activePath, path: activePath, title: menu.title }]
    })
  }, [activePath])

  const handleTabClick = useCallback(
    (key: string) => {
      const tab = tabs.find((t) => t.key === key)
      if (tab) navigate(tab.path)
    },
    [navigate, tabs],
  )

  const handleTabClose = useCallback(
    (key: string) => {
      setTabs((prev) => {
        const index = prev.findIndex((t) => t.key === key)
        if (index === -1) return prev
        const next = prev.filter((t) => t.key !== key)
        if (key === activeKey && next.length) {
          const target = next[Math.min(index, next.length - 1)]
          navigate(target.path)
        } else if (!next.length) {
          const first = getFirstLeafMenu()
          navigate(first.path)
          return [{ key: first.path, path: first.path, title: first.title }]
        }
        return next
      })
    },
    [activeKey, navigate],
  )

  return {
    tabs,
    activePath,
    activeKey,
    openTab,
    handleTabClick,
    handleTabClose,
  }
}
