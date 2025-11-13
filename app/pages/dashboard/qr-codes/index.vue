<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import { Plus } from "lucide-vue-next";
import type { Campaign } from "~/types/";
import type { ColumnDef } from "@tanstack/vue-table";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import DataTableDropDown from "~/components/DataTableDropDown.vue";
import { NuxtImg } from "#components";

const { data: campaigns, isLoading } = useCampaigns();

const columns: ColumnDef<Campaign>[] = [
  // ✅ Selection column
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

  // ✅ QR Code + Stats + Edit QR button
  {
    id: "qr",
    header: "QR Code",
    cell: ({ row }) => {
      const campaign = row.original;
      const qrSrc =
        campaign.attributes.qr_url ||
        "https://qrapi.beastscan.com/?size=300&margin=10&renderer=pattern&format=svg&text=https%3A%2F%2Fqrapi.beastscan.com&dots_type=hex&dots_color=%231e40af&corners_square_type=rounded&corners_square_color=%231e40af";

      return h("div", { class: "flex flex-col items-center space-y-3" }, [
        // QR Image
        h(NuxtImg, {
          src: qrSrc,
          width: 100,
          height: 100,
          class: "rounded border border-muted p-1 bg-white shadow-sm",
        }),

        // Edit button
        h(
          "button",
          {
            class:
              "text-xs text-primary hover:underline flex items-center gap-1",
            onClick: () => {
              // e.g., open modal or navigate
              navigateTo(`/dashboard/campaigns/${campaign.id}/edit-qr`);
            },
          },
          [h("i", { class: "i-lucide-edit-3 w-3 h-3" }), "Edit QR Code"]
        ),

        // Stats
        h(
          "div",
          { class: "text-xs text-muted-foreground space-y-1 text-center" },
          [
            h("p", `Total Scans: ${campaign.scan ?? 0}`),
            h("p", `Unique Visitors: ${campaign.unique_visits ?? 0}`),
            h("p", `CTR: ${campaign.click_rate ?? "0%"} `),
          ]
        ),
      ]);
    },
  },

  // ✅ Title / URL
  {
    header: "Title / URL",
    cell: ({ row }) => {
      const data = row.original;
      return h("div", { class: "flex flex-col" }, [
        h("p", { class: "font-medium text-foreground" }, data.attributes.title),
        h(
          "p",
          { class: "text-sm text-muted-foreground truncate max-w-[180px]" },
          data.attributes.slug
        ),
      ]);
    },
  },

  // ✅ Created date
  {
    header: "Created At",
    cell: ({ row }) => {
      const date =
        row.original.attributes.published_at || new Date().toISOString();
      const formatted = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return h("p", { class: "text-sm text-muted-foreground" }, formatted);
    },
  },

  // ✅ Scans badge (color-coded)
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

      return h(
        "span",
        {
          class: `px-2 py-0.5 rounded-full text-xs font-medium ${color}`,
        },
        `${scans} scans`
      );
    },
  },

  // ✅ Actions dropdown + quick buttons
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original;
      return h("div", { class: "flex items-center gap-2" }, [
        // Quick actions
        h(
          "button",
          {
            class:
              "p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition",
            onClick: () => navigateTo(`/dashboard/campaigns/${campaign.id}`),
          },
          [h("i", { class: "i-lucide-bar-chart-3 w-4 h-4" })]
        ),
        h(
          "button",
          {
            class:
              "p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition",
            onClick: () =>
              navigateTo(`/dashboard/campaigns/${campaign.id}/edit`),
          },
          [h("i", { class: "i-lucide-edit w-4 h-4" })]
        ),
        h(
          "button",
          {
            class:
              "p-1 rounded hover:bg-muted text-destructive hover:text-destructive-foreground transition",
            onClick: () => {
              // Confirm deletion logic
              if (confirm("Delete this campaign?")) {
                // call API or mutation
              }
            },
          },
          [h("i", { class: "i-lucide-trash-2 w-4 h-4" })]
        ),

        // Existing dropdown (if needed)
        h(DataTableDropDown, { device: campaign }),
      ]);
    },
  },
];

const showCreateModal = ref<boolean>(false);
</script>

<template>
  <div class="space-y-4">
    <AppRow direction="horizontal" class="justify-between items-center">
      <AppHeading :level="3">QR Codes</AppHeading>
      <Button class="flex items-center gap-2" @click="showCreateModal = true">
        <Plus />
        <span>Create New</span>
      </Button>
      <QRCodeBuilder
        v-if="showCreateModal"
        v-motion-pop
        @on-close="showCreateModal = false"
      />
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
