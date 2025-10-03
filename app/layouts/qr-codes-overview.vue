<script setup lang="ts">
import Default from "./default.vue";
import { QrCode, Contact2, MonitorSmartphone } from "lucide-vue-next";

const tabs = [
  { label: "QR Codes", to: "/dashboard/qr-codes", icon: QrCode },
  { label: "Devices", to: "/dashboard/devices", icon: MonitorSmartphone },
  { label: "Contacts", to: "/dashboard/contacts", icon: Contact2 },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }"> {{ activeTab?.label }} </template>
      <template #action="{ activeTab }">
        <NuxtLink :href="`${activeTab?.to}/new`">
          <Button v-if="activeTab?.label === 'QR Codes'">Create New</Button>
          <Button v-else>Add New</Button>
        </NuxtLink>
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
