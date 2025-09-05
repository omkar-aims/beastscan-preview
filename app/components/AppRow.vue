<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    direction?: "horizontal" | "vertical";
  }>(),
  {
    gap: "sm",
    direction: "vertical",
  }
);

const gapMap = {
  xs: "1",
  sm: "2",
  md: "4",
  lg: "6",
  xl: "8",
  "2xl": "12",
};

const rowClasses = computed(() => {
  if (props.direction === "horizontal") {
    return `flex gap-${gapMap[props.gap]}`;
  } else {
    return `flex flex-col gap-${gapMap[props.gap]}`;
  }
});
</script>

<template>
  <div :class="rowClasses">
    <slot />
  </div>
</template>
