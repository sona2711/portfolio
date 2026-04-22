import type { SidebarNavKey } from './types'

export const DASHBOARD_TITLE = 'AI Interface Dashboard'

export type SidebarNavItem = {
  key: SidebarNavKey
  label: string
}

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { key: 'portfolio', label: 'Portfolio Generator' },
  { key: 'cover-letter', label: 'Cover Letter Generator' },
  { key: 'sound', label: 'Sound Generator' },
  { key: 'video', label: 'Video Generator' },
  { key: 'content', label: 'Content Generator' },
]

export const DEFAULT_ACTIVE_KEY: SidebarNavKey = 'portfolio'

export const PROMPT_PLACEHOLDER = 'Enter your creative direction here...'

export const RESPONSE_PLACEHOLDER = 'Response will appear here.'

export const MOBILE_NAV_PLACEHOLDER = 'Choose a generator'
