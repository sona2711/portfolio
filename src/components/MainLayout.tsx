import { GithubOutlined, MailOutlined } from '@ant-design/icons'
import { Layout, Menu, Space, Typography } from 'antd'
import { useMemo } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Content, Footer } = Layout

const navItems = [
  { key: '/', label: 'Home' },
  { key: '/about', label: 'About' },
  { key: '/projects', label: 'Projects' },
  { key: '/contact', label: 'Contact' },
]

export function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = useMemo(() => {
    const match = navItems.find((item) => item.key === location.pathname)
    return match?.key ?? '/'
  }, [location.pathname])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 24,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography.Text strong style={{ color: 'inherit', fontSize: 16 }}>
          <Link to="/" style={{ color: 'inherit' }}>
            Your Name
          </Link>
        </Typography.Text>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={navItems}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end', border: 'none' }}
          disabledOverflow
        />
      </Header>
      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Space size="large">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <GithubOutlined /> GitHub
          </a>
          <a href="mailto:you@example.com">
            <MailOutlined /> Email
          </a>
        </Space>
      </Footer>
    </Layout>
  )
}
