<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink class="text-primary hover:underline" :to="to"><slot /></NuxtLink>
</template>
