import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/features/auth/services/register.service"
import { type Register } from "@/features/auth/schemas/user"


export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: Register) => registerUser(data),
    onSuccess: (responseData) => {
      console.log("User created!", responseData);
      // You could redirect the user here
    },

    //for developer error handling
    onError: (error) => {
      console.error("Registration failed", error);
    }
  });
};