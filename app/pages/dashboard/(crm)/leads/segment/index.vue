<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NuxtLink } from "#components";
import {
  ChevronDown,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  MoreHorizontal,
} from "lucide-vue-next";

useHead({
  title: "Segments",
});

definePageMeta({
  layout: "lead",
});

// Sample segment data
interface Segment {
  id: number;
  name: string;
  createdAt: string;
  subscribers: number;
  openRate: number;
  clickRate: number;
}

const segments = ref<Segment[]>([
  {
    id: 1,
    name: "Pedro Duarte",
    createdAt: "2025-09-23T12:00:00Z",
    subscribers: 1,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 2,
    name: "Segment A",
    createdAt: "2025-07-01T09:30:00Z",
    subscribers: 150,
    openRate: 62,
    clickRate: 25,
  },
  {
    id: 3,
    name: "Segment B",
    createdAt: "2025-08-03T15:00:00Z",
    subscribers: 200,
    openRate: 45,
    clickRate: 12,
  },
]);

// search & sort state
const searchQuery = ref("");
const sortBy = ref("Segment name");
const sortOrder = ref<"asc" | "desc">("desc"); // default: newest first

// Sorting logic
const sortedSegments = computed(() => {
  const filtered = segments.value.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const compare = (a: any, b: any) => {
    let valA: any, valB: any;

    switch (sortBy.value) {
      case "Segment name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "Subscribers":
        valA = a.subscribers;
        valB = b.subscribers;
        break;
      case "Open rate":
        valA = a.openRate;
        valB = b.openRate;
        break;
      case "Click rate":
        valA = a.clickRate;
        valB = b.clickRate;
        break;
      case "Date created":
      default:
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
    }

    if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  };

  return filtered.sort(compare);
});
</script>

<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6"
    >
      <div class="flex gap-2 w-full md:w-auto">
        <!-- Search -->
        <Input
          v-model="searchQuery"
          placeholder="Search segment"
          class="w-full md:w-64"
        />

        <!-- Sort dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="flex items-center gap-1">
              {{ sortBy }}
              <ChevronDown class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="sortBy = 'Segment name'"
              >Segment name</DropdownMenuItem
            >
            <DropdownMenuItem @click="sortBy = 'Date created'"
              >Date created</DropdownMenuItem
            >
            <DropdownMenuItem @click="sortBy = 'Subscribers'"
              >Subscribers</DropdownMenuItem
            >
            <DropdownMenuItem @click="sortBy = 'Open rate'"
              >Open rate</DropdownMenuItem
            >
            <DropdownMenuItem @click="sortBy = 'Click rate'"
              >Click rate</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Sort toggle button -->
        <Button
          variant="outline"
          @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
        >
          <ArrowUpNarrowWide v-if="sortOrder === 'asc'" class="h-4 w-4" />
          <ArrowDownWideNarrow v-else class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- Segment List -->
    <div v-if="sortedSegments.length > 0" class="space-y-4">
      <div
        v-for="segment in sortedSegments"
        :key="segment.id"
        class="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-md hover:bg-muted/50"
      >
        <!-- Left info -->
        <div class="flex flex-col gap-1">
          <span class="font-medium">{{ segment.name }}</span>
          <span class="text-xs text-muted-foreground">
            Created {{ new Date(segment.createdAt).toLocaleString() }}
          </span>
          <!-- <Button size="sm" variant="secondary" class="mt-2 w-fit">View segment</Button> -->
          <NuxtLink class="primary cursor-pointer mt-4" to="dashboard/leads/lead-details">
            View Segment</NuxtLink
          >
        </div>

        <!-- Right stats -->
        <div class="flex gap-8 mt-4 md:mt-0 text-center">
          <div class="pl-6 border-l">
            <p class="font-medium">{{ segment.subscribers }}</p>
            <p class="text-xs text-muted-foreground">Subscribers</p>
          </div>
          <div class="pl-6 border-l">
            <p class="font-medium">{{ segment.openRate }}%</p>
            <p class="text-xs text-muted-foreground">Open rate</p>
          </div>
          <div class="pl-6 border-l flex items-center gap-2">
            <div>
              <p class="font-medium">{{ segment.clickRate }}%</p>
              <p class="text-xs text-muted-foreground">Click rate</p>
            </div>
            <!-- Three dots menu -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <p class="text-muted-foreground mb-4">No segments available</p>
      <NuxtLink to="/segments/add">
        <Link>Add Segment</Link>
      </NuxtLink>
    </div>
  </div>
</template>
