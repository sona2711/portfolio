import { Typography } from 'antd'
import styles from './styles.module.css'
import type { SectionHeaderProps } from './types'

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Typography.Title level={3} className={styles.title}>
      {title}
    </Typography.Title>
  )
}
