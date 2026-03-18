import { createFileRoute } from '@tanstack/react-router'
import LogIn from "@/features/auth/loginPage"

export const Route = createFileRoute('/login')({
  component: LogIn,
})

