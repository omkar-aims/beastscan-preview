<script setup lang="ts">
import { ref, computed, h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
import { Button } from "@/components/ui/button";
import { NuxtLink } from "#components";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const data = [
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    source: "Website Form",
    tags: ["Demo Request", "High-Value"],
    emailsSent: 4,
    openRate: "62%",
    clickRate: "25%",
    lastActivity: "2025-09-08",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    source: "LinkedIn Outreach",
    tags: ["Enterprise", "Engaged", "new"],
    emailsSent: 8,
    openRate: "55%",
    clickRate: "18%",
    lastActivity: "2025-09-05",
  },

  {
    name: "Bruce Wayne",
    email: "bruce.wayne@example.com",
    source: "Website Form",
    tags: ["High-Value", "Demo Request", "Enterprise"],
    emailsSent: 5,
    openRate: "75%",
    clickRate: "30%",
    lastActivity: "2025-09-10",
  },
  {
    name: "Clark Kent",
    email: "clark.kent@example.com",
    source: "Referral",
    tags: ["Warm Lead", "SMB", "Urgent"],
    emailsSent: 2,
    openRate: "92%",
    clickRate: "65%",
    lastActivity: "2025-09-09",
  },
  {
    name: "Barry Allen",
    email: "barry.allen@example.com",
    source: "Webinar",
    tags: ["Engaged", "Follow-Up", "Marketing"],
    emailsSent: 7,
    openRate: "48%",
    clickRate: "15%",
    lastActivity: "2025-09-02",
  },
  {
    name: "Arthur Curry",
    email: "arthur.curry@example.com",
    source: "Trade Show",
    tags: ["In-Person", "Logistics", "Follow-Up"],
    emailsSent: 3,
    openRate: "65%",
    clickRate: "22%",
    lastActivity: "2025-08-28",
  },
  {
    name: "Hal Jordan",
    email: "hal.jordan@example.com",
    source: "Cold Email",
    tags: ["Prospect", "No Response", "Aviation"],
    emailsSent: 4,
    openRate: "15%",
    clickRate: "2%",
    lastActivity: "2025-08-15",
  },
  {
    name: "J'onn J'onzz",
    email: "jonn.jonzz@example.com",
    source: "Organic Search",
    tags: ["Blog Reader", "Content Download", "Security"],
    emailsSent: 11,
    openRate: "35%",
    clickRate: "8%",
    lastActivity: "2025-09-06",
  },
  {
    name: "Selina Kyle",
    email: "selina.kyle@example.com",
    source: "Social Media",
    tags: ["Instagram", "Influencer", "Luxury"],
    emailsSent: 6,
    openRate: "58%",
    clickRate: "21%",
    lastActivity: "2025-09-11",
  },
  {
    name: "Oliver Queen",
    email: "oliver.queen@example.com",
    source: "Google Ads",
    tags: ["PPC", "High-Value", "Finance"],
    emailsSent: 9,
    openRate: "41%",
    clickRate: "11%",
    lastActivity: "2025-08-31",
  },
  {
    name: "Dinah Lance",
    email: "dinah.lance@example.com",
    source: "Newsletter",
    tags: ["Subscriber", "Engaged", "Events"],
    emailsSent: 15,
    openRate: "29%",
    clickRate: "7%",
    lastActivity: "2025-09-08",
  },
  {
    name: "Helena Bertinelli",
    email: "helena.bertinelli@example.com",
    source: "LinkedIn Outreach",
    tags: ["Decision Maker", "Follow-Up", "Enterprise"],
    emailsSent: 3,
    openRate: "62%",
    clickRate: "19%",
    lastActivity: "2025-09-05",
  },
  {
    name: "Victor Stone",
    email: "victor.stone@example.com",
    source: "Website Form",
    tags: ["Tech", "Demo Request", "IT"],
    emailsSent: 1,
    openRate: "88%",
    clickRate: "45%",
    lastActivity: "2025-09-10",
  },
  {
    name: "Kara Zor-El",
    email: "kara.zor-el@example.com",
    source: "Content Syndication",
    tags: ["Media", "Ebook", "Top-Funnel"],
    emailsSent: 5,
    openRate: "33%",
    clickRate: "9%",
    lastActivity: "2025-08-25",
  },
  {
    name: "Zatanna Zatara",
    email: "zatanna.zatara@example.com",
    source: "Trade Show",
    tags: ["Entertainment", "In-Person", "VIP"],
    emailsSent: 2,
    openRate: "78%",
    clickRate: "34%",
    lastActivity: "2025-09-01",
  },
  {
    name: "John Constantine",
    email: "john.constantine@example.com",
    source: "Referral",
    tags: ["Consulting", "Warm Lead", "Expert"],
    emailsSent: 4,
    openRate: "85%",
    clickRate: "55%",
    lastActivity: "2025-09-09",
  },
  {
    name: "Shayera Hol",
    email: "shayera.hol@example.com",
    source: "LinkedIn Outreach",
    tags: ["Aerospace", "Prospect", "International"],
    emailsSent: 6,
    openRate: "45%",
    clickRate: "10%",
    lastActivity: "2025-08-29",
  },
  {
    name: "Carter Hall",
    email: "carter.hall@example.com",
    source: "Organic Search",
    tags: ["Research", "Blog Reader", "History"],
    emailsSent: 1,
    openRate: "25%",
    clickRate: "4%",
    lastActivity: "2025-07-18",
  },
  {
    name: "Barbara Gordon",
    email: "barbara.gordon@example.com",
    source: "Webinar",
    tags: ["Cybersecurity", "Engaged", "Q&A"],
    emailsSent: 8,
    openRate: "68%",
    clickRate: "28%",
    lastActivity: "2025-09-03",
  },
  {
    name: "Dick Grayson",
    email: "dick.grayson@example.com",
    source: "Social Media",
    tags: ["Community", "Brand Ambassador", "Events"],
    emailsSent: 12,
    openRate: "51%",
    clickRate: "16%",
    lastActivity: "2025-09-11",
  },
  {
    name: "Jason Todd",
    email: "jason.todd@example.com",
    source: "Cold Email",
    tags: ["Security", "At-Risk", "Re-engagement"],
    emailsSent: 5,
    openRate: "10%",
    clickRate: "1%",
    lastActivity: "2025-08-05",
  },
  {
    name: "Tim Drake",
    email: "tim.drake@example.com",
    source: "Website Form",
    tags: ["Tech", "High-Value", "Beta Tester"],
    emailsSent: 10,
    openRate: "72%",
    clickRate: "33%",
    lastActivity: "2025-09-07",
  },
];


// Compute unique tags
const uniqueTags = computed(() => {
  const allTags = data.flatMap((user) => user.tags);
  return [...new Set(allTags)];
});

const tagColors: Record<string, string> = {};
const colors = ["bg-gray-500"];
function getTagColor(tag: string): string {
  if (!tagColors[tag]) {
    const index = Object.keys(tagColors).length % colors.length;
    tagColors[tag] = colors[index];
  }
  return tagColors[tag]!; 
}

/* -------------------------
   Filters state (use undefined for optional)
   ------------------------- */
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
  tags: string[];
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
  tags: [],
});

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

/* -------------------------
   Filtering logic
   ------------------------- */
const filteredData = computed(() => {
  return data.filter((row) => {
    // Name (contains)
    if (
      filters.value.name &&
      !row.name.toLowerCase().includes(filters.value.name.toLowerCase())
    )
      return false;

    // Email
    if (
      filters.value.email &&
      !row.email.toLowerCase().includes(filters.value.email.toLowerCase())
    )
      return false;

    // Source
    if (
      filters.value.source &&
      !row.source.toLowerCase().includes(filters.value.source.toLowerCase())
    )
      return false;

    // Emails Sent
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

    // Open Rate (strip % -> number)
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

    // Click Rate
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

    // Tags (match any selected tag)
    if (filters.value.tags.length > 0) {
      if (!filters.value.tags.some((tag) => (row.tags || []).includes(tag)))
        return false;
    }

    return true;
  });
});

/* -------------------------
   Table columns
   ------------------------- */
const columns: ColumnDef<any>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => row.getValue("source"),
  },
  {
    accessorKey: "emailsSent",
    header: "Email Sent",
    cell: ({ row }) => row.getValue("emailsSent"),
  },
  {
    accessorKey: "openRate",
    header: "Open Rate",
    cell: ({ row }) => row.getValue("openRate") || "-",
  },
  {
    accessorKey: "clickRate",
    header: "Click Rate",
    cell: ({ row }) => row.getValue("clickRate") || "-",
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => row.getValue("lastActivity") || "-",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags") || [];
      return h(
        "div",
        { class: "flex gap-2 flex-wrap" },
        tags.map((tag) =>
          h(
            Badge,
            { class: `${getTagColor(tag)} text-xs px-2 py-1 rounded-full` },
            () => tag
          )
        )
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () =>
      h(NuxtLink, { to: "/dashboard/lead-tools/all-leads/lead-details" }, () =>
        h(Button, { variant: "default" }, { default: () => "View" })
      ),
  },
];

/* -------------------------
   Helpers
   ------------------------- */
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
    tags: [],
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
                  type="number"
                  v-model="emailsSentMinInput"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  v-model="emailsSentMaxInput"
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
                  type="number"
                  v-model="openRateMinInput"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  v-model="openRateMaxInput"
                  placeholder="Max"
                />
              </div>
            </div>

            <!-- Click Rate -->
            <div class="flex flex-col gap-1">
              <div><Label>Click Rate % (Min/Max)</Label></div>
              <div class="flex gap-2">
                <Input
                  type="number"
                  v-model="clickRateMinInput"
                  placeholder="Min"
                />
                <Input
                  type="number"
                  v-model="clickRateMaxInput"
                  placeholder="Max"
                />
              </div>
            </div>

            <!-- Tags -->
            <p class="text-sm font-medium m-0">Tags</p>
            <Select v-model="filters.tags" multiple>
              <SelectTrigger >
                <!-- Always show placeholder instead of selected values -->
                <span class="text-muted-foreground">Select tags</span>
              </SelectTrigger>

              <SelectContent class="max-h-80 overflow-y-auto">
                <SelectItem v-for="tag in uniqueTags" :key="tag" :value="tag" >
                  {{ tag }}
                </SelectItem>
              </SelectContent>
            </Select>

            <!-- Example: show selected tags separately as badges -->
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tag in filters.tags"
                :key="tag"
                class="px-2 py-1 bg-gray-500 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex justify-between mt-2">
              <Button variant="ghost" @click="clearFilters">Clear</Button>
              <Button>Apply</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <NuxtLink to="/dashboard/lead-tools/segments" ><Button>Lead Segment</Button></NuxtLink>
        <NuxtLink><Button>Lead Magnet</Button></NuxtLink>

        <!-- Filters dropdown using ShadCN components -->
      </div>
    </div>

    <DataTable :data="filteredData" :columns="columns" />
  </div>
</template>
