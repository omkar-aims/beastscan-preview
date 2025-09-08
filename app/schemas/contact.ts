import * as z from "zod";

export const contactSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  //   email: z.string({ required_error: "Phone is required" }),
});
