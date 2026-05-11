import type { ProjectGalleryFilter } from '@/components/features/ProjectsGallery/types'

export type ProjectsGalleryHeroProps = {
  activeFilter: ProjectGalleryFilter
  onFilterChange: (filter: ProjectGalleryFilter) => void
}
