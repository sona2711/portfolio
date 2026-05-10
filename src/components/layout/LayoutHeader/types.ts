import type { MenuProps } from 'antd'

export type NavItem = Required<MenuProps>['items'][number]

export type LayoutHeaderMobileNavSectionProps = {
    selectedKey: string
    navItems: NavItem[]
    isDarkMode: boolean
    onToggleTheme: () => void
    onNavigate: (path: string) => void
  }