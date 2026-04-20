import { Suspense } from 'react'
import { Spin } from 'antd'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { routes } from '@/router/routes'

const router = createBrowserRouter([
  ...routes,
  { path: '*', element: <Navigate to="/" replace /> },
])

export const AppRouter = () => {
  return (
    <Suspense fallback={<Spin size="large" fullscreen />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
