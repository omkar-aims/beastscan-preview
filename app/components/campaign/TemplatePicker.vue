<script setup lang="ts">
import type { CampaignTemplate } from "~/types/campaign";

defineProps<{ templates: CampaignTemplate[] }>();
</script>

<template>
  <div class="grid grid-cols-4 gap-8">
    <NuxtLink
      to="/dashboard"
      class="flex flex-col items-center justify-center border border-dashed border-gray-500 rounded-lg p-6 cursor-pointer hover:-translate-y-1 hover:scale-[101%] hover:shadow-2xl transition-transform duration-200"
    >
      <Icon name="lucide:plus" class="text-2xl" />
      <span class="mt-4 text-center text-lg font-semibold"
        >Create Your Own</span
      >
    </NuxtLink>

    <CampaignTemplateCard
      v-for="(item, index) in templates"
      :key="index"
      :item="item"
    />
  </div>
</template>
