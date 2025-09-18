import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import type { defaultQROption } from "~/config/qrCodeTemplates";

export interface CampaignTemplate {
  id: number;
  name: string;
  imageUrl: string;
}

export type QROption = Partial<{ data: string }> &
  Omit<typeof defaultQROption, "data">;

export type CampaignType =
  | "Website"
  | "Email"
  | "SMS"
  | "Call"
  | "Linkpage"
  | "PDF"
  | "Video"
  | "Image"
  | "Image Gallery"
  | "Audio"
  | "Business Page"
  | "Facebook Page"
  | "Mobile App"
  | "Restaurant Menu"
  | "Map Location"
  | "Digital Business Card"
  | "Wi-Fi"
  | "Plain Text"
  | "Form";

export interface CampaignOption {
  type: "" | CampaignType;
  description: string;
  icon: string;
  badge?: string;
  mode: "dynamic" | "static";
  formSchema: ZodObjectOrWrapped;
}

export interface Campaign {
  id?: number;
  type: "" | CampaignType;
  name: string;
  config: Record<string, string>;
  qrOption: QROption;
  url?: string;
  mode?: "dynamic" | "static";
  createdAt?: Date;
}
