import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { FALLBACK_LOCALE, LOCALE_STORAGE_KEY, normalizeDetectedLocale } from './config'
import { I18N_NAMESPACES } from './types'

import enAbout from './locales/en/about.json'
import enAdmin from './locales/en/admin.json'
import enCommon from './locales/en/common.json'
import enContact from './locales/en/contact.json'
import enHome from './locales/en/home.json'
import enLayout from './locales/en/layout.json'
import enProjects from './locales/en/projects.json'
import ruAbout from './locales/ru/about.json'
import ruAdmin from './locales/ru/admin.json'
import ruCommon from './locales/ru/common.json'
import ruContact from './locales/ru/contact.json'
import ruHome from './locales/ru/home.json'
import ruLayout from './locales/ru/layout.json'
import ruProjects from './locales/ru/projects.json'
import hyAbout from './locales/hy/about.json'
import hyAdmin from './locales/hy/admin.json'
import hyCommon from './locales/hy/common.json'
import hyContact from './locales/hy/contact.json'
import hyHome from './locales/hy/home.json'
import hyLayout from './locales/hy/layout.json'
import hyProjects from './locales/hy/projects.json'

const resources = {
  en: {
    common: enCommon,
    layout: enLayout,
    home: enHome,
    about: enAbout,
    projects: enProjects,
    contact: enContact,
    admin: enAdmin,
  },
  ru: {
    common: ruCommon,
    layout: ruLayout,
    home: ruHome,
    about: ruAbout,
    projects: ruProjects,
    contact: ruContact,
    admin: ruAdmin,
  },
  hy: {
    common: hyCommon,
    layout: hyLayout,
    home: hyHome,
    about: hyAbout,
    projects: hyProjects,
    contact: hyContact,
    admin: hyAdmin,
  },
} as const

const syncDocumentLanguage = (language: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: FALLBACK_LOCALE,
    supportedLngs: ['en', 'ru', 'hy'],
    ns: [...I18N_NAMESPACES],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ['localStorage'],
      convertDetectedLanguage: normalizeDetectedLocale,
    },
  })

i18n.on('languageChanged', syncDocumentLanguage)
syncDocumentLanguage(i18n.language)

export { i18n }
