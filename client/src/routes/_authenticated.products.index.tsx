import { createFileRoute } from '@tanstack/react-router'
import { productsPage } from '@/features/products/productsPage'

export const Route = createFileRoute('/_authenticated/products/')({
  component: productsPage,
})