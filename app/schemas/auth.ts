import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const registrationSchema = z.object({
  email: z.string({required_error:"Email is required"}).email("Invalid email address"),
  password: z.string({required_error:"Password is required"}).min(8, "Please make a Strong Password"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registrationSchema>;
