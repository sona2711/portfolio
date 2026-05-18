import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProjectGalleryCard } from '@/components/features/ProjectGalleryCard'
import styles from './styles.module.css'
import type { ProjectsGalleryProps } from './types'

export const ProjectsGallery = ({ items }: ProjectsGalleryProps) => {
  const { t } = useTranslation('projects')
  const sectionLabel = t('gallery.sectionLabel')

  if (items.length === 0) {
    return (
      <section className={styles.section} aria-label={sectionLabel}>
        <Typography.Paragraph className={styles.empty}>
          {t('gallery.emptyMessage')}
        </Typography.Paragraph>
      </section>
    )
  }

  return (
    <section className={styles.section} aria-label={sectionLabel}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <ProjectGalleryCard key={item.title} item={item} layoutIndex={index} />
        ))}
      </div>
    </section>
  )
}
