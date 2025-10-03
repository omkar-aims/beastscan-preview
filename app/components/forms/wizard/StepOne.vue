<script setup lang="ts">
defineProps<{
  nextStep: () => void;
}>();

const templates = [
  {
    name: "Classic Lead Capture",
    preview:
      "https://files.jotform.com/jotformapps/lead-capture-form-dde416f59c804b9d693d09e0da962a7c-classic.png",
  },
  {
    name: "Modern Lead Form",
    preview:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgzk6KSI8ROLGzE_7zjUfi8G1VK21qpxOgA&s",
  },
  {
    name: "Marketing Form Example",
    preview:
      "https://cdn.marketing123.123formbuilder.com/wp-content/uploads/2020/12/Lead-Capture-Form-4030148-1.jpg",
  },
];

// const newFormStore = useNewFormStore();
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
