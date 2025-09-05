import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const registrationSchema = z.object({
  type: z.string().nonempty("Account type is required"),
  locale: z.string().nonempty("Locale is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Please make a Strong Password"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registrationSchema>;
