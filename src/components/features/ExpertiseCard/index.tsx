import { Card, Typography } from 'antd'
import styles from './styles.module.css'
import type { ExpertiseCardProps } from './types'

export const ExpertiseCard = ({ title, description }: ExpertiseCardProps) => {
  return (
    <Card className={styles.card}>
      <Typography.Title level={5} className={styles.title}>
        {title}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>{description}</Typography.Paragraph>
    </Card>
  )
}
