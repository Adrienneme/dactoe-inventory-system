import supabase from "@/lib/supabase"
import { type Login } from "@/features/auth/schemas/user"


export const loginUser = async (data: Login) => {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
    options: {
    emailRedirectTo: 'https://dactoe-inventory-system.vercel.app/login',
  },
  });

  if (authError) throw new Error(authError.message)

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    console.warn("Profile not found, defaulting to email prefix");
    return { 
      id: authData.user.id, 
      username: authData.user.email?.split('@')[0] || "User" 
    };
  }

  return { id: authData.user.id, email: authData.user.email, username: profile.username };
}