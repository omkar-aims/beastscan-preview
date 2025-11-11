import type { Campaign } from "~/types";
import { useQuery } from "@tanstack/vue-query";
import { useUserStore } from "@/stores/userStore";
import { campaignData } from "~/data/campaignData";

export const campaignsKey = ["campaigns"];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCampaigns() {
  // const apiRoutes = useApiRoutes();
  // const userStore = useUserStore();

  return useQuery({
    queryKey: campaignsKey,
    queryFn: async () => {
      // const { data }: { data: Campaign[] } = await $fetch(
      //   apiRoutes.campaigns.projectCampaigns.replace(
      //     "[ID]",
      //     userStore.activeProjectId ?? ""
      //   ),
      //   {
      //     headers: { Authorization: `Bearer ${userStore.token.token}` },
      //   }
      // );

      // console.log(data);
      await delay(1);
      const campaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") ?? "[]"
      );
      return campaigns;
    },

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
}
