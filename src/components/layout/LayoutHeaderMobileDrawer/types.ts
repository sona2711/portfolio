import type { NavItem } from '../LayoutHeader/types'

export type LayoutHeaderMobileDrawerProps = {
  open: boolean
  onClose: () => void
  selectedKey: string
  navItems: NavItem[]
  onNavigate: (path: string) => void
  drawerId: string
  drawerTitle: string
  isDarkMode: boolean
  onToggleTheme: () => void
}
