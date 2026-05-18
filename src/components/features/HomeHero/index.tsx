import { useNavigate } from 'react-router-dom'
import { CodeOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Row, Space, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import sonaImage from '../../../assets/images/R.jpg'
import styles from './styles.module.css'

export const HomeHero = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  return (
    <section className={styles.section}>
      <Tag variant="filled" className={styles.tag}>
        {t('hero.label')}
      </Tag>
      <Row gutter={[64, 64]} align="middle">
        <Col xs={24} md={14}>
          <Space orientation="vertical" size={40} className={styles.textBlock}>
            <Typography.Title level={1} className={styles.title}>
              {t('hero.name')}
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              {t('hero.description')}
            </Typography.Paragraph>
            <Space size={24} wrap>
              <Button
                type="primary"
                className={styles.darkButton}
                onClick={() => navigate('/projects')}
              >
                {t('hero.viewWork')}
              </Button>
              <Button
                type="text"
                className={styles.lightButton}
                onClick={() => navigate('/contact')}
              >
                {t('hero.hireMe')}
              </Button>
            </Space>
          </Space>
        </Col>
        <Col xs={24} md={10} lg={8}>
          <div className={styles.portraitColumn}>
            <Flex justify="center" align="center" className={styles.portraitCard}>
              <img
                src={sonaImage}
                alt={t('hero.name')}
                className={styles.portraitImage}
              />
            </Flex>
            <Flex
              align="center"
              justify="center"
              className={styles.floatingAction}
            >
              <CodeOutlined />
            </Flex>
          </div>
        </Col>
      </Row>
    </section>
  )
}
