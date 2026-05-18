import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/_shared/LanguageSwitcher'
import { MOBILE_NAV_DRAWER_WIDTH } from './consts'
import styles from './styles.module.css'
import type { LayoutHeaderMobileDrawerProps } from './types'

export const LayoutHeaderMobileDrawer = (props: LayoutHeaderMobileDrawerProps) => {
  const {
    open,
    onClose,
    selectedKey,
    navItems,
    onNavigate,
    drawerId,
    drawerTitle,
    isDarkMode,
    onToggleTheme,
  } = props
  const { t } = useTranslation('common')

  return (
    <Drawer
      id={drawerId}
      title={drawerTitle}
      placement="left"
      size={MOBILE_NAV_DRAWER_WIDTH}
      onClose={onClose}
      open={open}
      destroyOnClose
      styles={{ body: { paddingTop: 8 } }}
    >
      <div className={styles.drawerBody}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={navItems}
          onClick={({ key }) => {
            onNavigate(String(key))
            onClose()
          }}
          className={styles.drawerMenu}
        />
        <div className={styles.drawerFooter}>
          <LanguageSwitcher variant="drawer" className={styles.themeButton} />
          <Button
            type="text"
            className={styles.themeButton}
            aria-label={t('aria.toggleDarkMode')}
            aria-pressed={isDarkMode}
            icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
            onClick={onToggleTheme}
          >
            {isDarkMode ? t('theme.darkMode') : t('theme.lightMode')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
