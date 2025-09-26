<script setup lang="ts">
import DefaultLayout from "./default.vue";
import TabsWithAction from "~/components/TabsWithAction.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tabs = [
  { name: "All Leads", path: "/dashboard/leads" },
  { name: "Segment", path: "/dashboard/leads/segment" },
  { name: "Group", path: "/dashboard/leads/group" },
  { name: "Stats", path: "/dashboard/leads/stats" },
  { name: "Cleanup Inactives", path: "/dashboard/leads/clean-up" },
];

const dynamicButton = computed(() => {
  switch (route.path) {
    case "/dashboard/leads":
      return {
        visible: true,
        text: "Add Leads",
        to: "/dashboard/leads/import",
      };
    case "/dashboard/leads/segment":
      return {
        visible: true,
        text: "Create New Segment",
        to: "/dashboard/leads/segment/new-segment",
      };
    case "/dashboard/leads/group":
      return {
        visible: true,
        text: "Create New Group",
        to: "/dashboard/leads/group/new-group",
      };
    default:
      return { visible: false, text: "", to: "/" };
  }
});
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-semibold mr-2">All Leads</h1>

      <NuxtLink
        v-if="dynamicButton.visible"
        :to="dynamicButton.to"
        class="font-bold py-2 px-4"
      >
        <Button>
          {{ dynamicButton.text }}
        </Button>
      </NuxtLink>
    </div>

    <nav class="flex pt-6 mb-6 space-x-6">
      <NuxtLink v-for="tab in tabs" :key="tab.path" :to="tab.path" class="py-1">
        <span
          class="pb-1 border-b-2 border-transparent hover:text-primary hover:border-primary"
          :class="{
            'border-b-primary text-primary': $route.path === tab.path,
          }"
        >
          {{ tab.name }}
        </span>
      </NuxtLink>
    </nav>

    <TabsWithAction
      title="All Leads"
      :tabs="tabs"
      :dynamic-button="dynamicButton"
    >
      <slot />
    </TabsWithAction>
  </DefaultLayout>
</template>
