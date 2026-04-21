import type { ExpertiseItem, FeaturedWorkItem } from './types'

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: 'UI/UX Assets',
    description: 'Polished interface elements and layouts for web and mobile products.',
  },
  {
    title: 'Dashboard',
    description: 'Information-focused dashboard design with hierarchy and clarity.',
  },
  {
    title: 'Visual Stack',
    description: 'Consistent visual systems, iconography, and scalable component language.',
  },
]

export const FEATURED_WORK_ITEMS: FeaturedWorkItem[] = [
  {
    title: 'Lumina Shop',
    description: 'A modern commerce dashboard crafted for product teams.',
    ctaLabel: 'View case study',
    previewVariant: 'dark',
  },
  {
    title: 'Amber Pay',
    description: 'A focused payment app concept with minimal and bold branding.',
    ctaLabel: 'Explore project',
    previewVariant: 'accent',
  },
]
