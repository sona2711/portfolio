import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export function AboutPage() {
  return (
    <Card>
      <Title level={2}>About</Title>
      <Paragraph>
        Summarize your background, tools you like, and what you&apos;re looking for next.
      </Paragraph>
      <Paragraph type="secondary">
        Tip: keep this scannable—short paragraphs, maybe a timeline or skills list later.
      </Paragraph>
    </Card>
  )
}
