import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Grid, Layout, Menu, Typography } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useThemeMode } from '@/context/useThemeMode'
import { LayoutHeaderMobileDrawer } from '../LayoutHeaderMobileDrawer'
import {
  BRAND_NAME,
  HEADER_CTA_LABEL,
  LAYOUT_HEADER_MOBILE_DRAWER_DOM_ID,
  NAV_ITEMS,
} from './consts'
import styles from './styles.module.css'
import type { LayoutHeaderMobileNavSectionProps} from './types'
import { getSelectedNavKey } from './utils'



const LayoutHeaderMobileNavSection = (props: LayoutHeaderMobileNavSectionProps) => {
  const { selectedKey, navItems, isDarkMode, onToggleTheme, onNavigate } = props
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  return (
    <>
      <div className={styles.mobileNavSlot}>
        <Button
          type="text"
          className={styles.mobileMenuButton}
          aria-label="Open navigation menu"
          aria-expanded={mobileDrawerOpen}
          aria-controls={LAYOUT_HEADER_MOBILE_DRAWER_DOM_ID}
          onClick={() => setMobileDrawerOpen(true)}
        >
          <MenuOutlined />
        </Button>
      </div>
      <LayoutHeaderMobileDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        selectedKey={selectedKey}
        navItems={navItems}
        onNavigate={onNavigate}
        drawerId={LAYOUT_HEADER_MOBILE_DRAWER_DOM_ID}
        drawerTitle={BRAND_NAME}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
    </>
  )
}

export const LayoutHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = getSelectedNavKey(location.pathname)
  const { mode, toggleMode } = useThemeMode()
  const isDarkMode = mode === 'dark'
  const screens = Grid.useBreakpoint()
  const isMobileNav = screens.md === false

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.brandBlock}>
        <Typography.Text strong className={styles.brandText}>
          <Link to="/" className={styles.brandLink}>
            {BRAND_NAME}
          </Link>
        </Typography.Text>
      </div>
      {isMobileNav ? (
        <LayoutHeaderMobileNavSection
          key={location.pathname}
          selectedKey={selectedKey}
          navItems={NAV_ITEMS}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleMode}
          onNavigate={(path) => {
            navigate(path)
          }}
        />
      ) : (
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={NAV_ITEMS}
          onClick={({ key }) => navigate(String(key))}
          className={styles.menu}
        />
      )}
      <div className={styles.actions}>
        {!isMobileNav ? (
          <Button
            type="text"
            className={styles.iconButton}
            aria-label="Toggle dark mode"
            aria-pressed={isDarkMode}
            onClick={toggleMode}
          >
            {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
          </Button>
        ) : null}
        <Button className={styles.ctaButton} onClick ={() => navigate('/contact')}>{HEADER_CTA_LABEL}</Button>
      </div>
    </Layout.Header>
  )
}
