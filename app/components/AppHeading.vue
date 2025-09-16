<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4;
  }>(),
  {
    level: 1,
  }
);

const headingClass = computed(() => {
  switch (props.level) {
    case 2:
      return "text-3xl md:text-4xl font-semibold";
    case 3:
      return "text-2xl md:text-2xl font-semibold";
    case 4:
      return "text-lg md:text-xl font-medium";
    case 1:
    default:
      return "text-4xl md:text-5xl font-bold";
  }
});
</script>

<template>
  <component :is="`h${props.level || 1}`" :class="[headingClass]">
    <slot />
  </component>
</template>
