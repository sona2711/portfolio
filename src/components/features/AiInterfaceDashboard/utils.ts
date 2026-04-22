import { useLayoutEffect, useState } from 'react'

const DESKTOP_SIDEBAR_MEDIA = '(min-width: 992px)'

const getInitialDesktopSidebar = () =>
  typeof window !== 'undefined' && window.matchMedia(DESKTOP_SIDEBAR_MEDIA).matches

/** Matches Ant Design `lg` breakpoint: sidebar + inline menu vs compact top picker. */
export const useDesktopSidebarLayout = () => {
  const [showSider, setShowSider] = useState(getInitialDesktopSidebar)

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_SIDEBAR_MEDIA)
    const update = () => setShowSider(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return showSider
}
