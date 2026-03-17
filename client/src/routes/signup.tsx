import { createFileRoute } from '@tanstack/react-router'
import signupPage from "@/features/auth/signupPage"

export const Route = createFileRoute('/signup')({
  component: signupPage,
})


