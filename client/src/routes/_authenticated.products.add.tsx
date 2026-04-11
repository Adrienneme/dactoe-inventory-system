import { createFileRoute } from '@tanstack/react-router'
import addProductsPage from '@/features/products/addProductsPage'

export const Route = createFileRoute('/_authenticated/products/add')({
  component: addProductsPage,
})


