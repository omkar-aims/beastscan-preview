<script setup lang="ts">
import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableDropDown from "@/components/DataTableDropDown.vue";
import {
  Badge,
  Sticker,
  ScanQrCode,
  Box,
  IdCard,
  HelpCircle,
  Plus,
} from "lucide-vue-next";

type Device = {
  name: string;
  code: string;
  type: string;
  linkedCampaign: string;
  scans: number;
  status: string;
};

const devices = [
  {
    name: "Sticker #001",
    code: "STK-001",
    type: "Sticker",
    linkedCampaign: "campaign_1",
    scans: 45,
    status: "active",
  },
  {
    name: "Tag #A5",
    code: "TAG-A5",
    type: "Tags",
    linkedCampaign: "campaign_3",
    scans: 18,
    status: "inactive",
  },
  {
    name: "Wood Cube #03",
    code: "WC-003",
    type: "Wood Cube",
    linkedCampaign: "campaign_4",
    scans: 9,
    status: "lost",
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
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type || "Unknown";

      const typeMap: Record<string, { icon: any; label: string }> = {
        Sticker: { icon: Sticker, label: "Sticker" },
        "Social Cards": { icon: ScanQrCode, label: "Social Card" },
        Tags: { icon: Badge, label: "Tag" },
        "Wood Cube": { icon: Box, label: "Wood Cube" },
        "Wood Card": { icon: IdCard, label: "Wood Card" },
        Unknown: { icon: HelpCircle, label: "Unknown" },
      };

      const { icon: Icon, label } = typeMap[type] || typeMap.Unknown;

      return h(
        "div",
        { class: "flex items-center gap-2 text-sm text-muted-foreground" },
        [h(Icon, { class: "w-4 h-4 text-foreground" }), h("span", label)]
      );
    },
  },
  {
    header: "Name/Code",
    cell: ({ row }) => {
      const data = row.original;
      return h("div", { class: "flex flex-col" }, [
        h("p", { class: "font-medium text-foreground" }, data.name),
        h("p", { class: "text-sm text-muted-foreground" }, data.code),
      ]);
    },
  },

  {
    header: "Linked Campaign",
    cell: ({ row }) => {
      const linked = row.original.linkedCampaign || "—";
      return h("p", { class: "text-sm text-muted-foreground" }, linked);
    },
  },

  {
    header: "Scans",
    accessorKey: "scans",
    cell: ({ row }) => {
      const scans = row.original.scans ?? 0;
      const color =
        scans > 100
          ? "bg-green-100 text-green-700"
          : scans > 20
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";

      return h(
        "span",
        {
          class: `px-2 py-0.5 rounded-full text-xs font-medium ${color}`,
        },
        `${scans} scans`
      );
    },
  },

  {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "inactive";
      const color =
        status === "active"
          ? "bg-green-100 text-green-700"
          : status === "lost"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700";

      return h(
        "span",
        {
          class: `px-2 py-0.5 rounded-full text-xs font-medium capitalize ${color}`,
        },
        status
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      h("div", { class: "relative" }, [
        h(DataTableDropDown, {
          device: row.original,
        }),
      ]),
  },
];
</script>

<template>
  <div class="space-y-4">
    <AppRow direction="horizontal" class="justify-between items-center">
      <AppHeading :level="3">Devices</AppHeading>

      <Sheet>
        <SheetTrigger>
          <Button>
            <Plus />
            <span>Add New</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <h1>Content</h1>
        </SheetContent>
      </Sheet>
    </AppRow>
    <DataTable
      v-if="devices"
      :data="devices"
      :columns="columns"
      :allow-import-export="false"
      :allow-search="true"
    />
  </div>
</template>
