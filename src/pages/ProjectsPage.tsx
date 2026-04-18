import { Card, Col, Row, Tag, Typography } from 'antd'

const { Title, Paragraph } = Typography

const placeholders = [
  {
    title: 'Project one',
    description: 'One-liner on the problem you solved and the outcome.',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Project two',
    description: 'Link to live demo and repo when you add them.',
    tags: ['UI', 'Vite'],
  },
]

export function ProjectsPage() {
  return (
    <div>
      <Title level={2}>Projects</Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Swap these cards for real case studies: context, your role, stack, and links.
      </Paragraph>
      <Row gutter={[16, 16]}>
        {placeholders.map((project) => (
          <Col xs={24} md={12} key={project.title}>
            <Card title={project.title} hoverable>
              <Paragraph>{project.description}</Paragraph>
              <div>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
