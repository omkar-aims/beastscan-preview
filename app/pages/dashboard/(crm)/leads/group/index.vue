<script setup lang="ts">
import { NuxtLink } from "#components";
import {
  ChevronDown,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
} from "lucide-vue-next";

// ✅ import your reusable dropdown
import GroupTableDropDown from "@/components/leadTool/GroupTableDropDown.vue";

useHead({
  title: "Groups",
});

definePageMeta({
  layout: "lead",
});

// Sample group data
interface Group {
  id: number;
  name: string;
  createdAt: string;
  subscribers: number;
  openRate: number;
  clickRate: number;
}

const groups = ref<Group[]>([
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
    name: "Group A",
    createdAt: "2025-07-01T09:30:00Z",
    subscribers: 150,
    openRate: 62,
    clickRate: 25,
  },
  {
    id: 3,
    name: "Group B",
    createdAt: "2025-08-03T15:00:00Z",
    subscribers: 200,
    openRate: 45,
    clickRate: 12,
  },
]);

const layout = ref<"grid" | "list">("grid");

// search & sort state
const searchQuery = ref("");
const sortBy = ref("Group name");
const sortOrder = ref<"asc" | "desc">("desc");

// Sorting logic
const sortedGruops = computed(() => {
  const filtered = groups.value.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const compare = (a: any, b: any) => {
    let valA: any, valB: any;

    switch (sortBy.value) {
      case "Group name":
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

const emptyResource = {
  title: "You don't have any Group yet",
  description:
    "Create your first group to organize and manage your contacts effectively. Groups help you segment your audience for targeted communication and better engagement.",

  image: {
    src: "/vcard.svg",
    alt: "Illustration of a Grouping",
  },

  link: {
    label: "Create New Group",
    url: "/dashboard/",
  },

  items: [
    {
      strong: "Personalized Contact:",
      normal: " Add your name, title, phone, email, and social links.",
    },
    {
      strong: "Share Anywhere:",
      normal: " Send your vCard via QR code, link, or email.",
    },
    {
      strong: "Track Engagement:",
      normal: " See who viewed or saved your Group for better follow-ups.",
    },
  ],
};

</script>

<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
    >
      <div class="flex gap-2 w-full md:w-auto">
        <!-- Search -->
        <Input
          v-model="searchQuery"
          placeholder="Search groups..."
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
          <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem @click="sortBy = 'Group name'"
              >Group name</DropdownMenuItem
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

        <!-- Sort toggle -->
        <Button
          variant="outline"
          size="icon"
          @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
        >
          <ArrowUpNarrowWide v-if="sortOrder === 'asc'" class="h-4 w-4" />
          <ArrowDownWideNarrow v-else class="h-4 w-4" />
        </Button>
      </div>
      <div>
        <Tabs v-model="layout" class="self-end sm:self-auto">
          <TabsList>
            <TabsTrigger value="grid">
              <Icon name="lucide:layout-grid" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <Icon name="lucide:layout-list" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>

    <!-- Group List -->
    <div v-if="sortedGruops.length > 0" class="space-y-3">
      <div
        v-if="layout === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
      >
        <div
          v-for="group in sortedGruops"
          :key="group.id"
          class="border rounded-xl p-5 flex flex-col justify-between"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex flex-col gap-1">
              <h3 class="font-medium text-base">
                {{ group.name }}
              </h3>
              <p class="text-sm text-muted-foreground">
                Created {{ new Date(group.createdAt).toLocaleDateString() }}
              </p>
            </div>

            <!-- Dropdown -->
            <GroupTableDropDown
              :leadDeatils="group"
              @deleted="groups = groups.filter((g) => g.id !== group.id)"
            />
          </div>

          <!-- Subscribers -->
          <div class="mt-2">
            <p class="text-sm text-muted-foreground">Subscribers</p>
            <p class="text-2xl font-semibold text-primary leading-tight mt-2">
              {{ group.subscribers }}
            </p>
          </div>

          <!-- Divider -->
          <hr class="my-4 " />

          <!-- Footer stats -->
          <div class="flex items-center justify-between">
            <div class="flex gap-6 text-sm">
              <div class="text-center">
                <p class="text-muted-foreground text-sm">Open rate</p>
                <p class="font-medium ">{{ group.openRate }}%</p>
              </div>
              <div class="text-center">
                <p class="text-muted-foreground text-sm">Click rate</p>
                <p class="font-medium ">{{ group.clickRate }}%</p>
              </div>
            </div>

            <NuxtLink
              to="dashboard/leads/lead-details"
              class="text-primary font-medium hover:underline"
            >
              View Group
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 gap-4 mt-4">
        <div
          v-for="group in sortedGruops"
          :key="group.id"
          class="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg"
        >
          <!-- Left info -->
          <div class="flex flex-col gap-1">
            <span class="font-medium">{{ group.name }}</span>
            <span class="text-xs text-muted-foreground">
              Created {{ new Date(group.createdAt).toLocaleDateString() }}
            </span>
            <NuxtLink
              to="dashboard/leads/lead-details"
              class="text-primary text-sm mt-2"
            >
              View Group
            </NuxtLink>
          </div>

          <!-- Right stats -->
          <div class="flex gap-6 mt-4 md:mt-0 text-center text-sm">
            <div class="pl-4 border-l">
              <p class="font-medium">{{ group.subscribers }}</p>
              <p class="text-muted-foreground">Subscribers</p>
            </div>
            <div class="pl-4 border-l">
              <p class="font-medium">{{ group.openRate }}%</p>
              <p class="text-muted-foreground">Open rate</p>
            </div>
            <div class="pl-4 border-l flex items-center gap-2">
              <div>
                <p class="font-medium">{{ group.clickRate }}%</p>
                <p class="text-muted-foreground">Click rate</p>
              </div>

              <!-- ✅ Use reusable dropdown component -->
              <GroupTableDropDown
                :leadDeatils="group"
                @deleted="groups = groups.filter((g) => g.id !== group.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <EmptyResource v-bind="emptyResource" />
    </div>
  </div>
</template>
