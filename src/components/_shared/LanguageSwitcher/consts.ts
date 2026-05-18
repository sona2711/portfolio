import type { AppLocale } from '@/i18n/types'

export const LANGUAGE_ORDER: readonly AppLocale[] = ['en', 'ru', 'hy']

export const cycleNextLocale = (current: AppLocale): AppLocale => {
  const index = LANGUAGE_ORDER.indexOf(current)
  const safeIndex = index < 0 ? 0 : index
  const nextIndex = (safeIndex + 1) % LANGUAGE_ORDER.length
  return LANGUAGE_ORDER[nextIndex]
}
