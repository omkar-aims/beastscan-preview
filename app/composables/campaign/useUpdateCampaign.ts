// import { useMutation } from "@tanstack/vue-query";
// import type { CampaignSchema } from "~/schemas";
// import type { Campaign } from "@/types";

// export function useUpdateCampaign(campaignId: string) {
//   const apiRoutes = useApiRoutes();
//   const userStore = useUserStore();

//   return useMutation({
//     mutationFn: async (
//       updatedCampaign: CampaignSchema
//     ): Promise<{ data: null }> => {
//       const url = String(
//         apiRoutes.campaigns.update.replace("[ID]", campaignId ?? "")
//       );

//       await $fetch<{ data: Campaign }>(url, {
//         method: "PUT",
//         body: updatedCampaign,
//         headers: { Authorization: `Bearer ${userStore.token.token}` },
//       });

//       return { data: null };
//     },
//     onSuccess() {
//       navigateTo("/dashboard/campaigns");
//     },
//     onError(err) {
//       console.log(err);
//     },
//   });
// }

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { CampaignSchema } from "~/schemas";
import type { Campaign } from "@/types";
import { toast } from "vue-sonner";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useUpdateCampaign(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: CampaignSchema): Promise<Campaign> => {
      await delay(500 + Math.random() * 500);

      const campaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") ?? "[]"
      );

      const index = campaigns.findIndex((c) => c.id === String(campaignId));

      if (index === -1) {
        throw new Error(
          `Campaign with id "${campaignId}" not found in localStorage`
        );
      }

      const updatedCampaign: Campaign = {
        ...campaigns[index],
        attributes: {
          ...campaigns[index].attributes,
          ...updatedData,
        },
      };

      console.log("UPDATED", updatedCampaign);

      campaigns[index] = updatedCampaign;

      localStorage.setItem("campaigns", JSON.stringify(campaigns));

      queryClient.setQueryData(["campaigns"], campaigns);
      queryClient.setQueryData(["campaign", campaignId], updatedCampaign);

      return updatedCampaign;
    },

    onSuccess() {
      navigateTo("/dashboard/campaigns");
      toast.success("Campaign is updated");
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
