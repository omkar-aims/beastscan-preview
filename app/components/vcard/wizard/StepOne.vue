<script setup lang="ts">
defineProps<{
  nextStep: () => void;
}>();

const templates = [
  {
    name: "section-profile-1",
    preview: "/templates/section-profile-1.png",
  },
  {
    name: "section-profile-2",
    preview: "/templates/section-profile-2.png",
  },
];

const vCardStore = useNewVCardStore();
</script>

<template>
  <TheTemplatePicker
    :templates="templates"
    :handle-select="
      (templateName) => {
        vCardStore.vcard.templateName = templateName;
        nextStep();
      }
    "
  />
</template>
