<script setup lang="ts">
import Default from "./default.vue";
import { PanelTop, IdCard } from "lucide-vue-next";

const tabs = [
  { label: "Landing Page", to: "/dashboard/pages/landing", icon: PanelTop },
  { label: "V-Card", to: "/dashboard/pages/vcard", icon: IdCard },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }"> {{ activeTab?.label }} </template>
      <template #action="{ activeTab }">
        <NuxtLink :href="`${activeTab?.to}/new`">
          <Button>Create New</Button>
        </NuxtLink>
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
