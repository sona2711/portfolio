export type ExpertiseItem = {
  key: string
  title: string
  description: string
  icon: 'education' | 'project' | 'code'
}

export type HomeExpertiseProps = {
  items: ExpertiseItem[]
}
