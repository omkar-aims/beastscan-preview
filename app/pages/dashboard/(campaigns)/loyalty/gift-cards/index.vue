<script setup lang="ts">
definePageMeta({
  layout: "loyalty-overview",
});

const emptyResource = {
  title: "You don't have any gift cards yet",
  description:
    "Create your first gift card to let customers send your products or services as gifts. Boost sales and attract new customers with personalized gift cards.",

  image: {
    src: "/gift-card.svg",
    alt: "Illustration of a gift card with ribbon",
  },

  link: {
    label: "Create New Gift Card",
    url: "/dashboard/loyalty/gift-cards/new",
  },

  items: [
    {
      strong: "Custom Designs:",
      normal:
        " Make gift cards match your brand with colors, logos, and messaging.",
    },
    {
      strong: "Flexible Delivery:",
      normal: " Send gift cards via email or allow printing for physical use.",
    },
    {
      strong: "Track Usage:",
      normal: " Monitor gift card redemptions and customer engagement easily.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
