import {z} from "zod"

export const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
})


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"), 
});


export const registerSchema = UserSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This attaches the error specifically to the confirm field
  });



export type User = z.infer<typeof UserSchema>
export type Login = z.infer<typeof loginSchema>
export type Register = z.infer<typeof registerSchema>