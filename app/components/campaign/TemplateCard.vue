<script setup lang="ts">
import type { CampaignTemplate } from "~/types/campaign";
defineProps<{
  item: CampaignTemplate;
}>();
</script>

<template>
  <div
    class="p-0 hover:-translate-y-1 hover:scale-[101%] h-[478px] hover:shadow-2xl transition-transform duration-200 cursor-pointer"
  >
    <NuxtImg :src="item.imageUrl" width="100%" height="100%" />
  </div>
</template>
