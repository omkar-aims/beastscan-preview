<script setup lang="ts">
import { Plus, ArrowDownUp } from "lucide-vue-next";
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import CampaignLoader from "~/components/campaign/Loader.vue";

const { data: campaigns, isLoading, isError } = useCampaigns();

const searchQuery = ref("");
const sortBy = ref<"latest" | "oldest" | "name_asc" | "name_desc" | "scans">(
  "latest"
);

const filteredCampaigns = computed(() => {
  if (!campaigns.value) return [];

  let result = [...campaigns.value];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (c) =>
        c.attributes.title.toLowerCase().includes(q) ||
        c.attributes.slug.toLowerCase().includes(q)
    );
  }

  switch (sortBy.value) {
    case "latest":
      result.sort(
        (a, b) =>
          new Date(b.attributes.published_at ?? 0).getTime() -
          new Date(a.attributes.published_at ?? 0).getTime()
      );
      break;
    case "oldest":
      result.sort(
        (a, b) =>
          new Date(a.attributes.published_at ?? 0).getTime() -
          new Date(b.attributes.published_at ?? 0).getTime()
      );
      break;
    case "name_asc":
      result.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
      break;
    case "name_desc":
      result.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
      break;
  }

  return result;
});
</script>

<template>
  <div>
    <CampaignEmpty v-if="campaigns?.length === 0" />
    <CampaignError v-if="isError" />

    <div v-if="campaigns?.length && campaigns?.length > 0">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold">Campaigns</h1>
        <NuxtLink to="/dashboard/campaigns/new">
          <Button>
            <Plus class="w-5 h-5" />
            Launch New Campaign
          </Button>
        </NuxtLink>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div class="relative w-full sm:w-1/3">
          <Input
            v-model="searchQuery"
            placeholder="Search campaigns..."
            class="bg-card"
          />
        </div>

        <div class="flex items-center gap-3">
          <Select v-model="sortBy">
            <SelectTrigger
              class="group bg-card border-transparent text-sm font-normal rounded-full px-4 py-2 flex items-center hover:bg-primary hover:text-primary-foreground justify-center gap-1"
              :hide-icon="true"
            >
              <ArrowDownUp
                class="w-4 h-4 text-card-foreground group-hover:text-primary-foreground"
              />
              <SelectValue
                placeholder="Sort by"
                class="text-card-foreground group-hover:text-primary-foreground"
              />
            </SelectTrigger>

            <SelectContent class="w-[180px]">
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="name_asc">Name (A-Z)</SelectItem>
              <SelectItem value="name_desc">Name (Z-A)</SelectItem>
              <SelectItem value="scans">Most Scanned</SelectItem>
            </SelectContent>
          </Select>
          <FilterPopover />
        </div>
      </div>

      <CampaignLoader v-if="isLoading" />
      <CampaignList
        v-if="filteredCampaigns.length > 0"
        :campaigns="filteredCampaigns"
      />
    </div>
  </div>
</template>
