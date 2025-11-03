import { useMutation } from "@tanstack/vue-query";
import type { CampaignSchema } from "~/schemas";
import type { Campaign } from "@/types";

export function useUpdateCampaign() {
  const apiRoutes = useApiRoutes();
  const userStore = useUserStore();
  const builderStore = useBuilderStore();

  return useMutation({
    mutationFn: async (
      updatedCampaign: CampaignSchema
    ): Promise<{ data: null }> => {
      const url = String(
        apiRoutes.campaigns.update.replace(
          "[ID]",
          builderStore.campaign?.id ?? ""
        )
      );

      await $fetch<{ data: Campaign }>(url, {
        method: "PUT",
        body: updatedCampaign,
        headers: {
          Authorization: `Bearer ${userStore.token?.token ?? ""}`,
        },
      });

      return { data: null };
    },
    onSuccess() {
      navigateTo("/dashboard/campaigns");
    },
  });
}
