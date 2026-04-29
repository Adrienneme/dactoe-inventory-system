import { createFileRoute } from '@tanstack/react-router'
import ViewProductPage from '@/features/products/viewProductPage'

export const Route = createFileRoute('/_authenticated/products/$productId')({
  component: ViewProductPage,
})