import { useMutation } from "@tanstack/vue-query";
import type { CampaignSchema } from "~/schemas";
import type { Campaign } from "@/types";

export function useCreateCampaign() {
  const apiRoutes = useApiRoutes();

  const userStore = useUserStore();
  return useMutation({
    mutationFn: async (
      newCampaign: CampaignSchema
    ): Promise<{ data: Campaign }> => {
      const url = String(
        apiRoutes.campaigns.create.replace(
          "[ID]",
          userStore.activeProjectId ?? ""
        )
      );
      try {
        const created = await $fetch<{ data: Campaign }>(
          url as unknown as string,
          {
            method: "POST",
            body: newCampaign,
            headers: {
              Authorization: `Bearer ${userStore.token?.token ?? ""}`,
            },
          }
        );
        return { data: created.data };
      } catch (error: any) {
        if (error?.statusCode === 409) {
          throw new Error("A campaign with this slug already exists");
        }
        throw error;
      }
    },
  });
}
