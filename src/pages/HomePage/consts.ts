import type { ExpertiseItemDef, FeaturedWorkItemDef } from './types'
import LedOnImage from '../../assets/images/projectLedOn.png'
import KassamanShopImage from '../../assets/images/Kassaman.png'

export const AI_VIDEO = '/sona.mp4'

export const EXPERTISE_ITEM_DEFS: ExpertiseItemDef[] = [
  { key: 'uateArmath', icon: 'education' },
  { key: 'autoDream', icon: 'project' },
  { key: 'techStack', icon: 'code' },
]

export const FEATURED_WORK_ITEM_DEFS: FeaturedWorkItemDef[] = [
  {
    itemKey: 'kassamanShop',
    title: 'Kassaman Shop',
    previewVariant: 'dark',
    image: KassamanShopImage,
    tags: ['React', 'TypeScript'],
    url: 'https://jewellery-shop-eta.vercel.app/',
  },
  {
    itemKey: 'ledOn',
    title: 'Led On',
    previewVariant: 'accent',
    image: LedOnImage,
    tags: ['UI/UX Design'],
    url: 'https://www.figma.com/design/uSsDXw91tKubTJs3p4diYh/LEDon?node-id=0-1&t=0RQChInxTfCDG7B3-1',
  },
]
