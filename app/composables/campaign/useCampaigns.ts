import type { Campaign } from "~/types/campaign";
import { useQuery } from "@tanstack/vue-query";

export const campaignsKey = ["campaigns"];

export function useCampaigns() {
  const apiRoutes = useApiRoutes();

  return useQuery<Campaign[]>({
    queryKey: campaignsKey,
    queryFn: async () => {
      const response = await fetch(apiRoutes.campaigns);
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      return response.json() as Promise<Campaign[]>;
    },
  });
}
