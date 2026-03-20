import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/features/auth/services/register.service"
import { type Register } from "@/features/auth/schemas/user"
import { type UseFormSetError } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";


export const useRegisterMutation = (setError: UseFormSetError<Register>) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: Register) => registerUser(data),

    onSuccess: (responseData) => {
      console.log("User created!", responseData);
      navigate({ to: '/dashboard' })
    },

    //server side error
    onError: (error: any) => {
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        setError("email", { message: "This email is already in use." });
        return;
      }

      if (["USERNAME_TAKEN", "user_username_key"].includes(error.message)) {
        setError("username", { message: "This username is already taken." });
        return;
      }

      console.error("Critical Registration Error:", {
        message: error.message,
        originalError: error,
      });
      setError("root", {
        message: "A server error occurred. Please try again later."
      });
    }
  });
};