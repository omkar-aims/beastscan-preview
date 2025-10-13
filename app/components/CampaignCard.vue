<script setup lang="ts">
import type { Campaign } from "~/types/campaign";

const props = defineProps<{
  campaign: Campaign;
  layout: "grid" | "list";
}>();

const formattedDate = computed(() =>
  props.campaign.createdAt
    ? new Date(props.campaign.createdAt).toLocaleDateString()
    : "N/A"
);
</script>

<template>
  <Card v-if="layout === 'grid'" class="flex flex-col">
    <CardHeader class="flex flex-col gap-4 p-4">
      <!-- Title and Dropdown Row -->
      <div class="flex items-start justify-between gap-3 w-full">
        <CardTitle class="text-lg font-bold flex-1 line-clamp-2">
          {{ campaign.name }}
        </CardTitle>
        <div class="flex-shrink-0">
          <DataTableDropDown />
        </div>
      </div>

      <!-- QR Code -->
      <div class="w-full flex justify-center py-3">
        <div class="w-full flex flex-col items-center gap-2">
          <NuxtImg
            src="/qr.png"
            alt="QR Code"
            class="w-36 h-36 object-contain rounded-lg border-2 shadow-md"
          />
          <p>{{ campaign.name }}</p>
        </div>
      </div>

      <!-- Link -->
      <div class="w-full flex justify-center items-center px-2">
        <AppLink
          to="campaign.link"
          class="text-link break-all text-sm inline-flex items-center gap-1.5 text-center"
        >
          {{ campaign.link }}
        </AppLink>
      </div>

      <!-- Badges -->
      <div class="w-full flex justify-center items-center gap-2 flex-wrap">
        <Badge class="uppercase px-3 py-1 text-xs font-medium">
          {{ campaign.type }}
        </Badge>
        <Badge
          class="uppercase px-3 py-1 text-xs font-medium"
          :variant="campaign.mode === 'dynamic' ? 'default' : 'secondary'"
        >
          {{ campaign.mode }}
        </Badge>
      </div>
    </CardHeader>

    <CardContent class="flex flex-col flex-1 justify-end gap-3 px-5 pb-5">
      <!-- Stats Section -->
      <Card>
        <div class="px-4">
          <!-- Scan Count -->
          <div class="flex items-center justify-between mb-3 pb-3">
            <span class="flex items-center gap-2 text-sm font-medium">
              <Icon name="lucide:scan-line" class="w-4 h-4" />
              <span>Total Scans</span>
            </span>
            <span class="text-xl font-bold text-primary">
              {{ campaign.scan || 12 }}
            </span>
          </div>

          <!-- Created Date -->
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2 text-sm font-medium">
              <Icon name="lucide:calendar-days" class="w-4 h-4" />
              <span>Created At</span>
            </span>
            <span class="text-sm font-semibold">
              {{ formattedDate }}
            </span>
          </div>
        </div>
      </Card>

      <!-- View Details link -->
      <div class="flex-1">
        <NuxtLink
          class="text-sm text-primary hover:underline inline-flex items-center cursor-pointer"
        >
          <Icon name="lucide:arrow-right" class="w-4 h-4 inline-block mr-1" />
          <span>View Details</span>
        </NuxtLink>
      </div>
    </CardContent>
  </Card>

  <!-- LIST Layout -->
  <Card
    v-else
    class="flex flex-col sm:flex-row items-start gap-8 p-6 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-200"
  >
    <div
      class="flex flex-1 flex-col lg:flex-row lg:justify-between gap-8 w-full"
    >
      <!-- Left Section -->
      <div class="flex-1 grid gap-3">
        <div>
          <h3 class="text-xl font-bold mb-1">
            {{ campaign.name }}
          </h3>
          <p>
            <AppLink to="campaign.link">
              {{ campaign.link }}
            </AppLink>
          </p>

          <!-- Badges -->
          <div class="flex gap-2 mt-3 flex-wrap">
            <Badge class="px-3 py-1">Website</Badge>
            <Badge
              :variant="campaign.mode === 'dynamic' ? 'default' : 'secondary'"
              class="px-3 py-1"
            >
              {{ campaign.mode }}
            </Badge>
          </div>
        </div>

        <!-- Created Date -->
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="lucide:calendar-days" class="w-4 h-4" />
          <span>
            Created At
            {{ formattedDate }}
          </span>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center justify-end gap-8">
        <!-- Stats Section -->
        <Card>
          <div class="flex flex-col items-center justify-center px-4 py-2">
            <span class="text-3xl font-bold text-primary">
              {{ campaign.scan }}
            </span>
            <span class="text-xs text-gray-500 uppercase tracking-wide mt-1"
              >Scans</span
            >
            <button
              class="flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-2 transition-colors"
            >
              <span>View Details</span>
              <Icon name="lucide:arrow-right" class="w-3 h-3" />
            </button>
          </div>
        </Card>

        <!-- QR Code Image -->
        <div class="flex flex-col items-center gap-2">
          <NuxtImg
            src="/qr.png"
            alt="QR Code"
            class="w-24 h-24 object-contain"
          />
          <span class="text-xs">{{ campaign.name }}</span>
        </div>
        <!-- Dropdown Menu -->
        <div class="flex items-center">
          <DataTableDropDown />
        </div>
      </div>
    </div>
  </Card>
</template>
