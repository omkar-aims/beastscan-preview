// import { useMutation } from "@tanstack/vue-query";
// import type { CampaignSchema } from "~/schemas";
// import type { Campaign } from "@/types";

// // export function useCreateCampaign() {
// //   const apiRoutes = useApiRoutes();

// //   const userStore = useUserStore();
// //   return useMutation({
// //     mutationFn: async (
// //       newCampaign: CampaignSchema
// //     ): Promise<{ data: Campaign }> => {
// //       const url = String(
// //         apiRoutes.campaigns.create.replace(
// //           "[ID]",
// //           userStore.activeProjectId ?? ""
// //         )
// //       );
// //       try {
// //         const created = await $fetch<{ data: Campaign }>(
// //           url as unknown as string,
// //           {
// //             method: "POST",
// //             body: newCampaign,
// //             headers: {
// //               Authorization: `Bearer ${userStore.token?.token ?? ""}`,
// //             },
// //           }
// //         );
// //         return { data: created.data };
// //       } catch (error: any) {
// //         if (error?.statusCode === 409) {
// //           throw new Error("A campaign with this slug already exists");
// //         }
// //         throw error;
// //       }
// //     },
// //   });
// // }

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { CampaignSchema } from "~/schemas";
import type { Campaign } from "@/types";
import { nanoid } from "nanoid";
import { toast } from "vue-sonner";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCampaign: CampaignSchema): Promise<Campaign> => {
      await delay(500 + Math.random() * 500);

      const campaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") ?? "[]"
      );

      const campaign: Campaign = {
        type: "campaigns",
        id: String(Date.now()),
        attributes: {
          title: newCampaign.title,
          slug: newCampaign.slug,
          short_code: nanoid(4),
          status: "draft",
          published_at: null,
          project_id: "Random Project",
          config: JSON.parse(newCampaign.config),
        },
      };

      const updatedCampaigns = [...campaigns, campaign];
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

      queryClient.setQueryData(["campaigns"], updatedCampaigns);

      return campaign;
    },
    onSuccess: (data) => {
      navigateTo(`/dashboard/campaigns/${data.id}`, {
        replace: true,
      });
      toast.success("Campaign is created");
    },

    onError(err) {
      console.log(err);
    },
  });
}
