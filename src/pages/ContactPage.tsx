import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export function ContactPage() {
  return (
    <Card>
      <Title level={2}>Contact</Title>
      <Paragraph>
        Add a form (Ant Design <code>Form</code>), or list email, LinkedIn, and Calendly
        links here.
      </Paragraph>
      <Paragraph type="secondary">
        Footer links in the layout are placeholders—update them in{' '}
        <code>src/components/MainLayout.tsx</code>.
      </Paragraph>
    </Card>
  )
}
