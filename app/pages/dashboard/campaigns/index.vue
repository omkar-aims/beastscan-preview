<script setup lang="ts">
import { Checkbox, DataTableDropDown, NuxtLink } from "#components";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowRight, ShoppingBag, Sparkle } from "lucide-vue-next";

const campaigns = [
  {
    type: "Digital Business Card",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d25",
    attributes: {
      title: "Demo Campaign",
      slug: "demo-campaign",
      short_code: "c-zPa95a",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  },
  {
    type: "Landing Page",
    id: "0199f1ce-aa21-7b22-904b-b888eaa36f42",
    attributes: {
      title: "Summer Deals",
      slug: "summer-deals",
      short_code: "c-aT9p2x",
      status: "published",
      published_at: "2025-06-15T10:00:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  },
  {
    type: "Product Page",
    id: "0199f1cf-bb45-7c11-902c-c999ebb47e63",
    attributes: {
      title: "Winter Giveaway",
      slug: "winter-giveaway",
      short_code: "c-wG8n1q",
      status: "archived",
      published_at: "2024-12-10T15:30:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  },
];

const columns: ColumnDef<(typeof campaigns)[0]>[] = [
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
      const type = row.original.type;

      return h(
        "div",
        {
          class: "flex items-center justify-center w-8 h-8 rounded-full",
          style: {
            background: "linear-gradient(to top right, #fb923c, #ef4444)",
          },
        },
        [
          h(ShoppingBag, {
            class: "w-4 h-4 text-white",
          }),
        ]
      );
    },
  },

  {
    header: "Title / URL",
    cell: ({ row }) => {
      const { title, short_code } = row.original.attributes;
      const url = `https://example.com/${short_code}`;

      return h("div", { class: "flex flex-col" }, [
        h("p", { class: "font-medium text-foreground" }, title),
        h(
          "a",
          {
            href: url,
            target: "_blank",
            class: "text-sm text-muted-foreground hover:underline",
          },
          url
        ),
      ]);
    },
  },

  {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.attributes.status;
      const color =
        status === "published"
          ? "text-green-600 bg-green-50"
          : status === "draft"
          ? "text-yellow-700 bg-yellow-50"
          : "text-gray-600 bg-gray-50";

      return h(
        "span",
        {
          class: `px-2 py-1 rounded-full text-xs font-medium ${color}`,
        },
        status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },

  {
    header: "Published At",
    cell: ({ row }) => {
      const date = row.original.attributes.published_at;
      if (!date)
        return h(
          "p",
          { class: "text-sm text-muted-foreground italic" },
          "Not published"
        );

      const formatted = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return h("p", { class: "text-sm text-muted-foreground" }, formatted);
    },
  },

  {
    header: "Project ID",
    cell: ({ row }) =>
      h(
        "p",
        { class: "text-xs text-muted-foreground truncate w-[180px]" },
        row.original.attributes.project_id
      ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      h(
        NuxtLink,
        {
          class:
            "relative flex gap-2 items-center text-primary hover:underline",
          href: "/dashboard/campaigns",
        },
        [h("span", null, "View Detail"), h(ArrowRight, { class: "w-4 h-4" })]
      ),
  },
];
</script>

<template>
  <div class="space-y-4">
    <AppRow direction="horizontal" class="justify-between items-center">
      <AppHeading :level="3">Campaigns</AppHeading>
      <NuxtLink href="/dashboard/campaigns/new">
        <Button class="flex items-center gap-2">
          <Sparkle />
          <span>Launch New Campaign</span>
        </Button>
      </NuxtLink>
    </AppRow>

    <DataTable
      v-if="campaigns"
      :data="campaigns"
      :columns="columns"
      :allow-import-export="false"
      :allow-search="true"
    />
  </div>
</template>
