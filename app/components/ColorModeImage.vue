<script setup lang="ts">
const colorMode = useColorMode();

const props = defineProps<{
  src: string;
  alt?: string;
  class?: string;
}>();

const isDark = computed(() => {
  return (
    colorMode.preference === "dark" ||
    (colorMode.preference === "system" && colorMode.value === "dark")
  );
});
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :class="[props.class, 'select-none', isDark ? 'invert' : '']"
  />
</template>
