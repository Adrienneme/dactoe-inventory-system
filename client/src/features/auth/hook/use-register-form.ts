import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type Register } from "@/features/auth/schemas/user"
import { useRegisterMutation } from "@/features/auth/hook/use-register"

export const useRegister = () => {
  
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  })

  const { mutate, isPending } = useRegisterMutation(form.setError);

  const onSubmit =  (data: Register) => {
    mutate(data)
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending
  };
};