import { Typography } from 'antd'
import { ProjectGalleryCard } from '@/components/_shared/ProjectGalleryCard'
import { PROJECTS_GALLERY_EMPTY_MESSAGE, PROJECTS_GALLERY_SECTION_LABEL } from './consts'
import styles from './styles.module.css'
import type { ProjectsGalleryProps } from './types'

export const ProjectsGallery = ({ items }: ProjectsGalleryProps) => {
  if (items.length === 0) {
    return (
      <section className={styles.section} aria-label={PROJECTS_GALLERY_SECTION_LABEL}>
        <Typography.Paragraph className={styles.empty}>{PROJECTS_GALLERY_EMPTY_MESSAGE}</Typography.Paragraph>
      </section>
    )
  }

  return (
    <section className={styles.section} aria-label={PROJECTS_GALLERY_SECTION_LABEL}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <ProjectGalleryCard key={item.title} item={item} layoutIndex={index} />
        ))}
      </div>
    </section>
  )
}
