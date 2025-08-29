export interface CampaignOption {
  title: string;
  desc: string;
  icon: string;
  badge?: string;
  type: "dynamic" | "static" | "both";
  category: "communication" | "content" | "business" | "utility";
}
