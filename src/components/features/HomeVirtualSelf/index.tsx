import { PlayCircleOutlined } from '@ant-design/icons'
import { Card, Col, Row, Space, Typography } from 'antd'
import { SectionHeader } from '../../_shared/SectionHeader'
import styles from './styles.module.css'

export const HomeVirtualSelf = () => {
  return (
    <section className={styles.section}>
      <SectionHeader title="Meet My Virtual Self" />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <div className={styles.videoCard}>
            <PlayCircleOutlined className={styles.playIcon} />
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Card className={styles.chatCard}>
            <Space direction="vertical" size={12}>
              <Typography.Text strong>Ask my AI Self</Typography.Text>
              <div className={styles.chatBubble}>What are your strongest design skills?</div>
              <div className={styles.chatBubbleAccent}>
                Product systems, interaction flows, and visual storytelling.
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </section>
  )
}
