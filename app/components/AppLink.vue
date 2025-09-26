<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    class="text-primary border-b border-b-transparent hover:border-b-primary"
    :to="to"
    ><slot
  /></NuxtLink>
</template>
