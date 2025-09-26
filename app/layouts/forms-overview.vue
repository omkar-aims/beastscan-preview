<script setup lang="ts">
import Default from "./default.vue";

const tabs = [
  { label: "Pop-ups", to: "/dashboard/forms/pop-ups" },
  { label: "Embeded", to: "/dashboard/forms/embeded" },
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
