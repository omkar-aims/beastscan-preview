<script setup lang="ts">
import { campaignTemplates } from "@/constants";

const emit = defineEmits(["done"]);

function onThemeSelect(theme: (typeof campaignTemplates)[0]) {
  const template = theme.config;
  emit("done", template);
}
</script>

<template>
  <section class="space-y-8">
    <div class="flex flex-wrap gap-6">
      <div
        v-for="template in campaignTemplates"
        :key="template.id"
        class="group relative cursor-pointer rounded-2xl overflow-hidden w-[220px]"
        @click="() => onThemeSelect(template)"
      >
        <NuxtImg
          :src="template.thumbnail"
          :alt="template.name"
          class="h-full w-full object-cover"
        />

        <div
          class="absolute left-0 right-0 bottom-0 bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 rounded-t-none"
        >
          <h3 class="text-white text-lg font-semibold mb-1">
            {{ template.name }}
          </h3>
          <p class="text-white/80 text-sm leading-snug">
            {{ template.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
