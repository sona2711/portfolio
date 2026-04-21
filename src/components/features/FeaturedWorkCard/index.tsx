import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import styles from './styles.module.css'
import type { FeaturedWorkCardProps } from './types'

export const FeaturedWorkCard = ({ item }: FeaturedWorkCardProps) => {
  return (
    <Card className={styles.card}>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={15}>
          <div className={item.previewVariant === 'dark' ? styles.previewDark : styles.previewAccent} />
        </Col>
        <Col xs={24} md={9}>
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
      </Row>
    </Card>
  )
}
