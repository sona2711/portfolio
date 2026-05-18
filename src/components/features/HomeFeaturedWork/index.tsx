import { Carousel, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FeaturedWorkCard } from '../../_shared/FeaturedWorkCard'
import { SectionHeader } from '../../_shared/SectionHeader'
import type { HomeFeaturedWorkProps } from './types'
import styles from './styles.module.css'

export const HomeFeaturedWork = ({ items }: HomeFeaturedWorkProps) => {
  const { t } = useTranslation('home')
  const isMobile = screen.width < 768

  if (items.length === 0) {
    return null
  }

  const showControls = items.length > 1

  return (
    <section className={styles.section} aria-label={t('featuredWork.ariaLabel')}>
      <div className={styles.headerRow}>
        <div>
          <SectionHeader title={t('featuredWork.sectionTitle')} />
          <Typography.Paragraph className={styles.subtitle}>
            {t('featuredWork.subtitle')}
          </Typography.Paragraph>
        </div>
        <Link to="/projects" className={styles.allProjectsLink}>
          {t('featuredWork.linkLabel')}
        </Link>
      </div>
      <div className={styles.carouselWrap}>
        <Carousel
          className={styles.carousel}
          dots={isMobile ? true : false}
          arrows={showControls}
          infinite={showControls}
          draggable={showControls}
          dotPlacement="bottom"
        >
          {items.map((item, index) => (
            <div key={item.title} className={styles.slide}>
              <FeaturedWorkCard
                item={item}
                imageDirection={index % 2 === 0 ? 'right' : 'left'}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
