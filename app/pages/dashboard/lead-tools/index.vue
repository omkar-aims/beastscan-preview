<script setup lang="ts">
import { ref, computed, h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import { Button } from "@/components/ui/button";
import { NuxtLink } from "#components";
import DataTableDropDown from "@/components/leadTool/DataTableDropDown.vue";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// ✅ import both type and actual data
import type { LeadDetails } from "~~/server/data/leaddata";
import { leadData } from "~~/server/data/leaddata";
const showDeleteDialog = ref<boolean>(false);



const data = ref(leadData.slice());

// Filters state
type Filters = {
  name: string;
  email: string;
  source: string;
  emailsSentMin?: number;
  emailsSentMax?: number;
  openRateMin?: number;
  openRateMax?: number;
  clickRateMin?: number;
  clickRateMax?: number;
};

const filters = ref<Filters>({
  name: "",
  email: "",
  source: "",
  emailsSentMin: undefined,
  emailsSentMax: undefined,
  openRateMin: undefined,
  openRateMax: undefined,
  clickRateMin: undefined,
  clickRateMax: undefined,
});

// Number string helpers
function numberStringComputed(
  getNum: () => number | undefined,
  setNum: (n: number | undefined) => void
) {
  return computed<string>({
    get() {
      const v = getNum();
      return typeof v === "undefined" ? "" : String(v);
    },
    set(val: string) {
      if (val === "" || val === undefined) setNum(undefined);
      else {
        const n = Number(val);
        setNum(Number.isNaN(n) ? undefined : n);
      }
    },
  });
}

const emailsSentMinInput = numberStringComputed(
  () => filters.value.emailsSentMin,
  (n) => (filters.value.emailsSentMin = n)
);
const emailsSentMaxInput = numberStringComputed(
  () => filters.value.emailsSentMax,
  (n) => (filters.value.emailsSentMax = n)
);
const openRateMinInput = numberStringComputed(
  () => filters.value.openRateMin,
  (n) => (filters.value.openRateMin = n)
);
const openRateMaxInput = numberStringComputed(
  () => filters.value.openRateMax,
  (n) => (filters.value.openRateMax = n)
);
const clickRateMinInput = numberStringComputed(
  () => filters.value.clickRateMin,
  (n) => (filters.value.clickRateMin = n)
);
const clickRateMaxInput = numberStringComputed(
  () => filters.value.clickRateMax,
  (n) => (filters.value.clickRateMax = n)
);

// Filtering logic

const filteredData = computed(() => {
  return data.value.filter((row) => {
    if (
      filters.value.name &&
      !row.name.toLowerCase().includes(filters.value.name.toLowerCase())
    )
      return false;

    if (
      filters.value.email &&
      !row.email.toLowerCase().includes(filters.value.email.toLowerCase())
    )
      return false;

    if (
      filters.value.source &&
      !row.source.toLowerCase().includes(filters.value.source.toLowerCase())
    )
      return false;

    if (
      typeof filters.value.emailsSentMin !== "undefined" &&
      row.emailsSent < filters.value.emailsSentMin
    )
      return false;
    if (
      typeof filters.value.emailsSentMax !== "undefined" &&
      row.emailsSent > filters.value.emailsSentMax
    )
      return false;

    const openRateNum = parseFloat(String(row.openRate).replace("%", ""));
    if (
      typeof filters.value.openRateMin !== "undefined" &&
      openRateNum < filters.value.openRateMin
    )
      return false;
    if (
      typeof filters.value.openRateMax !== "undefined" &&
      openRateNum > filters.value.openRateMax
    )
      return false;

    const clickRateNum = parseFloat(String(row.clickRate).replace("%", ""));
    if (
      typeof filters.value.clickRateMin !== "undefined" &&
      clickRateNum < filters.value.clickRateMin
    )
      return false;
    if (
      typeof filters.value.clickRateMax !== "undefined" &&
      clickRateNum > filters.value.clickRateMax
    )
      return false;

    return true;
  });
});

const columns: ColumnDef<LeadDetails>[] = [
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
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "emailsSent", header: "Email Sent" },
  { accessorKey: "openRate", header: "Open Rate" },
  { accessorKey: "clickRate", header: "Click Rate" },
  { accessorKey: "lastActivity", header: "Last Activity" },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const leadDeatils = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropDown, {
          leadDeatils,
          onTriggerDeleteDialog: () => (showDeleteDialog.value = true),
          onDeleted: () => {
            const idx = data.value.findIndex((d) => d.id === leadDeatils.id);
            if (idx !== -1) data.value.splice(idx, 1);
          },
        })
      );
    },
  },
];

// Helpers

function clearFilters() {
  filters.value = {
    name: "",
    email: "",
    source: "",
    emailsSentMin: undefined,
    emailsSentMax: undefined,
    openRateMin: undefined,
    openRateMax: undefined,
    clickRateMin: undefined,
    clickRateMax: undefined,
  };
}
</script>

<template>
  <div>
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
    >
      <p class="text-3xl text-primary">All Lead Details</p>

      <div class="flex gap-2 w-full md:w-auto justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">Filters</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="p-4 w-96 space-y-3">
            <!-- Text filters -->
            <div class="flex flex-col gap-1">
              <Label>Filer By Name</Label>
              <Input v-model="filters.name" placeholder="Eg. John Doe" />
            </div>
            <div class="flex flex-col gap-1">
              <Label>Filter By Email</Label>
              <Input
                v-model="filters.email"
                placeholder="Eg. example@gmail.com"
              />
            </div>
            <div class="flex flex-col gap-1">
              <Label>Filter By Source</Label>
              <Input v-model="filters.source" placeholder="Source Name" />
            </div>
            <!-- Emails sent (min/max) -->
            <div class="flex flex-col gap-1">
              <div>
                <Label>Email Sent(Min/Max)</Label>
              </div>
              <div class="flex gap-2">
                <Input
                  v-model="emailsSentMinInput"
                  type="number"
                  placeholder="Min"
                />
                <Input
                  v-model="emailsSentMaxInput"
                  type="number"
                  placeholder="Max"
                />
              </div>
            </div>
            <!-- Open Rate -->
            <div class="flex flex-col gap-1">
              <div>
                <Label>Open Rate % (Min/Max)</Label>
              </div>
              <div class="flex gap-2">
                <Input
                  v-model="openRateMinInput"
                  type="number"
                  placeholder="Min"
                />
                <Input
                  v-model="openRateMaxInput"
                  type="number"
                  placeholder="Max"
                />
              </div>
            </div>
            <!-- Click Rate -->
            <div class="flex flex-col gap-1">
              <div><Label>Click Rate % (Min/Max)</Label></div>
              <div class="flex gap-2">
                <Input
                  v-model="clickRateMinInput"
                  type="number"
                  placeholder="Min"
                />
                <Input
                  v-model="clickRateMaxInput"
                  type="number"
                  placeholder="Max"
                />
              </div>
            </div>

            <div class="flex justify-between mt-2">
              <Button variant="ghost" @click="clearFilters">Clear</Button>
              <Button>Apply</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <NuxtLink to="/dashboard/lead-tools/segments"
          ><Button>Lead Segment</Button></NuxtLink
        >
        <NuxtLink to="/dashboard/lead-tools/lead-magnet-builder"
          ><Button>Lead Magnet</Button></NuxtLink
        >
      </div>
    </div>

    <DataTable :data="filteredData" :columns="columns" :allow-import-export="false" />
  </div>
</template>