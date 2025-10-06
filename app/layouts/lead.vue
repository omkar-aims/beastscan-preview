<script setup lang="ts">
import { Trash, UserSquare2,UsersRound, Component , ChartNoAxesCombined} from "lucide-vue-next";
import Default from "./default.vue";

const tabs = [
  { label: "All Leads", to: "/dashboard/leads", icon: UserSquare2 },
  { label: "Segment", to: "/dashboard/leads/segment", icon: Component },
  { label: "Group", to: "/dashboard/leads/group", icon: UsersRound },
  { label: "Stats", to: "/dashboard/leads/stats", icon: ChartNoAxesCombined },
  { label: "Cleanup Inactives", to: "/dashboard/leads/clean-up", icon: Trash },
];
</script>

<template>
  <Default>
    <PageWithTabs :tabs="tabs">
      <template #title="{ activeTab }">
        {{ activeTab?.label }}
      </template>

      <!-- Dynamic Action Buttons -->
      <template #action="{ activeTab }">
        <div v-if="activeTab?.to === '/dashboard/leads'">
          <NuxtLink to="/dashboard/leads/import">
            <Button>
              <Plus />
              <span>Add Leads</span>
            </Button>
          </NuxtLink>
        </div>

        <div v-else-if="activeTab?.to === '/dashboard/leads/segment'">
          <NuxtLink to="/dashboard/leads/segment/new-segment">
            <Button>
              <Plus />
              <span>Create New Segment</span>
            </Button>
          </NuxtLink>
        </div>

        <div v-else-if="activeTab?.to === '/dashboard/leads/group'">
          <GroupDialog />
        </div>

        <!-- No buttons for Stats or Cleanup Inactives -->
      </template>

      <slot />
    </PageWithTabs>
  </Default>
</template>
