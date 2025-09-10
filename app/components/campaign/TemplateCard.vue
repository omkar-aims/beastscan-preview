<script setup lang="ts">
import type { CampaignTemplate } from "~/types/campaign";
defineProps<{
  item: CampaignTemplate;
}>();
</script>

<template>
  <Card
    class="p-0 hover:-translate-y-1 hover:scale-[101%] hover:shadow-2xl transition-transform duration-200 cursor-pointer"
  >
    <div>
      <NuxtImg :src="item.imageUrl" width="100%" />
    </div>
  </Card>
</template>
