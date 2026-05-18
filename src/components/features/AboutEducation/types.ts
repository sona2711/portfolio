export type EducationItemKey = 'epic' | 'agbu' | 'tumo'

export type ExperienceItemKey = 'uateArmath' | 'autoDream' | 'ledOn'

export type ExperienceItemDef = {
  key: ExperienceItemKey
  isCurrent: boolean
}

export type AboutEducationProps = Record<string, never>
