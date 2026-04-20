import { createElement, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })),
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: createElement(MainLayout),
    children: [
      { index: true, element: createElement(HomePage) },
      { path: 'about', element: createElement(AboutPage) },
      { path: 'projects', element: createElement(ProjectsPage) },
      { path: 'contact', element: createElement(ContactPage) },
    ],
  },
]
