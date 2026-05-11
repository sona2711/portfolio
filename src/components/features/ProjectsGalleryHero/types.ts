import type { ProjectGalleryFilter } from '@/components/_shared/ProjectGalleryCard/types'

export type ProjectsGalleryHeroProps = {
  activeFilter: ProjectGalleryFilter
  onFilterChange: (filter: ProjectGalleryFilter) => void
}
