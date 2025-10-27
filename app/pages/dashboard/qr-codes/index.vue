<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import { Plus, QrCode } from "lucide-vue-next";
import type { Campaign } from "~/types/campaign";
import type { ColumnDef } from "@tanstack/vue-table";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import DataTableDropDown from "~/components/DataTableDropDown.vue";
import { NuxtImg } from "#components";

const { data: campaigns, isLoading } = useCampaigns();
const columns: ColumnDef<Campaign>[] = [
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
    id: "qr",
    header: "QR Code",
    cell: () =>
      h(NuxtImg, {
        src: "https://kinsta.com/wp-content/uploads/2019/03/kinsta-qr-code.png",
        width: 80,
        height: 80,
      }),
  },

  {
    header: "Title / URL",
    cell: ({ row }) => {
      const data = row.original;
      return h("div", { class: "flex flex-col" }, [
        h("p", { class: "font-medium text-foreground" }, data.name),
        h("p", { class: "text-sm text-muted-foreground" }, data.url),
      ]);
    },
  },

  {
    header: "Campaign",
    cell: ({ row }) => {
      const campaign = row.original?.campaign || "Summer Sale 2025";
      return h("p", { class: "text-sm text-muted-foreground" }, campaign);
    },
  },

  {
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original.createdAt || new Date().toISOString();
      const formatted = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return h("p", { class: "text-sm text-muted-foreground" }, formatted);
    },
  },

  {
    header: "Scans",
    accessorKey: "scans",
    cell: ({ row }) => {
      const scans = row.original.scan ?? 0;
      const color =
        scans > 100
          ? "bg-green-100 text-green-700"
          : scans > 20
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";

      return h("div", { class: "flex justify-start" }, [
        h(
          "span",
          {
            class: `px-2 py-0.5 rounded-full text-xs font-medium ${color}`,
          },
          `${scans} scans`
        ),
      ]);
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
      <AppHeading :level="3">QR Codes</AppHeading>

      <Sheet>
        <SheetTrigger>
          <Button class="flex items-center gap-2">
            <Plus />
            <span>Create New</span>
          </Button>
        </SheetTrigger>

        <SheetContent class="flex flex-col items-center gap-6 p-6">
          <QrCode class="w-24 h-24 text-muted-foreground" />

          <Select class="w-full">
            <SelectTrigger class="w-full bg-card">
              <SelectValue placeholder="Choose a campaign" />
            </SelectTrigger>
            <SelectContent class="w-full">
              <SelectItem value="1">My Awesome Campaign</SelectItem>
              <SelectItem value="2">My Awesome Campaign 2</SelectItem>
            </SelectContent>
          </Select>
        </SheetContent>
      </Sheet>
    </AppRow>

    <template v-if="campaigns?.length === 0">
      <div class="text-center space-y-4">
        <NuxtImg
          src="/empty.svg"
          width="320"
          height="100%"
          class="m-0 mx-auto"
        />
        <div>
          <AppHeading :level="2">You don't have any QR Codes yet</AppHeading>
          <p class="text-muted-foreground mt-1">
            Start creating campaigns to reach your audience and track their
            engagement.
          </p>
        </div>
        <NuxtLink to="./qr-codes/new">
          <Button>Create New QR Code</Button>
        </NuxtLink>
      </div>
    </template>

    <p v-if="isLoading">Loading... (Will be replaced by a skelton later)</p>

    <DataTable
      v-if="campaigns"
      :data="campaigns"
      :columns="columns"
      :allow-import-export="false"
      :allow-search="true"
    />
  </div>
</template>
