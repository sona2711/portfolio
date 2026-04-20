import { GithubOutlined, MailOutlined } from '@ant-design/icons'
import { Flex, Layout, Menu, Space, Typography } from 'antd'
import { useMemo } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BRAND_NAME, NAV_ITEMS } from './consts'
import styles from './styles.module.css'
import { getSelectedNavKey } from './utils'

const { Header, Content, Footer } = Layout

export const MainLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKey = useMemo(() => getSelectedNavKey(location.pathname), [location.pathname])

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
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
      </Header>
      <Content className={styles.content}>
        <Flex vertical className={styles.contentContainer}>
          <Outlet />
        </Flex>
      </Content>
      <Footer className={styles.footer}>
        <Space size="large">
          <Typography.Link href="https://github.com" target="_blank" rel="noreferrer">
            <GithubOutlined /> GitHub
          </Typography.Link>
          <Typography.Link href="mailto:you@example.com">
            <MailOutlined /> Email
          </Typography.Link>
        </Space>
      </Footer>
    </Layout>
  )
}
