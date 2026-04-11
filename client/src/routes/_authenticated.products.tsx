import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products')({
  component: () => <Outlet />, // This allows .index and .add to render here
})