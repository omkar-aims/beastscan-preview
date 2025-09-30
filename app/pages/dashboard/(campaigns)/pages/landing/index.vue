<script setup lang="ts">
definePageMeta({
  layout: "pages-overview",
});

const emptyResource = {
  title: "You don't have any landing pages yet",
  description:
    "Create your first landing page to showcase your products, services, or campaigns. Engage visitors with beautifully designed pages in minutes.",

  image: {
    src: "/landing-page.svg",
    alt: "Illustration of a landing page design",
  },

  link: {
    label: "Create New Landing Page",
    url: "/dashboard/pages/landing/new",
  },

  items: [
    {
      strong: "Custom Designs:",
      normal:
        " Choose from templates or build your own landing page from scratch.",
    },
    {
      strong: "Responsive Layouts:",
      normal:
        " Ensure your page looks great on desktops, tablets, and mobile devices.",
    },
    {
      strong: "Easy Publishing:",
      normal: " Launch your page instantly with a single click.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
