import supabase from "@/lib/supabase"
import { type Login } from "@/features/auth/schemas/user"


export const loginUser = async (data: Login) => {
  const { data: response, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message)
  }

  return response
}