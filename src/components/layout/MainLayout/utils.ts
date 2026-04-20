import { NAV_ITEMS } from './consts'

export const getSelectedNavKey = (pathname: string) => {
  const match = NAV_ITEMS.find((item) => item?.key === pathname)
  return String(match?.key ?? '/')
}
