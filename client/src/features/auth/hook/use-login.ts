import { type UseFormSetError } from "react-hook-form";
import {type Login} from "@/features/auth/schemas/user"
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/login.service";
import { useNavigate } from "@tanstack/react-router";

export const useLoginMutation = (setError: UseFormSetError<Login>) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: Login) => loginUser(data),

    onSuccess: () => {
      navigate({to: "/dashboard"})
    },

    onError: (error: any) => {
      if (error.message.includes("credentials")) {
        setError("root", { message: "Invalid email or password." });
      } else {
        setError("root", { message: "Something went wrong. Please try again." });
        console.error("Login error:", error);
      }
    }
  })
}