import type { ProjectGalleryCategory } from '@/components/features/ProjectsGallery/types'

export type ProjectGalleryItemKey = 'kassamanShop' | 'ledOn' | 'arahet' | 'yassaman'

export type ProjectGalleryItemDef = {
  itemKey: ProjectGalleryItemKey
  title: string
  image: string
  tags: string[]
  category: ProjectGalleryCategory
  liveUrl: string
  repoUrl?: string
}
