import { GlobalOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { normalizeDetectedLocale } from '@/i18n/config'
import type { AppLocale } from '@/i18n/types'
import { cycleNextLocale } from './consts'
import type { LanguageSwitcherProps } from './types'
import styles from './styles.module.css'

const resolveLocale = (language: string): AppLocale =>
  normalizeDetectedLocale(language)

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { className, variant } = props
  const { i18n, t } = useTranslation('common')

  const value = resolveLocale(i18n.language)

  const handleClick = () => {
    void i18n.changeLanguage(cycleNextLocale(value))
  }

  const codeLabel = t(`language.${value}`)
  const ariaLabel = `${t('language.label')}: ${codeLabel}`

  const buttonClassName =
    variant === 'compact'
      ? [styles.compactButton, className].filter(Boolean).join(' ')
      : [styles.drawerRowButton, className].filter(Boolean).join(' ')

  return (
    <Button
      type="text"
      className={buttonClassName}
      icon={<GlobalOutlined />}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {codeLabel}
    </Button>
  )
}
