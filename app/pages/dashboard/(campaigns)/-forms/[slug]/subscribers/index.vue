<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";

definePageMeta({
  layout: "form-overview",
});

const subscribers = ref([
  { email: "alice@example.com", date: "2025-09-25", ipAddress: "192.168.1.10" },
  { email: "bob@example.com", date: "2025-09-24", ipAddress: "192.168.1.11" },
  { email: "carol@example.com", date: "2025-09-23", ipAddress: "192.168.1.12" },
  { email: "dave@example.com", date: "2025-09-22", ipAddress: "192.168.1.13" },
  { email: "eve@example.com", date: "2025-09-21", ipAddress: "192.168.1.14" },
  { email: "frank@example.com", date: "2025-09-20", ipAddress: "192.168.1.15" },
  { email: "grace@example.com", date: "2025-09-19", ipAddress: "192.168.1.16" },
  { email: "heidi@example.com", date: "2025-09-18", ipAddress: "192.168.1.17" },
  { email: "ivan@example.com", date: "2025-09-17", ipAddress: "192.168.1.18" },
  { email: "judy@example.com", date: "2025-09-16", ipAddress: "192.168.1.19" },
]);

const columns: ColumnDef<(typeof subscribers.value)[0]>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: "Subscription Date",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: (info) => info.getValue(),
  },
];
</script>

<template>
  <DataTable
    :columns="columns"
    :data="subscribers"
    :allow-import-export="false"
    :allow-search="false"
  />
</template>
