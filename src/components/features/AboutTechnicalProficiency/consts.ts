import type { LanguageLevelKey, SkillProgressDef } from './types'
import technicalProficiencyImage from '../../../assets/images/code.png'

export const TECHNICAL_PROFICIENCY_IMAGE = technicalProficiencyImage

export const SKILL_PROGRESS_ITEMS: SkillProgressDef[] = [
  { skillKey: 'javascript', percent: 90 },
  { skillKey: 'angular', percent: 95 },
  { skillKey: 'react', percent: 85 },
]

export const PRIMARY_TAGS = ['HTML5', 'CSS3', 'TYPESCRIPT'] as const
export const SECONDARY_TAGS = ['BOOTSTRAP', 'SCSS', 'GIT', 'LINUX', 'FIGMA', 'REST API'] as const

export const LANGUAGE_LEVEL_KEYS: LanguageLevelKey[] = ['armenian', 'english', 'russian']
