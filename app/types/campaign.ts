import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import type { defaultQROption } from "~/config/qrCodeTemplates";

export interface CampaignOption {
  title: string;
  desc: string;
  icon: string;
  badge?: string;
  type: "dynamic" | "static";
  formSchema: ZodObjectOrWrapped;
}

export interface CampaignTemplate {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}

export type QROption = Partial<{ data: string }> &
  Omit<typeof defaultQROption, "data">;

export interface Campaign {
  id?: number;
  type: string;
  name: string;
  config: Record<string, string>;
  qrOption: QROption;
  url?: string;
  mode?: "dynamic" | "static";
  createdAt?: Date;
}
