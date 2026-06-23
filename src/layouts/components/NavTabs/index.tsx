import { CloseOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import type { TabItem } from '@/types/menu'
import './index.css'

interface NavTabsProps {
  tabs: TabItem[]
  activeKey: string
  onTabClick: (key: string) => void
  onTabClose: (key: string) => void
}

export default function NavTabs({ tabs, activeKey, onTabClick, onTabClose }: NavTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [activeBox, setActiveBox] = useState({ width: 0, left: 0 })

  useEffect(() => {
    const activeEl = tabRefs.current.get(activeKey)
    if (activeEl) {
      setActiveBox({ width: activeEl.clientWidth, left: activeEl.offsetLeft })
    }
  }, [activeKey, tabs])

  return (
    <div className="nav-tabs" ref={tabsRef}>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          ref={(el) => {
            if (el) tabRefs.current.set(tab.key, el)
          }}
          className={`nav-tabs__item ${tab.key === activeKey ? 'nav-tabs__item--active' : ''}`}
          onClick={() => onTabClick(tab.key)}
        >
          <span>{tab.title}</span>
          {tabs.length > 1 && (
            <CloseOutlined
              className="nav-tabs__close"
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(tab.key)
              }}
            />
          )}
        </div>
      ))}
      <div
        className="nav-tabs__indicator"
        style={{ width: activeBox.width, transform: `translateX(${activeBox.left}px)` }}
      />
    </div>
  )
}
