import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectGalleryFilter, ProjectGalleryItem } from '@/components/features/ProjectsGallery/types'
import { ProjectsCollaborationCTA } from '@/components/features/ProjectsCollaborationCTA'
import { ProjectsGallery } from '@/components/features/ProjectsGallery'
import { ProjectsGalleryHero } from '@/components/features/ProjectsGalleryHero'
import { PROJECT_GALLERY_ITEM_DEFS } from './consts'
import styles from './styles.module.css'

export const ProjectsPage = () => {
  const { t } = useTranslation('projects')
  const [activeFilter, setActiveFilter] = useState<ProjectGalleryFilter>('all')

  const galleryItems = useMemo<ProjectGalleryItem[]>(
    () =>
      PROJECT_GALLERY_ITEM_DEFS.map((item) => ({
        title: item.title,
        description: t(`gallery.items.${item.itemKey}.description`),
        image: item.image,
        tags: item.tags,
        category: item.category,
        liveUrl: item.liveUrl,
        repoUrl: item.repoUrl,
      })),
    [t],
  )

  const visibleItems = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryItems
    }
    return galleryItems.filter((item) => item.category === activeFilter)
  }, [activeFilter, galleryItems])

  return (
    <div className={styles.wrapper}>
      <ProjectsGalleryHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectsGallery items={visibleItems} />
      <ProjectsCollaborationCTA />
    </div>
  )
}
