import { Card, Typography } from 'antd'
import { ICON_BY_TYPE } from './consts'
import styles from './styles.module.css'
import type { ExpertiseCardProps } from './types'

export const ExpertiseCard = ({ title, description, icon }: ExpertiseCardProps) => {
  const Icon = ICON_BY_TYPE[icon]

  return (
    <Card className={styles.card}>
      <div className={styles.iconBadge}>
        <Icon />
      </div>
      <Typography.Title level={5} className={styles.title}>
        {title}
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>{description}</Typography.Paragraph>
    </Card>
  )
}
