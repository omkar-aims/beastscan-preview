<script setup lang="ts">
import { useRoute } from "vue-router";

const { title, tabs, dynamicButton } = defineProps<{
  title?: string;
  tabs: { name: string; path?: string }[];
  dynamicButton: {
    visible: boolean;
    text: string;
    to: string;
  };
}>();

const route = useRoute();
</script>

<template>
  <div class="px-4 py-2">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-semibold mr-2">{{ title }}</h1>

      <NuxtLink
        v-if="dynamicButton.visible"
        :to="dynamicButton.to"
        class="font-bold py-2 px-4"
      >
        <Button>
          {{ dynamicButton.text }}
        </Button>
      </NuxtLink>
    </div>

    <nav class="flex pt-6 mb-6 space-x-6">
      <NuxtLink v-for="tab in tabs" :key="tab.path" :to="tab.path" class="py-1">
        <span
          class="pb-1 border-b-2 border-transparent hover:text-primary hover:border-primary"
          :class="{
            'border-b-primary text-primary': route.path === tab.path,
          }"
        >
          {{ tab.name }}
        </span>
      </NuxtLink>
    </nav>
    <slot />
  </div>
</template>
