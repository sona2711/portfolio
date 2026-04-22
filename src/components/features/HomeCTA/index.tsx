import { Button, Typography } from 'antd'
import { CTA_BUTTON_LABEL, CTA_HEADING } from './consts'
import styles from './styles.module.css'

export const HomeCTA = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.box}>
        <Typography.Title level={2} className={styles.title}>
          {CTA_HEADING}
        </Typography.Title>
        <Button htmlType="button" className={styles.button}>
          {CTA_BUTTON_LABEL}
        </Button>
      </div>
    </section>
  )
}
