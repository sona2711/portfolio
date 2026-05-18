import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeCTA } from '../../components/features/HomeCTA'
import { HomeExpertise } from '../../components/features/HomeExpertise'
import { HomeFeaturedWork } from '../../components/features/HomeFeaturedWork'
import { HomeHero } from '../../components/features/HomeHero'
import { HomeVirtualSelf } from '../../components/features/HomeVirtualSelf'
import type { FeaturedWorkItem } from '../../components/_shared/FeaturedWorkCard/types'
import type { ExpertiseItem } from '../../components/features/HomeExpertise/types'
import { AI_VIDEO, EXPERTISE_ITEM_DEFS, FEATURED_WORK_ITEM_DEFS } from './consts'
import styles from './styles.module.css'

export const HomePage = () => {
  const { t } = useTranslation('home')

  const expertiseItems = useMemo<ExpertiseItem[]>(
    () =>
      EXPERTISE_ITEM_DEFS.map((item) => ({
        key: item.key,
        title: t(`expertise.items.${item.key}.title`),
        description: t(`expertise.items.${item.key}.description`),
        icon: item.icon,
      })),
    [t],
  )

  const featuredWorkItems = useMemo<FeaturedWorkItem[]>(
    () =>
      FEATURED_WORK_ITEM_DEFS.map((item) => ({
        title: item.title,
        description: t(`featuredWork.items.${item.itemKey}.description`),
        ctaLabel: t(`featuredWork.items.${item.itemKey}.ctaLabel`),
        previewVariant: item.previewVariant,
        image: item.image,
        meta: t(`featuredWork.items.${item.itemKey}.meta`),
        tags: item.tags,
        url: item.url,
      })),
    [t],
  )

  return (
    <div className={styles.wrapper}>
      <HomeHero />
      <HomeExpertise items={expertiseItems} />
      <HomeVirtualSelf video={AI_VIDEO} />
      <HomeFeaturedWork items={featuredWorkItems} />
      <HomeCTA />
    </div>
  )
}
