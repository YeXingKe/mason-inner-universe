import { Modal, Select } from 'antd'
import { useMemo } from 'react'
import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import { flattenMenus, mockMenus } from '@/mocks/menus'
import './index.css'

interface MenuSearchModalProps {
  onSelect: (path: string) => void
}

export default function MenuSearchModal({ onSelect }: MenuSearchModalProps) {
  const { showMenuSearch, setShowMenuSearch } = useLayoutConfig()

  const options = useMemo(
    () =>
      flattenMenus(mockMenus).map((menu) => ({
        value: menu.path,
        label: menu.title,
      })),
    [],
  )

  return (
    <Modal
      open={showMenuSearch}
      onCancel={() => setShowMenuSearch(false)}
      footer={null}
      closable={false}
      width={600}
      className="menu-search-modal"
      destroyOnHidden
    >
      <Select
        showSearch
        size="large"
        className="menu-search-modal__select"
        placeholder="搜索其实很简单"
        options={options}
        filterOption={(input, option) =>
          (option?.label as string).toLowerCase().includes(input.toLowerCase())
        }
        onChange={(path) => {
          onSelect(path)
          setShowMenuSearch(false)
        }}
        autoFocus
        defaultOpen
        listHeight={320}
      />
    </Modal>
  )
}
