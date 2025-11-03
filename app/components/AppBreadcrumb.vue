<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

function formatSegment(seg: string) {
  return seg
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const breadcrumbs = computed(() => {
  const segments = route.path
    .replace(/^\/dashboard\/?/, "")
    .split("/")
    .filter(Boolean);

  return segments.map((seg, index) => ({
    label: formatSegment(seg),
    to: "/dashboard/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));
});

const showBreadcrumb = computed(() => breadcrumbs.value.length > 0);
const userStore = useUserStore();
</script>

<template>
  <Breadcrumb v-if="showBreadcrumb">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          {{ userStore.activeProject?.attributes.name }}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <template v-if="crumb.isLast">
            <BreadcrumbPage>{{ crumb.label }}</BreadcrumbPage>
          </template>
          <template v-else>
            <BreadcrumbLink as-child>
              <NuxtLink :to="crumb.to">{{ crumb.label }}</NuxtLink>
            </BreadcrumbLink>
          </template>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
