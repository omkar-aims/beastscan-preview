<script setup lang="ts">
const campaigns = [
  {
    id: "campaign_001",
    templateId: 2,
    name: "Olivia's Real Estate Portfolio",
    category: "link-page",
    status: "draft",
    createdAt: "2025-09-10T16:30:00Z",
    lastEditedAt: "2025-09-10T16:45:00Z",
  },
  {
    id: "campaign_002",
    templateId: 1,
    name: "Margaret's Marketing Profile",
    category: "link-page",
    status: "published",
    createdAt: "2025-09-09T14:20:00Z",
    lastEditedAt: "2025-09-10T10:00:00Z",
  },
  {
    id: "campaign_003",
    templateId: 3,
    name: "Juliana's Photography Portfolio",
    category: "link-page",
    status: "draft",
    createdAt: "2025-09-08T11:15:00Z",
    lastEditedAt: "2025-09-09T17:45:00Z",
  },
  {
    id: "campaign_004",
    templateId: 4,
    name: "Custom Business Landing Page",
    category: "landing-page",
    status: "published",
    createdAt: "2025-09-07T09:00:00Z",
    lastEditedAt: "2025-09-08T08:30:00Z",
  },
  {
    id: "campaign_005",
    templateId: 5,
    name: "E-commerce Storefront Sample",
    category: "store-front",
    status: "draft",
    createdAt: "2025-09-06T20:45:00Z",
    lastEditedAt: "2025-09-07T13:15:00Z",
  },
];

console.log(campaigns);
</script>

<template>
  <div>
    <AppRow>
      <AppHeading :level="3">My Campaigns</AppHeading>
    </AppRow>
  </div>
</template>
