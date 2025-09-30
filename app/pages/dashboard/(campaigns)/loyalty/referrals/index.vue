<script setup lang="ts">
definePageMeta({
  layout: "loyalty-overview",
});

const emptyResource = {
  title: "You don't have any referral programs yet",
  description:
    "Encourage your customers to invite friends and grow your business. Set up your first referral program and reward users for bringing in new customers.",

  image: {
    src: "/referral-program.svg",
    alt: "Illustration of customers sharing referrals",
  },

  link: {
    label: "Create New Referral Program",
    url: "/dashboard/loyalty/referrals/new",
  },

  items: [
    {
      strong: "Easy Setup:",
      normal:
        " Launch referral campaigns in minutes with customizable rewards.",
    },
    {
      strong: "Track Referrals:",
      normal: " Monitor who referred whom and reward them automatically.",
    },
    {
      strong: "Boost Engagement:",
      normal: " Incentivize sharing and attract new customers effortlessly.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
