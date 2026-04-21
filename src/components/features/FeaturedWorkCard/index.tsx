import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import styles from './styles.module.css'
import type { FeaturedWorkCardProps } from './types'

export const FeaturedWorkCard = ({ item }: FeaturedWorkCardProps) => {
  const isAccent = item.previewVariant === 'accent'

  return (
    <Card className={styles.card}>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={isAccent ? 9 : 15} className={isAccent ? styles.textFirst : ''}>
          <Space direction="vertical" size={14}>
            <Typography.Title level={4} className={styles.title}>
              {item.title}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>{item.description}</Typography.Paragraph>
            <Button type="link" className={styles.linkButton}>
              {item.ctaLabel} <ArrowRightOutlined />
            </Button>
          </Space>
        </Col>
        <Col xs={24} md={isAccent ? 15 : 9}>
          <div className={isAccent ? styles.previewAccent : styles.previewDark} />
        </Col>
      </Row>
    </Card>
  )
}
