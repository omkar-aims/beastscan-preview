<script setup lang="ts">
import Default from "./default.vue";

import { Store, Package, BarChart2, Settings } from "lucide-vue-next";

const tabs = [
  { label: "Store", to: "/dashboard/store", icon: Store },
  { label: "Products", to: "/dashboard/store/products", icon: Package },
  { label: "Analytics", to: "/dashboard/store/analytics", icon: BarChart2 },
  { label: "Settings", to: "/dashboard/store/settings", icon: Settings },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }"> {{ activeTab?.label }} </template>
      <template #action="{ activeTab }">
        <NuxtLink
          :href="`${activeTab?.to.replace(
            activeTab.label.toLowerCase(),
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
