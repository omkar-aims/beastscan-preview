<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
}>();
</script>

<template>
  <div
    class="sticky top-0 w-64 h-[480px] rounded-3xl border-4 p-2 border-gray-200 bg-gray-200 dark:bg-gray-600 dark:border-gray-600 shadow-xl overflow-hidden"
  >
    <div
      class="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full border-gray-300 bg-gray-300 dark:bg-gray-700 dark:border-gray-700"
    />
    <NuxtImg
      :src="src"
      :alt="alt || 'Phone preview'"
      class="w-full h-full object-cover rounded-3xl"
    />
  </div>
</template>
