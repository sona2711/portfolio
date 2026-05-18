import { NAV_ITEM_DEFS } from './consts'

export const getSelectedNavKey = (pathname: string) => {
  const match = NAV_ITEM_DEFS.find((item) => item.key === pathname)
  return String(match?.key ?? '/')
}
