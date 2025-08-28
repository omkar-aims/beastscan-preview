<script setup lang="ts">
const colorMode = useColorMode();

const logoPath = computed(() => {
  const mode =
    colorMode.preference === "system" ? colorMode.value : colorMode.preference;

  return `logo-full-${mode}.png`;
});
</script>

<template>
  <NuxtLink to="/">
    <ClientOnly>
      <NuxtImg class="mx-auto" alt="Image" :src="logoPath" width="180" />
    </ClientOnly>
  </NuxtLink>
</template>
