import type { MenuItem } from '@/types/menu'

export function flattenMenus(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = []
  for (const menu of menus) {
    if (menu.children?.length) {
      result.push(...flattenMenus(menu.children))
    } else {
      result.push(menu)
    }
  }
  return result
}

export function getOpenKeysByPath(path: string, menus: MenuItem[]): string[] {
  for (const menu of menus) {
    if (menu.children?.some((child) => child.path === path || path.startsWith(child.path))) {
      return [menu.key]
    }
    if (menu.children) {
      const nested = getOpenKeysByPath(path, menu.children)
      if (nested.length) return [menu.key, ...nested]
    }
  }
  return []
}
