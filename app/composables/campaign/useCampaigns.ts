import type { Campaign } from "~/types/campaign";

export const campaignsKey = ["campaigns"];

export function useCampaigns() {
  const apiRoutes = useApiRoutes();
  return useFetch<Campaign[]>(apiRoutes.campaigns);
}
