import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

export const HomeCTA = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  return (
    <section className={styles.wrapper}>
      <div className={styles.box}>
        <Typography.Title level={2} className={styles.title}>
          {t('cta.heading')}
        </Typography.Title>
        <Button
          htmlType="button"
          className={styles.button}
          onClick={() => navigate('/contact')}
        >
          {t('cta.button')}
        </Button>
      </div>
    </section>
  )
}
