import z from "zod";

export const OfferTypes = [
  "freebie",
  "percent_discount",
  "fixed_amount_discount",
  "buy_one_get_one",
  "first_time",
  "free_trial",
] as const;

export const Categories = [
  "food_and_drink",
  "wellness",
  "retail",
  "service",
  "entertainment",
] as const;

export const RedemptionCooldowns = [
  "no_restriction",
  "1_day",
  "1_week",
  "1_month",
  "3_months",
] as const;

export const offerSchema = z
  .object({
    // 1. Basic

    title: z.string({ required_error: "Title is required" }),
    type: z.enum(OfferTypes, { required_error: "Type is required" }),
    category: z.enum(Categories, { required_error: "Category is required" }),

    startDate: z
      .date({ required_error: "Start date is required" })
      .min(new Date(), { message: "Start date cannot be in the past" }),

    endDate: z.date({ required_error: "End date is required" }),

    redemptionCooldown: z
      .enum(RedemptionCooldowns)
      .optional()
      .default("no_restriction"),

    maxRedemption: z.number().int().positive().optional().or(z.literal(null)),

    description: z.string().optional(),

    // 2. Business Location & Opening hours (Mon - Sun)

    // 3. Cover Image & Gallery Image

    // 4. social media links
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
