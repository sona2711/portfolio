export type ExpertiseItem = {
  title: string
  description: string
  icon: 'education' | 'project' | 'code'
}

export type FeaturedWorkItem = {
  title: string
  description: string
  ctaLabel: string
  previewVariant: 'dark' | 'accent'
  imageDirection: 'left' | 'right'
  meta: string
  tags: string[]
}
