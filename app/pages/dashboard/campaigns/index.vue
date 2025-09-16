<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import type { Campaign } from "~/types/campaign";

import { useCampaigns } from "~/composables/campaign/useCampaigns";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import QRCodeCanvas from "~/components/QRCodeCanvas.vue";
import { CampaignDataTableDropDown } from "#components";
import Badge from "~/components/ui/badge/Badge.vue";
const { data: campaigns } = await useCampaigns();

const showDeleteDialog = ref<boolean>(false);

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
    header: "QR Code",
    accessorKey: "qrOption",
    cell: (props) =>
      h(QRCodeCanvas, {
        options: { ...props.getValue(), width: 80, height: 80 },
      }),
  },

  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Type",

    accessorKey: "type",
    cell: (props) => h("span", { class: "uppercase" }, props.getValue()),
  },
  {
    header: "Mode",
    cell: () => h(Badge, { variant: "outline" }, "STATIC"),
  },
  {
    header: "Scans",
    cell: () => 12,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: (props) =>
      h(
        "span",
        Intl.DateTimeFormat("en-us").format(new Date(props.getValue()))
      ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original;

      return h(
        "div",
        { class: "relative" },
        h(CampaignDataTableDropDown, {
          campaign,
          onTriggerDeleteDialog: () => (showDeleteDialog.value = true),
        })
      );
    },
  },
];
</script>

<template>
  <div class="space-y-4">
    <template v-if="campaigns?.length === 0">
      <div class="text-center space-y-4">
        <NuxtImg
          src="/empty.svg"
          width="320"
          height="100%"
          class="m-0 mx-auto"
        />
        <div>
          <AppHeading :level="2">You don't have any campaigns yet</AppHeading>
          <p class="text-muted-foreground mt-1">
            Start creating campaigns to reach your audience and track their
            engagement.
          </p>
        </div>
        <NuxtLink to="./campaigns/new">
          <Button>Create New Campaign</Button>
        </NuxtLink>
      </div>
    </template>
    <template v-if="campaigns && campaigns?.length > 0">
      <div>
        <AppHeading :level="3">Your Campaigns</AppHeading>
        <DataTable
          :data="campaigns"
          :columns="columns"
          :allow-import-export="false"
        />
      </div>
    </template>
  </div>
</template>
