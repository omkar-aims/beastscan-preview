import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { leadDetailsKey } from "./useLeadtool";

export function useDeleteLead() {
  const apiRoutes = useApiRoutes();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      $fetch(`${apiRoutes.leaddata}/${id}`, {
        method: "DELETE",
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: leadDetailsKey,
      });
    },
  });
}
