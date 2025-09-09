import * as z from "zod";

export const contactSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  phone: z.string({ required_error: "Phone is required" }),
  company: z.string({ required_error: "Company is required" }),
  note: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
