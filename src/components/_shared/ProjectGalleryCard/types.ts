export type ProjectGalleryCategory = 'web' | 'uiux'

export type ProjectGalleryFilter = 'all' | ProjectGalleryCategory

export type ProjectGalleryItem = {
  title: string
  description: string
  image: string
  tags: string[]
  category: ProjectGalleryCategory
  liveUrl: string
  repoUrl?: string
}

export type ProjectGalleryCardProps = {
  item: ProjectGalleryItem
  layoutIndex: number
}
