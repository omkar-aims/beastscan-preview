import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { campaignsKey } from "./useCampaigns";

export function useDeleteCampaign() {
  const apiRoutes = useApiRoutes();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      $fetch(`${apiRoutes.campaigns}/${id}`, {
        method: "DELETE",
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: campaignsKey,
      });
    },
  });
}
