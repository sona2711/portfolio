import type { ExperienceItemDef } from './types'

export const EDUCATION_ITEM_KEYS = ['epic', 'agbu', 'tumo'] as const

export const EXPERIENCE_ITEM_DEFS: ExperienceItemDef[] = [
  { key: 'uateArmath', isCurrent: true },
  { key: 'autoDream', isCurrent: false },
  { key: 'ledOn', isCurrent: false },
]
