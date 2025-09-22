import type { LeadDetails } from "~/types/leadDetails";

export const leadDetailsKey = ["leadDetailsKey"];

export function useLeadTool() {
  const apiRoutes = useApiRoutes();
  return useFetch<LeadDetails[]>(apiRoutes.leaddata);
}