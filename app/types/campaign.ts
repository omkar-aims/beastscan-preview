import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";

export interface CampaignOption {
  title: string;
  desc: string;
  icon: string;
  badge?: string;
  type: "dynamic" | "static" | "both";
  category: "communication" | "content" | "business" | "utility";
  formSchema: ZodObjectOrWrapped;
}

export interface CampaignTemplate {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}
