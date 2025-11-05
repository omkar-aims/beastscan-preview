import type { Campaign } from "~/types";
import { useQuery } from "@tanstack/vue-query";
import { useUserStore } from "@/stores/userStore";

export const campaignsKey = ["campaigns"];

export function useCampaigns() {
  const apiRoutes = useApiRoutes();
  const userStore = useUserStore();

  return useQuery({
    queryKey: campaignsKey,
    queryFn: async () => {
      const { data }: { data: Campaign[] } = await $fetch(
        apiRoutes.campaigns.projectCampaigns.replace(
          "[ID]",
          userStore.activeProjectId ?? ""
        ),
        {
          headers: { Authorization: `Bearer ${userStore.token.token}` },
        }
      );

      console.log(data);
      return data;
    },

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
}
