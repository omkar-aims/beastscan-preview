<script setup lang="ts">
import type { Device } from "~/types/device";
import type { ColumnDef } from "@tanstack/vue-table";

import Badge from "~/components/ui/badge/Badge.vue";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import DataTableDropDown from "~/components/DataTableDropDown.vue";

definePageMeta({
  layout: "qr-codes-overview",
});

const devices: Device[] = [
  {
    name: "Keyhanger 001",
    tagId: "DEV-001",
    status: "assigned",
    linkedTo: {
      title: "Restaurant Summer Menu",
      campaignId: "C-1234",
    },
    scans: 87,
  },
  {
    name: "Backpack Tracker",
    tagId: "DEV-002",
    status: "lost",
    scans: 12,
  },
  {
    name: "Event Sticker 5",
    tagId: "DEV-003",
    status: "assigned",
    linkedTo: {
      title: "Grottino Campaign",
      campaignId: "C-2221",
    },
    scans: 305,
  },
  {
    name: "Warehouse Tag 7",
    tagId: "DEV-004",
    status: "assigned",
    linkedTo: {
      title: "Inventory Check Campaign",
      campaignId: "C-7890",
    },
    scans: 143,
  },
  {
    name: "Parcel Tracker X",
    tagId: "DEV-005",
    status: "lost",
    scans: 8,
  },
  {
    name: "Asset Tag A1",
    tagId: "DEV-006",
    status: "assigned",
    linkedTo: {
      title: "Asset Management Campaign",
      campaignId: "C-4567",
    },
    scans: 219,
  },
  {
    name: "Tool Tracker",
    tagId: "DEV-007",
    status: "lost",
    scans: 34,
  },
  {
    name: "Event Sticker 6",
    tagId: "DEV-008",
    status: "assigned",
    linkedTo: {
      title: "Music Festival Campaign",
      campaignId: "C-3344",
    },
    scans: 152,
  },
  {
    name: "Vehicle Tag B2",
    tagId: "DEV-009",
    status: "assigned",
    linkedTo: {
      title: "Fleet Management Campaign",
      campaignId: "C-9988",
    },
    scans: 89,
  },
  {
    name: "Lost Item Locator",
    tagId: "DEV-010",
    status: "lost",
    scans: 5,
  },
];

const columns: ColumnDef<Device>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | string) =>
          table.toggleAllPageRowsSelected(Boolean(value)),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | string) =>
          row.toggleSelected(Boolean(value)),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Device Name",
    accessorKey: "name",
  },
  {
    header: "Tag ID",
    accessorKey: "linkedTo.title",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) =>
      h(
        Badge,
        {
          class: "uppercase w-[80px]",
          variant:
            row.getValue("status") === "assigned" ? "success" : "destructive",
        },
        {
          default: () => row.getValue("status"),
        }
      ),
  },
  {
    header: "Linked To",
    accessorKey: "tagId",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const device = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropDown, {
          device,
        })
      );
    },
  },
];
</script>

<template>
  <div>
    <DataTable :data="devices" :columns="columns" />
  </div>
</template>
