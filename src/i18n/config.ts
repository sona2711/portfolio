import type { AppLocale } from './types'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types'

export const FALLBACK_LOCALE = DEFAULT_LOCALE

export const isAppLocale = (value: string): value is AppLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value)

export const normalizeDetectedLocale = (language: string): AppLocale => {
  const base = language.toLowerCase().split('-')[0]

  if (base === 'ru') {
    return 'ru'
  }

  if (base === 'hy') {
    return 'hy'
  }

  return FALLBACK_LOCALE
}

export const LOCALE_STORAGE_KEY = 'i18nextLng'
