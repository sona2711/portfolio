import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Grid, Layout, Menu, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/_shared/LanguageSwitcher'
import { useThemeMode } from '@/context/useThemeMode'
import { LayoutHeaderMobileDrawer } from '../LayoutHeaderMobileDrawer'
import { LAYOUT_HEADER_MOBILE_DRAWER_DOM_ID, NAV_ITEM_DEFS } from './consts'
import styles from './styles.module.css'
import type { LayoutHeaderMobileNavSectionProps } from './types'
import { getSelectedNavKey } from './utils'

const LayoutHeaderMobileNavSection = (props: LayoutHeaderMobileNavSectionProps) => {
  const { selectedKey, navItems, isDarkMode, onToggleTheme, onNavigate } = props
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const { t } = useTranslation('common')

  return (
    <>
      <div className={styles.mobileNavSlot}>
        <Button
          type="text"
          className={styles.mobileMenuButton}
          aria-label={t('aria.openNavigationMenu')}
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
        drawerTitle={t('brand.name')}
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
  const { t: tLayout } = useTranslation('layout')
  const { t: tCommon } = useTranslation('common')

  const navItems = useMemo(
    () =>
      NAV_ITEM_DEFS.map((item) => ({
        key: item.key,
        label: tLayout(item.labelKey),
      })),
    [tLayout],
  )

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.brandBlock}>
        <Typography.Text strong className={styles.brandText}>
          <Link to="/" className={styles.brandLink}>
            {tCommon('brand.name')}
          </Link>
        </Typography.Text>
      </div>
      {isMobileNav ? (
        <LayoutHeaderMobileNavSection
          key={location.pathname}
          selectedKey={selectedKey}
          navItems={navItems}
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
          items={navItems}
          onClick={({ key }) => navigate(String(key))}
          className={styles.menu}
        />
      )}
      <div className={styles.actions}>
        {!isMobileNav ? (
          <LanguageSwitcher variant="compact" className={styles.languageSwitcher} />
        ) : null}
        {!isMobileNav ? (
          <Button
            type="text"
            className={styles.iconButton}
            aria-label={tCommon('aria.toggleDarkMode')}
            aria-pressed={isDarkMode}
            onClick={toggleMode}
          >
            {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
          </Button>
        ) : null}
        <Button
          className={styles.ctaButton}
          onClick={() => navigate('/contact')}
        >
          {tLayout('header.cta')}
        </Button>
      </div>
    </Layout.Header>
  )
}
