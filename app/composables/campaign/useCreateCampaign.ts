import { useMutation } from "@tanstack/vue-query";
import type { Campaign } from "~/types/campaign";

export function useCreateCampaign() {
  const apiRoutes = useApiRoutes();

  return useMutation({
    mutationFn: (newCampaign: Campaign) =>
      $fetch(apiRoutes.campaigns, {
        method: "POST",
        body: { ...newCampaign, mode: "dynamic", createdAt: new Date() },
      }),
    onSuccess() {
      navigateTo("/dashboard/qr-codes");
    },
  });
}
