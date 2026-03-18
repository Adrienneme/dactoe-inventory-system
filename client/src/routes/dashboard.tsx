import { dashboardPage } from '@/features/dashboard/dashboardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: dashboardPage,
})


