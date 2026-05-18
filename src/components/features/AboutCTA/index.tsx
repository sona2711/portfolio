import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import type { AboutCTAProps } from './types'

export const AboutCTA = (props: AboutCTAProps) => {
  void props
  const navigate = useNavigate()
  const { t } = useTranslation('about')

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Typography.Title level={2} className={styles.title}>
          {t('cta.title')}
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>
          {t('cta.description')}
        </Typography.Paragraph>
        <Button
          type="primary"
          className={styles.ctaButton}
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={() => navigate('/contact')}
        >
          {t('cta.button')}
        </Button>
      </div>
    </section>
  )
}
