import { createFileRoute } from '@tanstack/react-router'
import signUp from "@/features/auth/signupPage"

export const Route = createFileRoute('/signup')({
  component: signUp,
})


