import { Space, Typography } from 'antd'
import { FeaturedWorkCard } from '../../_shared/FeaturedWorkCard'
import { SectionHeader } from '../../_shared/SectionHeader'
import { FEATURED_WORK_LINK_LABEL, FEATURED_WORK_SUBTITLE } from './consts'
import styles from './styles.module.css'
import type { HomeFeaturedWorkProps } from './types'

export const HomeFeaturedWork = ({ items }: HomeFeaturedWorkProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <div>
          <SectionHeader title="Featured Work" />
          <Typography.Paragraph className={styles.subtitle}>
            {FEATURED_WORK_SUBTITLE}
          </Typography.Paragraph>
        </div>
        <Typography.Link className={styles.allProjectsLink}>{FEATURED_WORK_LINK_LABEL}</Typography.Link>
      </div>
      <Space orientation="vertical" size={20} className={styles.projectStack}>
        <FeaturedWorkCard key={items[0].title} item={items[0]} imageDirection="right" />
        <FeaturedWorkCard key={items[1].title} item={items[1]} imageDirection="left" />
      </Space>
    </section>
  )
}
