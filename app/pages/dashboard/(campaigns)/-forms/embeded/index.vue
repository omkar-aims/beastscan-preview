<script setup lang="ts">
definePageMeta({
  layout: "forms-overview",
});

const emptyResource = {
  title: "Build Your First Embedded Form",
  description:
    "Turn visitors into subscribers with sleek, customizable forms added directly to your website.",

  image: {
    src: "/embed-form.svg",
    alt: "Embedded form illustration",
  },

  link: {
    label: "Create New",
    url: "/dashboard/forms/new",
  },

  items: [
    {
      strong: "Match your brand:",
      normal: " with designs that blend seamlessly into your site.",
    },
    {
      strong: "Place forms anywhere:",
      normal: " — in content, sidebars, or footers.",
    },
    {
      strong: "Stay compliant:",
      normal: " with built-in privacy and consent options.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
