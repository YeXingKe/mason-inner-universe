import { theme as antTheme } from 'antd'
import type { ThemeConfig } from 'antd'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LayoutMode } from '@/types/layout'

const STORAGE_KEY = 'mason-layout-config'

export interface LayoutConfig {
  layoutMode: LayoutMode
  isDark: boolean
  menuCollapse: boolean
  showConfigDrawer: boolean
  showMenuSearch: boolean
  primaryColor: string
}

interface LayoutConfigContextValue extends LayoutConfig {
  setLayoutMode: (value: LayoutMode) => void
  setIsDark: (value: boolean) => void
  toggleDark: () => void
  setMenuCollapse: (value: boolean) => void
  toggleMenuCollapse: () => void
  setShowConfigDrawer: (value: boolean) => void
  setShowMenuSearch: (value: boolean) => void
  setPrimaryColor: (value: string) => void
  resetConfig: () => void
}

const defaultConfig: LayoutConfig = {
  layoutMode: 'default',
  isDark: false,
  menuCollapse: false,
  showConfigDrawer: false,
  showMenuSearch: false,
  primaryColor: '#409EFF',
}

const LayoutConfigContext = createContext<LayoutConfigContextValue | null>(null)

function loadConfig(): LayoutConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultConfig
    const parsed = JSON.parse(raw) as Partial<LayoutConfig>
    return {
      ...defaultConfig,
      ...parsed,
      layoutMode: parsed.layoutMode === 'streamline' ? 'streamline' : 'default',
    }
  } catch {
    return defaultConfig
  }
}

function saveConfig(config: LayoutConfig) {
  const { showConfigDrawer, showMenuSearch, ...persisted } = config
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
}

export function LayoutConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<LayoutConfig>(() => {
    const loaded = loadConfig()
    return { ...loaded, showConfigDrawer: false, showMenuSearch: false }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', config.isDark ? 'dark' : 'light')
    document.documentElement.style.setProperty('--app-primary', config.primaryColor)
    saveConfig(config)
  }, [config])

  const patch = useCallback((partial: Partial<LayoutConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }))
  }, [])

  const value = useMemo<LayoutConfigContextValue>(
    () => ({
      ...config,
      setLayoutMode: (layoutMode) => patch({ layoutMode }),
      setIsDark: (isDark) => patch({ isDark }),
      toggleDark: () => patch({ isDark: !config.isDark }),
      setMenuCollapse: (menuCollapse) => patch({ menuCollapse }),
      toggleMenuCollapse: () => patch({ menuCollapse: !config.menuCollapse }),
      setShowConfigDrawer: (showConfigDrawer) => patch({ showConfigDrawer }),
      setShowMenuSearch: (showMenuSearch) => patch({ showMenuSearch }),
      setPrimaryColor: (primaryColor) => patch({ primaryColor }),
      resetConfig: () =>
        setConfig((prev) => ({
          ...defaultConfig,
          showConfigDrawer: prev.showConfigDrawer,
          showMenuSearch: prev.showMenuSearch,
        })),
    }),
    [config, patch],
  )

  const themeConfig = useMemo<ThemeConfig>(
    () => ({
      algorithm: config.isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      token: { colorPrimary: config.primaryColor },
    }),
    [config.isDark, config.primaryColor],
  )

  return (
    <LayoutConfigContext.Provider value={value}>
      <ConfigProvider locale={zhCN} theme={themeConfig}>
        {children}
      </ConfigProvider>
    </LayoutConfigContext.Provider>
  )
}

export function useLayoutConfig() {
  const ctx = useContext(LayoutConfigContext)
  if (!ctx) throw new Error('useLayoutConfig must be used within LayoutConfigProvider')
  return ctx
}
