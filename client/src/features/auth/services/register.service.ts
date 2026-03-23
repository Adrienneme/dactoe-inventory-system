import supabase from "@/lib/supabase"
import { type Register } from "@/features/auth/schemas/user";


export const registerUser = async (data: Register) => {
  //check existing username
  const { data: existingName } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', data.username)
    .maybeSingle(); 

  if (existingName) {
    throw new Error("USERNAME_TAKEN");
  }


  const { data: response, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'https://dactoe-inventory-system.vercel.app/login'
    }
  });

  if (authError) throw authError;

  if (response.user?.identities?.length === 0) {
    throw new Error("EMAIL_TAKEN");
  }

  
  //if auth sign up success then insert username
  if (response.user) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: response.user.id,
        username: data.username,
      });

    if (insertError) throw insertError;
  }

  return response;
};