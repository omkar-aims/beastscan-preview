import { useMutation } from "@tanstack/vue-query";

export function useDeleteCampaign() {
  const apiRoutes = useApiRoutes();

  return useMutation({
    mutationFn: (id: number) =>
      $fetch(`${apiRoutes.campaigns}/${id}`, {
        method: "DELETE",
      }),
  });
}
