<script setup lang="ts">
import type { Campaign } from "~/types";
import { Calendar, ArrowRight, ExternalLink, BarChart } from "lucide-vue-next";
defineProps<{
  campaigns: Campaign[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
    <Card v-for="campaign in campaigns" :key="campaign.id">
      <CardContent class="grid grid-cols-[1fr_3fr] gap-6">
        <div class="flex flex-col items-center justify-center rounded-2xl">
          <div class="p-2 rounded-xl bg-white">
            <NuxtImg
              src="https://qrapi.beastscan.com/?size=300&margin=10&renderer=pattern&format=svg&text=https%3A%2F%2Fqrapi.beastscan.com&dots_type=hex&dots_color=%231e40af&dots_negative_color=%23c7d2fe&corners_square_type=rounded&corners_square_color=%231e40af&corners_square_background_color=%23c7d2fe&corners_dot_type=dot&corners_dot_color=%231e40af&pattern_bg=transparent"
              width="100"
              height="100"
              alt="Campaign QR"
              class="rounded-lg"
            />
          </div>

          <div
            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 text-xs text-indigo-700 font-medium shadow-sm"
          >
            <div
              class="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow"
            >
              <BarChart class="w-3 h-3" />
            </div>
            <span class="text-foreground font-semibold">2.3k</span>
            <span class="text-muted-foreground font-normal">scans</span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold capitalize">
              {{ campaign.attributes.title }}
            </h3>

            <span
              :class="[
                'mt-3 px-2 py-0.5 rounded-full text-xs font-medium capitalize shadow-sm',
                campaign.attributes.status === 'published'
                  ? 'bg-green-100 text-green-600'
                  : campaign.attributes.status === 'archived'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-500',
              ]"
            >
              {{ campaign.attributes.status }}
            </span>
          </div>

          <a
            :href="`https://beastscan.io/${campaign.attributes.slug}`"
            target="_blank"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-1 mt-1"
          >
            beastscan.io/{{ campaign.attributes.slug.split("-")[0] }}
            <ExternalLink class="w-3.5 h-3.5 opacity-70" />
          </a>

          <div
            class="text-xs text-muted-foreground mt-1.5 flex items-center gap-1"
          >
            <Calendar class="w-4 h-4" />
            <span class="font-medium">2025-09-12</span>
          </div>

          <div class="flex flex-wrap gap-1 mt-3">
            <span
              v-for="tag in ['Marketing', 'Q4', 'Promo']"
              :key="tag"
              class="px-2 py-0.5 text-[11px] rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-100"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex justify-end items-center gap-2">
            <CardAction>
              <NuxtLink
                :href="`/dashboard/campaigns/${campaign.attributes.slug}`"
              >
                <Button class="rounded-full gap-1">
                  <span>View</span>
                  <ArrowRight class="w-4 h-4" />
                </Button>
              </NuxtLink>
            </CardAction>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
