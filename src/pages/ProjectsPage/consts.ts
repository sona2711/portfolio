import type { ProjectGalleryItem } from '@/components/_shared/ProjectGalleryCard/types'
import KassamanShopImage from '@/assets/images/Kassaman.png'
import LedOnImage from '@/assets/images/projectLedOn.png'

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
    tags: ['Next.js', 'Tailwind'],
    category: 'web',
    liveUrl: 'https://jewellery-shop-eta.vercel.app/',
  },
  {
    title: 'Mobile health dashboard',
    description:
      'UI exploration for habit tracking and weekly summaries, emphasizing legible charts and a restrained visual language.',
    image: LedOnImage,
    tags: ['React Native', 'UI'],
    category: 'uiux',
    liveUrl:
      'https://www.figma.com/design/uSsDXw91tKubTJs3p4diYh/LEDon?node-id=0-1&t=0RQChInxTfCDG7B3-1',
  },
]
