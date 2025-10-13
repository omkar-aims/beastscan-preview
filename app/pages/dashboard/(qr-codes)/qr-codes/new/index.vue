<script setup lang="ts">
const builderStore = useBuilderStore();
builderStore.open();

const colorMode = useColorMode();

onUnmounted(() => {
  builderStore.close();
});
</script>

<template>
  <div class="relative">
    <TheBuilder
      :source="`https://beast-qr.netlify.app/?mode=embed&color-mode=${colorMode.value}`"
    />
  </div>
</template>
