import { Button, Typography } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECT_GALLERY_FILTER_OPTIONS } from './consts'
import styles from './styles.module.css'
import type { ProjectsGalleryHeroProps } from './types'

export const ProjectsGalleryHero = ({
  activeFilter,
  onFilterChange,
}: ProjectsGalleryHeroProps) => {
  const { t } = useTranslation('projects')

  const filterOptions = useMemo(
    () =>
      PROJECT_GALLERY_FILTER_OPTIONS.map((option) => ({
        key: option.key,
        label: t(`gallery.hero.filters.${option.key}`),
      })),
    [t],
  )

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <span className={styles.eyebrow}>{t('gallery.hero.eyebrow')}</span>
        <div
          className={styles.filterGroup}
          role="group"
          aria-label={t('gallery.hero.filterGroupLabel')}
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key
            return (
              <Button
                key={option.key}
                type={isActive ? 'primary' : 'default'}
                className={isActive ? styles.filterButtonActive : styles.filterButton}
                aria-pressed={isActive}
                onClick={() => {
                  onFilterChange(option.key)
                }}
              >
                {option.label}
              </Button>
            )
          })}
        </div>
      </div>
      <Typography.Title level={1} className={styles.title}>
        {t('gallery.hero.titleLead')}{' '}
        <span className={styles.titleAccent}>{t('gallery.hero.titleAccent')}</span>
      </Typography.Title>
      <Typography.Paragraph className={styles.subtitle}>
        {t('gallery.hero.subtitle')}
      </Typography.Paragraph>
    </header>
  )
}
