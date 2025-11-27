import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),
  type: z
    .string({ required_error: "Type is required" })
    .min(1, "Type cannot be empty"),
  status: z
    .enum(["draft", "published", "archived"], {
      required_error: "Status is required",
    })
    .default("draft"),
  config: z.record(z.any()).optional().default({}),
});

export const createQRSchema = z.object({
  status: z.literal("active"),
  campaignId: z.string(),
  config: z.record(z.any()).optional().default({}),
});

export type CampaignSchema = z.infer<typeof createCampaignSchema>;
export type QRSchema = z.infer<typeof createQRSchema>;
