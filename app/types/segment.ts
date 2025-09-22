import type { LeadDetails } from "@/types/leadDetails";

export interface Condition {
  field: string;
  condition: string;
  value: string;
}

// Main segment object
export interface Segment {
  segmentName: string;
  senderName: string;
  senderEmail: string;
  requireDoubleOptIn: boolean;
  matchType: "ALL" | "ANY";
  conditions: Condition[];
  matchedLeads: LeadDetails[];
}