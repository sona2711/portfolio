import { Button, Typography } from 'antd'
import {
  PROJECT_GALLERY_FILTER_OPTIONS,
  PROJECTS_GALLERY_FILTER_GROUP_LABEL,
  PROJECTS_GALLERY_HERO_EYEBROW,
  PROJECTS_GALLERY_HERO_SUBTITLE,
  PROJECTS_GALLERY_HERO_TITLE_ACCENT,
  PROJECTS_GALLERY_HERO_TITLE_LEAD,
} from './consts'
import styles from './styles.module.css'
import type { ProjectsGalleryHeroProps } from './types'

export const ProjectsGalleryHero = ({
  activeFilter,
  onFilterChange,
}: ProjectsGalleryHeroProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <span className={styles.eyebrow}>{PROJECTS_GALLERY_HERO_EYEBROW}</span>
        <div
          className={styles.filterGroup}
          role="group"
          aria-label={PROJECTS_GALLERY_FILTER_GROUP_LABEL}
        >
          {PROJECT_GALLERY_FILTER_OPTIONS.map((option) => {
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
        {PROJECTS_GALLERY_HERO_TITLE_LEAD}{' '}
        <span className={styles.titleAccent}>{PROJECTS_GALLERY_HERO_TITLE_ACCENT}</span>
      </Typography.Title>
      <Typography.Paragraph className={styles.subtitle}>
        {PROJECTS_GALLERY_HERO_SUBTITLE}
      </Typography.Paragraph>
    </header>
  )
}
