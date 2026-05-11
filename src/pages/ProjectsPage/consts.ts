import type { ProjectGalleryItem } from '@/components/features/ProjectsGallery/types'
import KassamanShopImage from '@/assets/images/Kassaman.png'
import LedOnImage from '@/assets/images/projectLedOn.png'
import Yassaman from '@/assets/images/Yassaman.png'

export const PROJECT_GALLERY_ITEMS: ProjectGalleryItem[] = [
  {
    title: 'Kassaman Shop',
    description:
      'A high-end minimal e-commerce platform built for a jewelry store, focused on clarity, trust, and a calm shopping flow.',
    image: KassamanShopImage,
    tags: ['React', 'TypeScript'],
    category: 'web',
    liveUrl: 'https://jewellery-shop-eta.vercel.app/',
  },
  {
    title: 'Led On',
    description:
      'A food scanner concept that reads product barcodes and surfaces nutritional context in a simple, scannable layout.',
    image: LedOnImage,
    tags: ['UI/UX', 'Figma'],
    category: 'uiux',
    liveUrl:
      'https://www.figma.com/design/uSsDXw91tKubTJs3p4diYh/LEDon?node-id=0-1&t=0RQChInxTfCDG7B3-1',
  },
  {
    title: 'Commerce landing study',
    description:
      'Exploration of editorial-style storytelling for a product launch page, balancing typography, imagery, and conversion cues.',
    image: KassamanShopImage,
    tags: ['Angular', 'Typescript'],
    category: 'web',
    liveUrl: 'https://jewellery-shop-eta.vercel.app/',
  },
  {
    title: 'Yassaman Online Shop',
    description:
      'Eco-frinedly online shop for a clothing store, focused on sustainability and a clean shopping flow.',
    image: Yassaman,
    tags: ['UI/UX', 'Figma'],
    category: 'uiux',
    liveUrl:
      'https://www.figma.com/design/Wdrb5FOTAYoyfXEeX3AeA7/Online-Shop-Wireframes%7C-Screens?node-id=0-1&t=crF61GMqn8RpQSfS-1',
  },
]
