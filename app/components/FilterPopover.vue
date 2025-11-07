<script setup lang="ts">
import { ref } from "vue";
import { Filter, Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "~/lib/utils";

const types = ["URL", "Beasthub", "Linkhub", "Lead", "Feedback", "vCard"];
const tags = ["Marketing", "Q4", "Promo", "Retail", "Event"];
const statuses = ["Draft", "Active", "Archived"];

const selected = ref({
  types: [] as string[],
  tags: [] as string[],
  statuses: [] as string[],
});

function toggleItem(arr: string[], value: string) {
  const index = arr.indexOf(value);
  if (index > -1) arr.splice(index, 1);
  else arr.push(value);
}

function clearFilters() {
  selected.value = { types: [], tags: [], statuses: [] };
}

const activeCount = computed(() => {
  return (
    selected.value.types.length +
    selected.value.tags.length +
    selected.value.statuses.length
  );
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="flex w-min items-center gap-1 text-sm font-normal bg-card"
      >
        <Filter class="w-4 h-4" />
        <span>Filter</span>
        <span v-if="activeCount" class="ml-1 mt-0.5 text-xs">
          ({{ activeCount }})
        </span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-80 p-4 space-y-4">
      <div class="flex justify-between items-center mb-1">
        <p class="text-sm font-semibold text-foreground">Filters</p>
        <button
          class="text-xs text-muted-foreground hover:text-primary transition-colors"
          @click="clearFilters"
        >
          Clear All
        </button>
      </div>

      <div>
        <p class="text-xs font-semibold text-muted-foreground mb-2 uppercase">
          Type
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="type in types"
            :key="type"
            :class="
              cn(
                'px-2 py-1 text-xs rounded-full border flex items-center gap-1 transition-all',
                selected.types.includes(type)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white hover:bg-primary/10 text-foreground border-border'
              )
            "
            @click="toggleItem(selected.types, type)"
          >
            <Check v-if="selected.types.includes(type)" class="w-3 h-3" />
            {{ type }}
          </button>
        </div>
      </div>

      <div>
        <p class="text-xs font-semibold text-muted-foreground mb-2 uppercase">
          Tags
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="tag in tags"
            :key="tag"
            :class="
              cn(
                'px-2 py-1 text-[11px] rounded-full border flex items-center gap-1 transition-all',
                selected.tags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white hover:bg-primary/10 text-foreground border-border'
              )
            "
            @click="toggleItem(selected.tags, tag)"
          >
            <Check v-if="selected.tags.includes(tag)" class="w-3 h-3" />
            {{ tag }}
          </button>
        </div>
      </div>

      <div>
        <p class="text-xs font-semibold text-muted-foreground mb-2 uppercase">
          Status
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="status in statuses"
            :key="status"
            :class="
              cn(
                'px-2 py-1 text-[11px] rounded-full border flex items-center gap-1 transition-all',
                selected.statuses.includes(status)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white hover:bg-primary/10 text-foreground border-border'
              )
            "
            @click="toggleItem(selected.statuses, status)"
          >
            <Check v-if="selected.statuses.includes(status)" class="w-3 h-3" />
            {{ status }}
          </button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
