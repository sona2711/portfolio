import type { ProjectGalleryItemDef } from './types'
import KassamanShopImage from '@/assets/images/Kassaman.png'
import LedOnImage from '@/assets/images/projectLedOn.png'
import Yassaman from '@/assets/images/Yassaman.png'
import Arahet from '@/assets/images/Arahet.png'

export const PROJECT_GALLERY_ITEM_DEFS: ProjectGalleryItemDef[] = [
  {
    itemKey: 'kassamanShop',
    title: 'Kassaman Shop',
    image: KassamanShopImage,
    tags: ['React', 'TypeScript'],
    category: 'web',
    liveUrl: 'https://jewellery-shop-eta.vercel.app/',
  },
  {
    itemKey: 'ledOn',
    title: 'Led On',
    image: LedOnImage,
    tags: ['UI/UX', 'Figma'],
    category: 'uiux',
    liveUrl:
      'https://www.figma.com/design/uSsDXw91tKubTJs3p4diYh/LEDon?node-id=0-1&t=0RQChInxTfCDG7B3-1',
  },
  {
    itemKey: 'arahet',
    title: 'ARAHET',
    image: Arahet,
    tags: ['Angular', 'Typescript'],
    category: 'web',
    liveUrl: 'https://booking-app-rho-three.vercel.app/home',
  },
  {
    itemKey: 'yassaman',
    title: 'Yassaman Online Shop',
    image: Yassaman,
    tags: ['UI/UX', 'Figma'],
    category: 'uiux',
    liveUrl:
      'https://www.figma.com/design/Wdrb5FOTAYoyfXEeX3AeA7/Online-Shop-Wireframes%7C-Screens?node-id=0-1&t=crF61GMqn8RpQSfS-1',
  },
]
