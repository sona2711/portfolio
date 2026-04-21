import { LoginOutlined } from '@ant-design/icons'
import { Button, Col, Row, Space, Tag, Typography } from 'antd'
import sonaImage from '../../../assets/Sona.png'
import { HERO_DESCRIPTION, HERO_LABEL, HERO_NAME } from './consts'
import styles from './styles.module.css'

export const HomeHero = () => {
  return (
    <section className={styles.section}>
      <Tag bordered={false} className={styles.tag}>
        {HERO_LABEL}
      </Tag>
      <Row gutter={[64, 40]} align="middle">
        <Col xs={24} md={14}>
          <Space direction="vertical" size={22} className={styles.textBlock}>
            <Typography.Title level={1} className={styles.title}>
              {HERO_NAME}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>{HERO_DESCRIPTION}</Typography.Paragraph>
            <Space size={24} wrap>
              <Button type="primary" className={styles.darkButton}>
                View Work
              </Button>
              <Button className={styles.lightButton}>Hire Me</Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={10} lg={8}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitCard}>
            <img src={sonaImage} alt={HERO_NAME} className={styles.portraitImage} />
            </div>
            <button type="button" className={styles.floatingAction} aria-label="Open profile">
              <LoginOutlined />
            </button>
          </div>
        </Col>
      </Row>
    </section>
  )
}
