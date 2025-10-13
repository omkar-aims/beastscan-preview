<script setup lang="ts">
import { Home, Pencil, Trash } from "lucide-vue-next";
import Default from "./default.vue";

const tabs = [
  { label: "Overview", to: "/dashboard/qr-codes/overview", icon: Home },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title> Qr-code Overview </template>
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
