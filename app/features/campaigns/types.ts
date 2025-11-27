import type { LucideIcon } from "lucide-vue-next";

export type CampaignType = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  users: string;
  gradient: string;
};

export type Campaign = {
  type: "campaigns";
  id: string;
  attributes: {
    title: string;
    slug: string;
    short_code: string;
    status: "draft" | "published" | "archived";
    published_at: null | Date;
    project_id: string;
    config?: object;
  };
};
