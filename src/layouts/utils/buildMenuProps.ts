import { DownOutlined } from '@ant-design/icons'
import { createElement } from 'react'
import type { MenuProps } from 'antd'
import type { MenuItem } from '@/types/menu'

export interface BuildMenuItemsOptions {
  /** 单栏横向菜单：在子菜单标题右侧显示展开箭头 */
  horizontal?: boolean
}

export function buildMenuItems(
  menus: MenuItem[],
  options?: BuildMenuItemsOptions,
): MenuProps['items'] {
  return menus.map((menu) => {
    if (menu.children?.length) {
      return {
        key: menu.key,
        icon: menu.icon,
        label: options?.horizontal
          ? createElement(
              'span',
              { className: 'streamline-menu__label' },
              menu.title,
              createElement(DownOutlined, { className: 'streamline-menu__label-arrow' }),
            )
          : menu.title,
        children: buildMenuItems(menu.children, options),
      }
    }
    return {
      key: menu.path,
      icon: menu.icon,
      label: menu.title,
    }
  })
}

export function buildKeyPathMap(menus: MenuItem[], map = new Map<string, string>()): Map<string, string> {
  for (const menu of menus) {
    if (menu.children?.length) {
      buildKeyPathMap(menu.children, map)
    } else {
      map.set(menu.path, menu.path)
    }
  }
  return map
}
