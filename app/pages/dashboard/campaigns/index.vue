<script setup lang="ts">
import {
  Plus,
  Calendar,
  ArrowRight,
  Hash,
  ExternalLink,
} from "lucide-vue-next";
import { useCampaigns } from "~/composables/campaign/useCampaigns";
const { data: campaigns, isLoading, isError } = useCampaigns();
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-6">
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
          <div class="flex items-center gap-3 mb-2">
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
            >
              <Hash class="w-4 h-4 text-white" />
            </div>

            <h3 class="font-semibold">{{ campaign.attributes.title }}</h3>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <span class="font-medium">Short Link:</span>
              <a
                :href="`https://beastscan.io/${campaign.attributes.slug}`"
                target="_blank"
                class="text-primary font-medium hover:underline flex items-center gap-1"
              >
                beastscan.io/{{ campaign.attributes.slug.split("-")[0] }}
                <ExternalLink class="w-3.5 h-3.5 opacity-70" />
              </a>
            </p>

            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <span class="font-medium">Status:</span>
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

              <span
                v-if="
                  campaign.attributes.status === 'published' &&
                  campaign.attributes.published_at
                "
                class="text-xs text-muted-foreground ml-2 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 opacity-70" />
                {{
                  new Date(
                    campaign.attributes.published_at
                  ).toLocaleDateString()
                }}
              </span>
            </p>
          </div>
        </CardContent>

        <CardFooter class="justify-between mt-4">
          <div class="text-xs text-muted-foreground">
            Reached
            <span class="font-medium text-foreground">2.3k</span>
            people
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
