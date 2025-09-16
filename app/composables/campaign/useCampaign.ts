import type { Campaign } from "~/types/campaign";

export function useCampaign(id: number) {
  const apiRoutes = useApiRoutes();
  return useFetch<Campaign>(`${apiRoutes.campaigns}/${id}`);
}
