<script setup lang="ts">
import type { CampaignTemplate } from "~/types/campaign";
defineProps<{
  item: CampaignTemplate;
}>();
</script>

<template>
  <div
    class="p-0 hover:-translate-y-1 hover:scale-[101%] h-[478px] hover:shadow-2xl transition-transform duration-200 cursor-pointer overflow-hidden"
  >
    <NuxtImg :src="item.imageUrl" class="w-full h-full object-cover" />
  </div>
</template>
