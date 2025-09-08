export interface Device {
  name: string;
  tagId: string;
  status: "assigned" | "lost";
  linkedTo?: {
    title: string;
    campaignId?: string;
  };
  scans: number;
}
