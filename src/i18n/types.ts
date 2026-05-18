export const SUPPORTED_LOCALES = ['en', 'ru', 'hy'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'en'

export const I18N_NAMESPACES = [
  'common',
  'layout',
  'home',
  'about',
  'projects',
  'contact',
  'admin',
] as const

export type AppNamespace = (typeof I18N_NAMESPACES)[number]
