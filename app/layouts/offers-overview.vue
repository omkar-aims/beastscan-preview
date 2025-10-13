<script setup lang="ts">
import { BadgePercent, BellRing, TicketCheck } from "lucide-vue-next";
import Default from "./default.vue";

const tabs = [
  { label: "My Offers", to: "/dashboard/offers/my-offers", icon: BadgePercent },
  { label: "Offers NearBy", to: "/dashboard/offers/offers-nearby", icon: BellRing },
  { label: "Redeemed Offers", to: "/dashboard/offers/redeemed", icon: TicketCheck },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }">
        {{ activeTab?.label }}
      </template>

      <template #action="{ activeTab }">
        <!-- Show button ONLY for "My Offers" tab -->
        <NuxtLink v-if="activeTab?.label === 'My Offers'" to="/dashboard/offers/new">
          <Button>Create New</Button>
        </NuxtLink>
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
