import { useMemo, useState } from 'react'
import type { ProjectGalleryFilter } from '@/components/features/ProjectsGallery/types'
import { ProjectsCollaborationCTA } from '@/components/features/ProjectsCollaborationCTA'
import { ProjectsGallery } from '@/components/features/ProjectsGallery'
import { ProjectsGalleryHero } from '@/components/features/ProjectsGalleryHero'
import { PROJECT_GALLERY_ITEMS } from './consts'
import styles from './styles.module.css'

export const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectGalleryFilter>('all')

  const visibleItems = useMemo(() => {
    if (activeFilter === 'all') {
      return PROJECT_GALLERY_ITEMS
    }
    return PROJECT_GALLERY_ITEMS.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <div className={styles.wrapper}>
      <ProjectsGalleryHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ProjectsGallery items={visibleItems} />
      <ProjectsCollaborationCTA />
    </div>
  )
}
