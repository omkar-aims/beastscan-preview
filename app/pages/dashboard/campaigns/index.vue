<script setup lang="ts">
import { Plus, Calendar, ArrowRight, Hash } from "lucide-vue-next";

interface Campaign {
  type: string;
  id: string;
  attributes: {
    title: string;
    slug: string;
    short_code: string;
    status: string;
    published_at: string | null;
    project_id: string;
  };
}

const campaigns: Campaign[] = [
  {
    type: "Digital Business Card",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d25",
    attributes: {
      title: "Demo Campaign",
      slug: "demo-campaign",
      short_code: "c-zPa95a",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  },
  {
    type: "Landing Page",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d26",
    attributes: {
      title: "Product Launch",
      slug: "product-launch",
      short_code: "c-aB3c4d",
      status: "published",
      published_at: "2024-10-15T10:30:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439988",
    },
  },
  {
    type: "QR Code Campaign",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d27",
    attributes: {
      title: "Restaurant Menu",
      slug: "restaurant-menu",
      short_code: "c-xY7z8w",
      status: "published",
      published_at: "2024-09-20T14:45:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439989",
    },
  },
  {
    type: "Email Campaign",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d28",
    attributes: {
      title: "Newsletter October",
      slug: "newsletter-october",
      short_code: "c-mN5p6q",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439990",
    },
  },
  {
    type: "Landing Page",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d29",
    attributes: {
      title: "Black Friday Sale",
      slug: "black-friday-sale",
      short_code: "c-rS9t0u",
      status: "scheduled",
      published_at: "2024-11-25T00:00:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439991",
    },
  },
  {
    type: "Digital Business Card",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d30",
    attributes: {
      title: "Personal Portfolio",
      slug: "personal-portfolio",
      short_code: "c-vW1x2y",
      status: "published",
      published_at: "2024-08-10T09:15:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439992",
    },
  },
  {
    type: "Social Share",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d31",
    attributes: {
      title: "Event Promotion",
      slug: "event-promotion",
      short_code: "c-zA3b4c",
      status: "archived",
      published_at: "2024-07-05T16:20:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439993",
    },
  },
];
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

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                :href="`https://beastscan.io/${campaign.attributes.short_code}`"
                target="_blank"
                class="text-primary font-medium hover:underline flex items-center gap-1"
              >
                beastscan.io/{{ campaign.attributes.short_code }}
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
