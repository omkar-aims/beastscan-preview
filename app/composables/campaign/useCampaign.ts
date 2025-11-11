// import type { Campaign } from "~/types";
// import { useQuery } from "@tanstack/vue-query";
// import { useUserStore } from "@/stores/userStore";

// export const campaignKey = (id: string | number) => ["campaign", id];

// export function useCampaign(id: string | number) {
//   const apiRoutes = useApiRoutes();
//   const userStore = useUserStore();

//   return useQuery({
//     queryKey: campaignKey(id),
//     queryFn: async (): Promise<Campaign> => {
//       const url = apiRoutes.campaigns.singleCampaign.replace(
//         "[ID]",
//         id.toString()
//       );

//       const { data } = await $fetch<{ data: Campaign }>(url, {
//         headers: {
//           Authorization: `Bearer ${userStore.token.token}`,
//         },
//       });

//       return data;
//     },

//     enabled: !!id,
//   });
// }

// import type { Campaign } from "~/types";
// import { useQuery } from "@tanstack/vue-query";

// export const campaignKey = (id: string | number) => ["campaign", id];

// // helper to simulate delay
// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function getMockCampaign(id: string | number): Campaign {
//   return {
//     id: Number(id),
//     name: `Mock Campaign #${id}`,
//     description: "This is a locally mocked campaign for testing",
//   } as Campaign;
// }

// export function useCampaignMock(id: string | number) {
//   return useQuery({
//     queryKey: campaignKey(id),
//     queryFn: async (): Promise<Campaign> => {
//       await delay(1000 + Math.random() * 1000);
//       return getMockCampaign(id);
//     },
//     enabled: !!id,
//   });
// }

import type { Campaign } from "~/types";
import { useQuery } from "@tanstack/vue-query";

export const campaignKey = (id: string | number) => ["campaign", id];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCampaign(identifier: string | number) {
  return useQuery({
    queryKey: campaignKey(identifier),
    queryFn: async (): Promise<Campaign> => {
      await delay(1);

      const campaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") ?? "[]"
      );

      const campaign = campaigns.find(
        (c) =>
          c.id === String(identifier) ||
          c.attributes.slug === identifier ||
          c.attributes.short_code === identifier
      );

      if (!campaign) {
        throw new Error(
          `Campaign with id/slug/short_code "${identifier}" not found in localStorage`
        );
      }

      return campaign;
    },
    enabled: !!identifier,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
}
