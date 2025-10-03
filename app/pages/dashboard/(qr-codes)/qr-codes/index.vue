<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import QRCodeCanvas from "~/components/QRCodeCanvas.vue";
import Badge from "~/components/ui/badge/Badge.vue";
import { ChevronRight, Calendar, Eye } from "lucide-vue-next";

definePageMeta({
  layout: "qr-codes-overview",
});

const { data: campaigns } = await useCampaigns();
</script>

<template>
  <div class="space-y-4">
    <template v-if="campaigns?.length === 0">
      <div class="text-center space-y-4">
        <NuxtImg
          src="/empty.svg"
          width="320"
          height="100%"
          class="m-0 mx-auto"
        />
        <div>
          <AppHeading :level="2">You don't have any QR Codes yet</AppHeading>
          <p class="text-muted-foreground mt-1">
            Start creating campaigns to reach your audience and track their
            engagement.
          </p>
        </div>
        <NuxtLink to="./qr-codes/new">
          <Button>Create New QR Code</Button>
        </NuxtLink>
      </div>
    </template>
    <template v-if="campaigns && campaigns?.length > 0">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        <Card v-for="campaign in campaigns" :key="campaign.id">
          <CardHeader class="flex flex-col items-center gap-2">
            <QRCodeCanvas
              :options="{ ...campaign.qrOption, width: 120, height: 120 }"
            />
            <div class="space-y-2">
              <CardTitle class="text-center text-lg font-semibold my-0">
                {{ campaign.name }}
              </CardTitle>

              <CardDescription>
                <a :href="campaign.url" target="_blank">
                  {{ campaign.url }}
                </a>
              </CardDescription>
            </div>
            <AppRow direction="horizontal" class="mx-auto gap-2 flex-wrap">
              <Badge class="uppercase">{{ campaign.mode }}</Badge>
              <Badge class="uppercase" variant="destructive">
                {{
                  campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)
                }}
              </Badge>
            </AppRow>
          </CardHeader>

          <CardContent class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar class="w-4 h-4" />
              <span>Created at: <strong>2025-10-03</strong></span>
            </div>

            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye class="w-4 h-4" />
              <span>Scans: <strong>123</strong></span>
            </div>
          </CardContent>

          <CardFooter>
            <CardAction class="w-full">
              <Button class="w-full">
                <span>View</span>
                <ChevronRight />
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </template>
  </div>
</template>
