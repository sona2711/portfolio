import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'
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
          <Button
            type="text"
            className={styles.themeButton}
            aria-label="Toggle dark mode"
            aria-pressed={isDarkMode}
            icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
            onClick={onToggleTheme}
          >
            {isDarkMode ? 'Dark mode' : 'Light mode'}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
