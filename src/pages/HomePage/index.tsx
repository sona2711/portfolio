import { HomeCTA } from '../../components/features/HomeCTA'
import { HomeExpertise } from '../../components/features/HomeExpertise'
import { HomeFeaturedWork } from '../../components/features/HomeFeaturedWork'
import { HomeHero } from '../../components/features/HomeHero'
import { HomeVirtualSelf } from '../../components/features/HomeVirtualSelf'
import { EXPERTISE_ITEMS, FEATURED_WORK_ITEMS } from './consts'
import styles from './styles.module.css'

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <HomeHero />
      <HomeExpertise items={EXPERTISE_ITEMS} />
      <HomeVirtualSelf />
      <HomeFeaturedWork items={FEATURED_WORK_ITEMS} />
      <HomeCTA />
    </div>
  )
}
