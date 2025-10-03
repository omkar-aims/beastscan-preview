<script setup lang="ts">
definePageMeta({
  layout: "pages-overview",
});

const emptyResource = {
  title: "You don't have any vCards yet",
  description:
    "Create your first digital vCard to share your contact information easily. Perfect for networking and connecting with clients instantly.",

  image: {
    src: "/vcard.svg",
    alt: "Illustration of a digital vCard",
  },

  link: {
    label: "Create New vCard",
    url: "/dashboard/pages/vcard/new",
  },

  items: [
    {
      strong: "Personalized Contact:",
      normal: " Add your name, title, phone, email, and social links.",
    },
    {
      strong: "Share Anywhere:",
      normal: " Send your vCard via QR code, link, or email.",
    },
    {
      strong: "Track Engagement:",
      normal: " See who viewed or saved your vCard for better follow-ups.",
    },
  ],
};
</script>

<template>
  <EmptyResource v-bind="emptyResource" />
</template>
