import { createFileRoute, redirect } from '@tanstack/react-router'
import supabase from '@/lib/supabase'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!session || error) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    } 
    console.log("Authenticated session:", session)
    return { session }
  }
})
