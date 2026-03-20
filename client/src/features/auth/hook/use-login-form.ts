import { useForm } from "react-hook-form";
import { type Login, loginSchema } from "@/features/auth/schemas/user"
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "./use-login";

export const useLogin = () => {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  })

  const { mutate, isPending } = useLoginMutation(form.setError);

  const onSubmit = (data: Login) => {
    mutate(data)
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending
  };
};
