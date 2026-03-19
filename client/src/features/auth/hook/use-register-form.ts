import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type Register } from "@/features/auth/schemas/user"
import { useRegisterMutation } from "@/features/auth/hook/use-register"

export const useRegister = () => {
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  })

  const { mutateAsync, isPending } = useRegisterMutation();

  const onSubmit = async (data: Register) => {
    try {
      await mutateAsync(data);
      // Optional: reset form or redirect here
    } catch (err: any) {
      
      // This tells React Hook Form to set a global "root" error (for client display)
      form.setError("root", {
        message: "An unexpected error occurred. Please try again."
      });

    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending
  };
};