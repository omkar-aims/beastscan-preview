<script setup lang="ts">
definePageMeta({
  layout: "loyalty-overview",
});

const emptyResource = {
  title: "You don't have any offers yet",
  description:
    "Create your first offer to engage customers and drive sales. Offer discounts, promotions, or special deals that encourage repeat visits.",

  image: {
    src: "/offers.svg",
    alt: "Illustration of special offers and promotions",
  },

  link: {
    label: "Create New Offer",
    url: "/dashboard/loyalty/offers/new",
  },

  items: [
    {
      strong: "Custom Promotions:",
      normal: " Design offers tailored to your products or services.",
    },
    {
      strong: "Flexible Timing:",
      normal: " Schedule offers to start and end automatically.",
    },
    {
      strong: "Track Performance:",
      normal: " Monitor usage and engagement to optimize future campaigns.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
