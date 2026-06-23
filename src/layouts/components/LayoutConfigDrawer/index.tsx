import { Divider, Drawer, Form, Select, Switch, theme } from 'antd'
import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import type { LayoutMode } from '@/types/layout'
import './index.css'

const primaryColors = [
  { label: '默认蓝', value: '#409EFF' },
  { label: '紫罗兰', value: '#6954f0' },
  { label: '翡翠绿', value: '#41b584' },
  { label: '日落橙', value: '#e6a23c' },
  { label: '中国红', value: '#f56c6c' },
]

const layoutModes: { mode: LayoutMode; label: string }[] = [
  { mode: 'default', label: '默认布局' },
  { mode: 'streamline', label: '单栏布局' },
]

export default function LayoutConfigDrawer() {
  const { token } = theme.useToken()
  const {
    layoutMode,
    isDark,
    menuCollapse,
    showConfigDrawer,
    primaryColor,
    setLayoutMode,
    setIsDark,
    setMenuCollapse,
    setShowConfigDrawer,
    setPrimaryColor,
    resetConfig,
  } = useLayoutConfig()

  return (
    <Drawer
      title="布局配置"
      placement="right"
      width={410}
      open={showConfigDrawer}
      onClose={() => setShowConfigDrawer(false)}
      className="layout-config-drawer"
    >
      <Form layout="vertical" className="layout-config-drawer__form">
        <Divider dashed titlePlacement="start">
          布局模式
        </Divider>
        <div className="layout-config-drawer__modes">
          {layoutModes.map(({ mode, label }) => (
            <button
              key={mode}
              type="button"
              className={`layout-config-drawer__mode ${layoutMode === mode ? 'layout-config-drawer__mode--active' : ''}`}
              onClick={() => setLayoutMode(mode)}
            >
              <div
                className={`layout-config-drawer__preview layout-config-drawer__preview--${mode}`}
              >
                {mode === 'default' && (
                  <div
                    className="layout-config-drawer__preview-aside"
                    style={{ background: token.colorPrimary }}
                  />
                )}
                <div className="layout-config-drawer__preview-main">
                  <div className="layout-config-drawer__preview-header" />
                  <div className="layout-config-drawer__preview-content">{label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Divider dashed titlePlacement="start">
          整体风格
        </Divider>
        <Form.Item label="深色模式">
          <Switch checked={isDark} onChange={setIsDark} />
        </Form.Item>
        <Form.Item label="主题色">
          <Select
            value={primaryColor}
            onChange={setPrimaryColor}
            options={primaryColors}
            optionRender={(option) => (
              <div className="layout-config-drawer__color-option">
                <span
                  className="layout-config-drawer__color-dot"
                  style={{ background: option.value as string }}
                />
                {option.label}
              </div>
            )}
          />
        </Form.Item>

        {layoutMode !== 'streamline' && (
          <>
            <Divider dashed titlePlacement="start">
              侧边栏
            </Divider>
            <Form.Item label="默认折叠菜单">
              <Switch checked={menuCollapse} onChange={setMenuCollapse} />
            </Form.Item>
          </>
        )}

        <div className="layout-config-drawer__footer">
          <a onClick={resetConfig}>恢复默认</a>
        </div>
      </Form>
    </Drawer>
  )
}
