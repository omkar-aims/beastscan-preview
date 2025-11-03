import type { Campaign } from "~/types";
import { useQuery } from "@tanstack/vue-query";
import { useUserStore } from "@/stores/userStore";

export const campaignsKey = ["campaigns"];

export function useCampaigns() {
  const apiRoutes = useApiRoutes();
  const userStore = useUserStore();

  return useQuery<Campaign[]>({
    queryKey: campaignsKey,
    queryFn: async () => {
      const response = await fetch(
        apiRoutes.campaigns.projectCampaigns.replace(
          "[ID]",
          userStore.activeProjectId ?? ""
        ),
        {
          headers: { Authorization: `Bearer ${userStore.token.token}` },
        }
      );

      const data = response.json();

      return data;
    },
  });
}
