<script setup lang="ts">
definePageMeta({
  layout: "loyalty-overview",
});

const emptyResource = {
  title: "You don't have any stamp cards yet",
  description:
    "Create your first stamp card to reward loyal customers. Encourage repeat visits and engagement with customizable rewards and designs.",

  image: {
    src: "/stamp-card.svg",
    alt: "Illustration of a customer collecting stamp cards",
  },

  link: {
    label: "Create New Stamp Card",
    url: "/dashboard/loyalty/stamp-cards/new",
  },

  items: [
    {
      strong: "Customizable Rewards:",
      normal: " Tailor stamp cards with rewards that excite your customers.",
    },
    {
      strong: "Flexible Placement:",
      normal:
        " Embed cards in emails, websites, or apps to increase engagement.",
    },
    {
      strong: "Track Progress:",
      normal: " Monitor customer activity and reward milestones effortlessly.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
