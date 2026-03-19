import supabase from "@/lib/supabase"
import { type Register } from "@/features/auth/schemas/user";

export const registerUser = async (data: Register) => {
  const { data: response, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw new Error(error.message);

  if (response.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: response.user.id, 
        username: data.username,
      });

    if (profileError) throw new Error(profileError.message);
  }
  return response;
};
