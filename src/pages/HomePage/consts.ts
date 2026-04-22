import type { ExpertiseItem } from './types'
import type { FeaturedWorkItem } from '../../components/_shared/FeaturedWorkCard/types'
import LedOnImage from '../../assets/images/LedOn.png'
import KassamanShopImage from '../../assets/images/Kassaman.png'

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: 'UATE-Armath EL',
    description:
      'Junior Frontend Developer & Coach. Delivering programming, robotics, and engineering lessons while developing interactive learning tools.',
    icon: 'education',
  },
  {
    title: 'AutoDream',
    description:
      'Frontend Intern. Gained hands-on experience in web development workflows and contributed to automotive digital solutions.',
    icon: 'project',
  },
  {
    title: 'Tech Stack',
    description:
      'Proficient in HTML5, CSS3, JavaScript (ES6+), React.js, and TypeScript, with a focus on building responsive and accessible interfaces.',
    icon: 'code',
  },
]

export const FEATURED_WORK_ITEMS: FeaturedWorkItem[] = [
  {
    title: 'Kassaman Shop',
    description:
      'A high-end minimal e-commerce platform built for a jewelry store.',
    ctaLabel: 'View case study',
    previewVariant: 'dark',
    image: KassamanShopImage,
    meta: 'E-COMMERCE • 2026',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Led On',
    description: 'A food scanner app that allows you to scan the barcode of a food item and get the nutritional information.',
    ctaLabel: 'Explore project',
    previewVariant: 'accent',
    image: LedOnImage,
    meta: 'FOOD SCANNER • 2024',
    tags: ['UI/UX Design'],
  },
]
