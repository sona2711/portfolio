import { Layout, Menu, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BRAND_NAME, NAV_ITEMS } from './consts'
import styles from './styles.module.css'
import { getSelectedNavKey } from './utils'

export const LayoutHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = getSelectedNavKey(location.pathname)

  return (
    <Layout.Header className={styles.header}>
      <Typography.Text strong className={styles.brandText}>
        <Link to="/" className={styles.brandLink}>
          {BRAND_NAME}
        </Link>
      </Typography.Text>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={NAV_ITEMS}
        onClick={({ key }) => navigate(String(key))}
        className={styles.menu}
        disabledOverflow
      />
    </Layout.Header>
  )
}
