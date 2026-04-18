import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography

export function HomePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={1} style={{ marginBottom: 8 }}>
          Hi, I&apos;m a frontend developer.
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 18, maxWidth: 640 }}>
          This is a starter portfolio built with React, TypeScript, Vite, pnpm, and Ant
          Design. Replace this copy with your intro, then flesh out the other routes.
        </Paragraph>
        <Space wrap>
          <Link to="/projects">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              View projects
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="large">Get in touch</Button>
          </Link>
        </Space>
      </div>
      <Card title="Stack" size="small">
        React · TypeScript · Vite · pnpm · Ant Design · React Router
      </Card>
    </Space>
  )
}
