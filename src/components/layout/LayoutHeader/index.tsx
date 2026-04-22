import { SunOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BRAND_NAME, HEADER_CTA_LABEL, NAV_ITEMS } from './consts'
import styles from './styles.module.css'
import { getSelectedNavKey } from './utils'

export const LayoutHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = getSelectedNavKey(location.pathname)

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.brandBlock}>
        <Typography.Text strong className={styles.brandText}>
          <Link to="/" className={styles.brandLink}>
            {BRAND_NAME}
          </Link>
        </Typography.Text>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={NAV_ITEMS}
        onClick={({ key }) => navigate(String(key))}
        className={styles.menu}
      />
      <div className={styles.actions}>
        <Button type="text" className={styles.iconButton} aria-label="Theme">
          <SunOutlined />
        </Button>
        <Button className={styles.ctaButton}>{HEADER_CTA_LABEL}</Button>
      </div>
    </Layout.Header>
  )
}
