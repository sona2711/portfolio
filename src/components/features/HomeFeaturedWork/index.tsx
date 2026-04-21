import { Space } from 'antd'
import { SectionHeader } from '../../_shared/SectionHeader'
import { FeaturedWorkCard } from '../FeaturedWorkCard'
import styles from './styles.module.css'
import type { HomeFeaturedWorkProps } from './types'

export const HomeFeaturedWork = ({ items }: HomeFeaturedWorkProps) => {
  return (
    <section className={styles.section}>
      <SectionHeader title="Featured Work" />
      <Space direction="vertical" size={20} className={styles.projectStack}>
        {items.map((item) => (
          <FeaturedWorkCard key={item.title} item={item} />
        ))}
      </Space>
    </section>
  )
}
