<script setup lang="ts">
import { Home, Settings, Users } from "lucide-vue-next";

const tabs = [
  { label: "Overview", to: "/dashboard/forms", icon: Home },
  { label: "Automation", to: "/dashboard/forms/automation", icon: Settings },
  { label: "Subscribers", to: "/dashboard/forms/subscribers", icon: Users },
];
</script>

<template>
  <div>
    <NuxtLayout name="page-with-tabs" title="Your pages">
      <template #action>
        <Button variant="destructive">Delete</Button>
      </template>

      <template #tabs> <TabNav :tabs="tabs" /> </template>

      <div>Tabs go here</div>
    </NuxtLayout>
  </div>
</template>
