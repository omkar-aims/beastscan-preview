// import { useMutation } from "@tanstack/vue-query";

// export function useDeleteCampaign() {
//   const apiRoutes = useApiRoutes();

//   return useMutation({
//     mutationFn: (id: number) =>
//       $fetch(`${apiRoutes.campaigns}/${id}`, {
//         method: "DELETE",
//       }),
//   });
// }

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import type { Campaign } from "@/types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (identifier: string | number): Promise<void> => {
      await delay(500 + Math.random() * 500);

      const campaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") ?? "[]"
      );

      const updatedCampaigns = campaigns.filter(
        (c) =>
          c.id !== String(identifier) &&
          c.attributes.slug !== identifier &&
          c.attributes.short_code !== identifier
      );

      if (updatedCampaigns.length === campaigns.length) {
        throw new Error(
          `Campaign with id/slug/short_code "${identifier}" not found in localStorage`
        );
      }

      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

      queryClient.setQueryData(["campaigns"], updatedCampaigns);
      queryClient.removeQueries({
        queryKey: ["campaign", identifier],
        exact: true,
      });
    },

    onSuccess: () => {
      navigateTo("/dashboard/campaigns");
      toast.success("Campaign is deleted");
    },

    onError: (err) => {
      console.error("Failed to delete campaign:", err);
    },
  });
}
