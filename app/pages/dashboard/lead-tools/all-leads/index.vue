<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ref, reactive, computed } from "vue";
import { useHead } from "#imports";

useHead({
  title: "Leads Overview",
});

const tableData = [
  {
    id: 1,
    name: "Anna Keller",
    email: "anna1@edli.com",
    source: "Summer Giveaway",
    tags: ["Giveaway", "Website"],
    emailsSent: 6,
    openRate: "45%",
    clickRate: "12%",
    lastActivity: "2024-06-20",
    button: "View",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@edli.com",
    source: "QR Campaign",
    tags: ["QR", "Burger"],
    emailsSent: 3,
    openRate: "60%",
    clickRate: "20%",
    lastActivity: "2024-06-22",
    button: "View",
  },
];

const tagColors: Record<string, string> = {
  Giveaway: "bg-cyan-400 text-white",
  Website: "bg-gray-600 text-white",
  QR: "bg-yellow-400 text-black",
  Burger: "bg-green-600 text-white",
  New: "bg-blue-500 text-white",
  Interested: "bg-purple-500 text-white",
};

type RangeNum = { min?: number; max?: number };
type Filters = {
  search: string;
  source: string;
  tags: string[];
  emailsSent: RangeNum;
  openRate: RangeNum;
  clickRate: RangeNum;
  dateRange: { start?: string; end?: string }; // ISO yyyy-mm-dd strings (from <Input type="date">)
  predefined: "" | "last7" | "last30" | "last90" | "inactive30";
};

const filters = reactive<Filters>({
  search: "",
  source: "",
  tags: [],
  emailsSent: { min: undefined, max: undefined },
  openRate: { min: undefined, max: undefined },
  clickRate: { min: undefined, max: undefined },
  dateRange: { start: undefined, end: undefined },
  predefined: "",
});

const appliedFilters = ref<Filters>({ ...filters });

const uniqueSources = computed<string[]>(() => {
  return Array.from(new Set(tableData.map((d) => d.source)));
});

const filteredData = computed(() => {
  return tableData.filter((person) => {
    // Search (name/email/domain)
    const domain: string = person.email.split("@")[1] ?? "";
    const q = appliedFilters.value.search?.toLowerCase() ?? "";
    if (
      q &&
      !person.name.toLowerCase().includes(q) &&
      !person.email.toLowerCase().includes(q) &&
      !domain.toLowerCase().includes(q)
    ) {
      return false;
    }

    // Source
    if (
      appliedFilters.value.source &&
      person.source !== appliedFilters.value.source
    ) {
      return false;
    }

    // Tags (all must be present)
    if (
      appliedFilters.value.tags.length &&
      !appliedFilters.value.tags.every((t) => person.tags.includes(t))
    ) {
      return false;
    }

    // EmailsSent range
    const es = appliedFilters.value.emailsSent;
    if (es.min !== undefined && person.emailsSent < es.min) return false;
    if (es.max !== undefined && person.emailsSent > es.max) return false;

    // OpenRate range (strip %)
    const open = parseInt(person.openRate);
    const or = appliedFilters.value.openRate;
    if (or.min !== undefined && open < or.min) return false;
    if (or.max !== undefined && open > or.max) return false;

    // ClickRate range (strip %)
    const click = parseInt(person.clickRate);
    const cr = appliedFilters.value.clickRate;
    if (cr.min !== undefined && click < cr.min) return false;
    if (cr.max !== undefined && click > cr.max) return false;

    // Date range (from yyyy-mm-dd)
    if (
      appliedFilters.value.dateRange.start ||
      appliedFilters.value.dateRange.end
    ) {
      const activityDate = new Date(person.lastActivity);
      if (appliedFilters.value.dateRange.start) {
        const start = new Date(appliedFilters.value.dateRange.start);
        if (activityDate < start) return false;
      }
      if (appliedFilters.value.dateRange.end) {
        // include end day fully
        const end = new Date(appliedFilters.value.dateRange.end);
        end.setHours(23, 59, 59, 999);
        if (activityDate > end) return false;
      }
    }

    // Predefined activity windows
    if (appliedFilters.value.predefined) {
      const today = new Date();
      const activityDate = new Date(person.lastActivity);
      const diffDays =
        (today.getTime() - activityDate.getTime()) / (1000 * 3600 * 24);

      if (appliedFilters.value.predefined === "last7" && diffDays > 7)
        return false;
      if (appliedFilters.value.predefined === "last30" && diffDays > 30)
        return false;
      if (appliedFilters.value.predefined === "last90" && diffDays > 90)
        return false;
      if (appliedFilters.value.predefined === "inactive30" && diffDays <= 30)
        return false;
    }

    return true;
  });
});

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

function applyFilters() {
  appliedFilters.value = deepClone(filters);
  openFilter.value = false;
}

function clearFilters() {
  Object.assign(filters, {
    search: "",
    source: "",
    tags: [],
    emailsSent: { min: undefined, max: undefined },
    openRate: { min: undefined, max: undefined },
    clickRate: { min: undefined, max: undefined },
    dateRange: { start: undefined, end: undefined },
    predefined: "" as Filters["predefined"],
  });
  appliedFilters.value = deepClone(filters);
}

const openFilter = ref(false); // control popover open/close (Nuxt SSR-safe)
</script>

<template>
  <div class="space-y-6 w-full">
    <h1 class="text-2xl">Leads Overview</h1>
    <div class="mt-4 flex items-center justify-between">
      <div class="flex flex-row items-center justify-center gap-4">
        <div>
          <NuxtLink to="/dashboard/lead-tools/all-leads/new-lead">
            <Button
              class="cursor-pointer border-2 rounded-lg px-4 py-2 hover:border-2 hover:border-blue-500"
            >
              Import New Leads
            </Button>
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="/dashboard/lead-tools/all-leads/clean-up">
            <Button
              class="cursor-pointer border-2 rounded-lg px-4 py-2 hover:border-blue-500"
            >
              Cleanup Inactives
            </Button>
          </NuxtLink>
        </div>
      </div>
      <div>
        <!--  Filter Button + Popover -->
        <ClientOnly>
          <Popover v-model:open="openFilter">
            <PopoverTrigger as-child>
              <Button variant="outline" class="bg-blue-500"
                >Filter All Leads</Button
              >
            </PopoverTrigger>
            <PopoverContent
              class="w-96 max-h-[80vh] overflow-y-auto p-4 p-4 space-y-4"
            >
              <!-- Search -->
              <div>
                <label class="text-sm font-medium">Search</label>
                <Input
                  v-model="filters.search"
                  placeholder="Name, email, or domain"
                />
              </div>

              <!-- Source -->
              <div>
                <label class="text-sm font-medium">Source</label>
                <Select v-model="filters.source">
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="(src, idx) in uniqueSources"
                      :key="idx"
                      :value="src"
                    >
                      {{ src }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Tags (checkbox list) -->
              <div>
                <label class="text-sm font-medium">Tags</label>
                <div class="flex flex-col gap-2">
                  <div
                    v-for="(cls, tag) in tagColors"
                    :key="tag"
                    class="flex items-center gap-2"
                  >
                    <Checkbox
                      :id="String(tag)"
                      :checked="filters.tags.includes(String(tag))"
                      @update:checked="(val: boolean) => {
                      if (val) {
                        if (!filters.tags.includes(String(tag))) filters.tags.push(String(tag))
                      } else {
                        filters.tags = filters.tags.filter((t) => t !== String(tag))
                      }
                    }"
                    />
                    <label :for="String(tag)" class="text-sm">{{ tag }}</label>
                  </div>
                </div>
              </div>

              <!-- Emails Sent Range -->
              <div>
                <label class="text-sm font-medium"
                  >Emails Sent (min / max)</label
                >
                <div class="flex gap-2">
                  <Input
                    type="number"
                    :model-value="filters.emailsSent.min"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.emailsSent.min = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    :model-value="filters.emailsSent.max"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.emailsSent.max = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Max"
                  />
                </div>
              </div>

              <!-- Open Rate Range -->
              <div>
                <label class="text-sm font-medium"
                  >Open Rate % (min / max)</label
                >
                <div class="flex gap-2">
                  <Input
                    type="number"
                    :model-value="filters.openRate.min"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.openRate.min = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    :model-value="filters.openRate.max"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.openRate.max = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Max"
                  />
                </div>
              </div>

              <!-- Click Rate Range -->
              <div>
                <label class="text-sm font-medium"
                  >Click Rate % (min / max)</label
                >
                <div class="flex gap-2">
                  <Input
                    type="number"
                    :model-value="filters.clickRate.min"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.clickRate.min = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Min"
                  />
                  <Input
                    type="number"
                    :model-value="filters.clickRate.max"
                    @update:model-value="(v: string | number | undefined) => {
                    const n = typeof v === 'string' ? Number(v) : v;
                    filters.clickRate.max = (n === undefined || Number.isNaN(n as number)) ? undefined : (n as number);
                  }"
                    placeholder="Max"
                  />
                </div>
              </div>

              <!-- Date Range (shadcn Input as date) -->
              <div>
                <label class="text-sm font-medium"
                  >Last Activity (Date Range)</label
                >
                <div class="flex gap-2">
                  <Input
                    type="date"
                    v-model="filters.dateRange.start"
                    placeholder="Start date"
                  />
                  <Input
                    type="date"
                    v-model="filters.dateRange.end"
                    placeholder="End date"
                  />
                </div>
              </div>

              <!-- Predefined Activity -->
              <div>
                <label class="text-sm font-medium">Activity Options</label>
                <RadioGroup
                  v-model="filters.predefined"
                  class="flex flex-col space-y-1"
                >
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem value="last7" id="last7" />
                    <label for="last7" class="text-sm"
                      >Active last 7 days</label
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem value="last30" id="last30" />
                    <label for="last30" class="text-sm"
                      >Active last 30 days</label
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem value="last90" id="last90" />
                    <label for="last90" class="text-sm"
                      >Active last 90 days</label
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem value="inactive30" id="inactive30" />
                    <label for="inactive30" class="text-sm"
                      >Inactive 30+ days</label
                    >
                  </div>
                </RadioGroup>
              </div>

              <!-- Actions -->
              <div class="flex justify-between pt-2">
                <Button variant="secondary" @click="clearFilters">Clear</Button>
                <Button @click="applyFilters">Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </ClientOnly>
      </div>
      
    </div>

    <!-- Table -->
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Email Sent</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead>Click Rate</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(person, index) in filteredData" :key="index">
            <TableCell>{{ person.name }}</TableCell>
            <TableCell>{{ person.email }}</TableCell>
            <TableCell>{{ person.source }}</TableCell>
            <TableCell>
              <div class="flex gap-2">
                <span
                  v-for="(tag, i) in person.tags"
                  :key="i"
                  class="px-2 py-1 text-xs rounded"
                  :class="tagColors[tag] || 'bg-gray-200 text-black'"
                >
                  {{ tag }}
                </span>
              </div>
            </TableCell>
            <TableCell>{{ person.emailsSent }}</TableCell>
            <TableCell>{{ person.openRate }}</TableCell>
            <TableCell>{{ person.clickRate }}</TableCell>
            <TableCell>{{ person.lastActivity }}</TableCell>
            <TableCell>
              <NuxtLink to="/dashboard/lead-tools/all-leads/lead-details">
                <button
                  class="px-3 py-1 rounded bg-primary text-white cursor-pointer transition border-[2px] border-transparent hover:border-blue-500"
                >
                  {{ person.button }}
                </button>
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Bottom Buttons -->
  </div>
</template>
