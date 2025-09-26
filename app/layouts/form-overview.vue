<script setup lang="ts">
import { Home, Pencil, Settings, Trash, Users } from "lucide-vue-next";
import Default from "./default.vue";

const tabs = [
  { label: "Overview", to: "/dashboard/forms/my-form/overview", icon: Home },
  {
    label: "Automation",
    to: "/dashboard/forms/my-form/automation",
    icon: Settings,
  },
  {
    label: "Subscribers",
    to: "/dashboard/forms/my-form/subscribers",
    icon: Users,
  },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }"> {{ activeTab?.label }} </template>
      <template #action>
        <AppRow direction="horizontal">
          <Button variant="destructive">
            <Trash />
            <span>Delete</span>
          </Button>
          <Button>
            <Pencil />
            <span>Edit</span>
          </Button>
        </AppRow>
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
