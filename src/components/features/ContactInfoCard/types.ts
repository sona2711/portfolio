export type ContactInfoLabelKey = 'email' | 'phone' | 'location'

export type ContactInfoItem = {
  labelKey: ContactInfoLabelKey
  value: string
}

export type ContactInfoCardProps = {
  cardTitle: string
  socialsLabel?: string
  items: ContactInfoItem[]
}
