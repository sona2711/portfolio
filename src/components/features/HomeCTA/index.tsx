import { Button, Typography } from 'antd'
import styles from './styles.module.css'

export const HomeCTA = () => {
  return (
    <section className={styles.section}>
      <Typography.Title level={2} className={styles.title}>
        Let&apos;s build something remarkable together.
      </Typography.Title>
      <Button type="primary" className={styles.button}>
        Start a conversation
      </Button>
    </section>
  )
}
