<script setup lang="ts">
import { ref, computed, h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import { Button } from "@/components/ui/button";
import DataTableDropDown from "@/components/leadTool/DataTableDropDown.vue";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";

import type { LeadDetails } from "~~/server/data/leaddata";
import { leadData } from "~~/server/data/leaddata";
const showDeleteDialog = ref<boolean>(false);
const showFilters = ref(false);
const data = ref(leadData.slice());

definePageMeta({
  layout: "lead",
});

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
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
    >
      <div class="flex w-full justify-end items-center">
        <!-- Filter Button -->
        <Button variant="outline" @click="showFilters = true">Smart Filters</Button>
      </div>
    </div>

    <!-- Data Table -->
    <DataTable
      :data="filteredData"
      :columns="columns"
      :allow-import-export="false"
      
    />

    <!-- Slide-in Filter Panel -->
    <transition name="slide">
      <div v-if="showFilters" class="fixed inset-0 z-50 flex justify-end">
        <!-- Background overlay -->
        <div
          class="absolute inset-0 bg-black/40"
          @click="showFilters = false"
        >
        </div>

        <!-- Drawer panel -->
        <div
          class="relative bg-white dark:bg-neutral-900 w-full sm:w-96 h-full shadow-xl p-6 overflow-y-auto transition-transform"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            @click="showFilters = false"
          >
            <X class="w-6 h-6" />
          </button>

          <h2 class="text-xl font-semibold mb-4">Filters</h2>

          <!-- Filter form -->
          <div class="space-y-6">
            <!-- Name -->
            <div>
              <Label class="pb-1">Filter By Name</Label>
              <Input v-model="filters.name" placeholder="Eg. John Doe" />
            </div>

            <!-- Email -->
            <div>
              <Label class="pb-1">Filter By Email</Label>
              <Input
                v-model="filters.email"
                placeholder="Eg. example@gmail.com"
              />
            </div>

            <!-- Source -->
            <div>
              <Label class="pb-1">Filter By Source</Label>
              <Input v-model="filters.source" placeholder="Source Name" />
            </div>

            <!-- Emails Sent -->
            <div>
              <Label class="pb-1">Email Sent (Min/Max)</Label>
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
            <div>
              <Label class="pb-1">Open Rate % (Min/Max)</Label>
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
            <div>
              <Label class="pb-1">Click Rate % (Min/Max)</Label>
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
          </div>

          <!-- Footer buttons -->
          <div class="flex justify-between mt-6">
            <Button variant="ghost" @click="clearFilters">Clear</Button>
            <Button @click="showFilters = false">Apply</Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 🔥 Slide transition */
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-active {
  transition: transform 0.3s ease;
}
.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
