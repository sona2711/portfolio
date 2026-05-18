import type { ProjectGalleryFilter } from '@/components/features/ProjectsGallery/types'

export type ProjectGalleryFilterOptionDef = {
  key: ProjectGalleryFilter
}

export const PROJECT_GALLERY_FILTER_OPTIONS: ProjectGalleryFilterOptionDef[] = [
  { key: 'all' },
  { key: 'web' },
  { key: 'uiux' },
]
