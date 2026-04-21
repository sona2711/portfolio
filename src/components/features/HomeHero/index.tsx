import { Button, Col, Row, Space, Tag, Typography } from 'antd'
import { HERO_DESCRIPTION, HERO_LABEL, HERO_NAME, HERO_ROLE } from './consts'
import styles from './styles.module.css'

export const HomeHero = () => {
  return (
    <section className={styles.section}>
      <Tag bordered={false} className={styles.tag}>
        {HERO_LABEL}
      </Tag>
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} md={14}>
          <Space direction="vertical" size={18} className={styles.textBlock}>
            <Typography.Title level={1} className={styles.title}>
              {HERO_NAME}
            </Typography.Title>
            <Typography.Text className={styles.role}>{HERO_ROLE}</Typography.Text>
            <Typography.Paragraph className={styles.description}>{HERO_DESCRIPTION}</Typography.Paragraph>
            <Space wrap>
              <Button type="primary" className={styles.darkButton}>
                View resume
              </Button>
              <Button className={styles.lightButton}>Portfolio</Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={10}>
          <div className={styles.portraitCard}>
            <div className={styles.portraitGlow} />
          </div>
        </Col>
      </Row>
    </section>
  )
}
