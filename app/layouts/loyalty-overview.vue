<script setup lang="ts">
import Default from "./default.vue";

import { Gift, Users, Tag, Stamp } from "lucide-vue-next";

const tabs = [
  { label: "Gift Cards", to: "/dashboard/loyalty/gift-cards", icon: Gift },
  { label: "Stamp Cards", to: "/dashboard/loyalty/stamp-cards", icon: Stamp },
  {
    label: "Referral Program",
    to: "/dashboard/loyalty/referrals",
    icon: Users,
  },
  { label: "Offers", to: "/dashboard/loyalty/offers", icon: Tag },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }">
        {{ activeTab?.label }}
      </template>

      <template #action="{ activeTab }">
        <NuxtLink
          :href="`${activeTab?.to.replace(
            activeTab.label.toLowerCase().replace(' ', '-'),
            'new'
          )}`"
        >
          <Button>Create New</Button>
        </NuxtLink>
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
