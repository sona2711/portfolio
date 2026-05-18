export type ExpertiseItemKey = 'uateArmath' | 'autoDream' | 'techStack'

export type ExpertiseItemDef = {
  key: ExpertiseItemKey
  icon: 'education' | 'project' | 'code'
}

export type FeaturedWorkItemKey = 'kassamanShop' | 'ledOn'

export type FeaturedWorkItemDef = {
  itemKey: FeaturedWorkItemKey
  title: string
  previewVariant: 'dark' | 'accent'
  image: string
  tags: string[]
  url: string
}
