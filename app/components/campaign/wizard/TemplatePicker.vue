<script setup lang="ts">
defineProps<{
  handleSelectTemplate: (a: string) => void;
}>();

const templates = [
  {
    id: 1,
    name: "section-lead-1",
    imageUrl: "./templates/forms/form-01.png",
  },

  {
    id: 2,
    name: "section-lead-2",
    imageUrl: "./templates/forms/form-02.png",
  },
];
</script>

<template>
  <AppRow gap="md">
    <CampaignTemplatePicker
      :handle-select-template="handleSelectTemplate"
      :templates="templates"
    />
  </AppRow>
</template>
