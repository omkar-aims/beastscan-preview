<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import QRCodeCanvas from "~/components/QRCodeCanvas.vue";
import Badge from "~/components/ui/badge/Badge.vue";
import { Calendar, Download } from "lucide-vue-next";

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
      <Card
        v-for="campaign in campaigns"
        :key="campaign.id"
        class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 p-4"
      >
        <CardHeader class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex-1">
            <CardTitle class="text-lg sm:text-xl font-semibold">
              {{ campaign.name }}
            </CardTitle>

            <CardDescription class="text-sm text-muted-foreground break-all">
              <a :href="campaign.url" target="_blank" class="hover:underline">
                {{ campaign.url }}
              </a>
            </CardDescription>

            <div
              class="flex items-center gap-2 text-xs text-muted-foreground mt-2"
            >
              <Calendar class="w-4 h-4" />
              <span>Created at: <strong>2025-10-03</strong></span>
            </div>

            <div class="flex flex-wrap gap-2 mt-3">
              <Badge class="uppercase flex items-center gap-1">
                <Icon name="lucide:zap" />
                {{ campaign.mode }}
              </Badge>

              <Badge
                class="uppercase flex items-center gap-1"
                variant="destructive"
              >
                <Icon name="lucide:globe" />
                {{
                  campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)
                }}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent
          class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12"
        >
          <div class="text-center flex-1 space-y-1">
            <AppHeading :level="3" class="text-2xl font-bold">
              <AnimatedCounter :value="120" />
            </AppHeading>
            <span class="block text-sm text-muted-foreground">Scans</span>
            <AppLink to="/dashboard/qr-codes/overview" class="mt-1 text-sm">
              <span>View details</span>
            </AppLink>
          </div>

          <div class="flex flex-col items-center gap-3">
            <QRCodeCanvas
              :options="{ ...campaign.qrOption, width: 80, height: 80 }"
              class="rounded border border-gray-200"
            />
            <QRDownloadButton
              :qr-options="campaign.qrOption"
              :title="campaign.name"
            >
              <Button variant="outline" class="w-full flex items-center gap-1">
                <span>Download</span>
                <Download />
              </Button>
            </QRDownloadButton>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
