<script setup lang="ts">
import {
  Plus,
  Calendar,
  ArrowRight,
  ExternalLink,
  BarChart,
} from "lucide-vue-next";
import { useCampaigns } from "~/composables/campaign/useCampaigns";
const { data: campaigns, isLoading, isError } = useCampaigns();
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Campaigns</h1>
      <NuxtLink to="/dashboard/campaigns/new">
        <Button>
          <Plus class="w-5 h-5" />
          Launch New Campaign
        </Button>
      </NuxtLink>
    </div>

    <div v-if="isLoading">
      <p>Loading</p>
    </div>

    <div v-else-if="isError" class="text-center py-10 text-red-500">
      Failed to load campaigns
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="campaign in campaigns" :key="campaign.id">
        <CardContent>
          <div class="mb-2 flex flex-col items-center justify-center p-4">
            <div class="p-2 rounded-lg bg-white">
              <NuxtImg
                src="https://my.beastscan.com/qr/campaign?uuid=SYOL3E&format=png&ts=1759229288"
                width="120"
                height="120"
                alt="Campaign QR"
                class="rounded-md"
              />
            </div>
            <p class="mt-2 text-xs text-muted-foreground">
              Scan to view campaign
            </p>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold capitalize">
                {{ campaign.attributes.title }}
              </h3>

              <span
                :class="[
                  'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
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
              class="text-sm text-primary font-medium hover:underline flex items-center gap-1"
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

            <div class="mt-4">
              <TagPicker :disable-remove="true" />
            </div>
          </div>
        </CardContent>

        <CardFooter class="justify-between items-center mt-4">
          <div
            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border text-xs text-muted-foreground"
          >
            <div
              class="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white"
            >
              <BarChart class="w-3 h-3" />
            </div>
            <span class="font-medium text-foreground">2.3k</span>
            <span>scans</span>
          </div>

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
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
