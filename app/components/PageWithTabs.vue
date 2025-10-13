<script setup lang="ts">
import { useRoute } from "vue-router";
import type { PropType } from "vue";
import type { LucideIcon } from "lucide-vue-next";

interface Tab {
  label: string;
  to: string;
  icon?: LucideIcon;
  button ? : boolean;
}

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
});

const route = useRoute();

const activeTab = computed(() => {
  return props.tabs.find((tab) => tab.to === route.path);
});
</script>

<template>
  <div>
    <AppRow>
      <AppRow direction="horizontal" class="items-center justify-between">
        <AppHeading :level="2">
          <slot name="title" :active-tab="activeTab" />
        </AppHeading>
        <slot name="action" :active-tab="activeTab" />
      </AppRow>

      <nav>
        <ul class="flex gap-8 border-b border-muted">
          <li v-for="tab in props.tabs" :key="tab.to">
            <NuxtLink
              :to="tab.to"
              class="transition-all duration-200 py-3 border-b-2 font-semibold flex items-center gap-2"
              :class="
                route.path === tab.to
                  ? 'text-primary border-b-primary'
                  : 'border-b-transparent text-muted-foreground hover:text-primary hover:border-b-primary'
              "
            >
              <component :is="tab.icon" v-if="tab.icon" class="w-5 h-5" />
              {{ tab.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </AppRow>

    <div class="my-6">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>
