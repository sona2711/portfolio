import type { ProjectGalleryFilter } from '@/components/_shared/ProjectGalleryCard/types'

export const PROJECTS_GALLERY_HERO_EYEBROW = 'Selected works'

export const PROJECTS_GALLERY_HERO_TITLE_LEAD = 'My Portfolio'

export const PROJECTS_GALLERY_HERO_TITLE_ACCENT = 'Gallery.'

export const PROJECTS_GALLERY_HERO_SUBTITLE =
  'A curated collection of digital interfaces and web experiences where performance meets intentional aesthetics.'

export const PROJECTS_GALLERY_FILTER_GROUP_LABEL = 'Filter projects by category'

export type ProjectGalleryFilterOption = {
  key: ProjectGalleryFilter
  label: string
}

export const PROJECT_GALLERY_FILTER_OPTIONS: ProjectGalleryFilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'uiux', label: 'UI/UX' },
]
