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
    <TabsWithAction
      title="All Leads"
      :tabs="tabs"
      :dynamic-button="dynamicButton"
    >
      <slot />
    </TabsWithAction>
  </DefaultLayout>
</template>
