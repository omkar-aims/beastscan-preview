<script setup lang="ts">
defineProps<{
  nextStep: () => void;
}>();

const templates = [
  {
    name: "section-profile-1",
    preview: "/templates/profile-01.png",
  },
];
</script>

<template>
  <TheTemplatePicker
    :templates="templates"
    :handle-select="
      () => {
        nextStep();
      }
    "
  />
</template>
