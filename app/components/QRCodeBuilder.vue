<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref, onMounted, defineEmits } from "vue";

const campaigns = [
  {
    type: "campaigns",
    id: "cmp_001",
    attributes: {
      title: "Holiday Giveaway 2025",
      slug: "holiday-giveaway-2025",
      short_code: "HOL25",
      status: "published",
      published_at: new Date("2025-10-01T10:00:00Z"),
      project_id: "proj_101",
    },
  },
  {
    type: "campaigns",
    id: "cmp_002",
    attributes: {
      title: "Summer Sale Bonanza",
      slug: "summer-sale-bonanza",
      short_code: "SUM25",
      status: "draft",
      published_at: null,
      project_id: "proj_102",
    },
  },
  {
    type: "campaigns",
    id: "cmp_003",
    attributes: {
      title: "New Year Mega Event",
      slug: "new-year-mega-event",
      short_code: "NY25",
      status: "archived",
      published_at: new Date("2024-12-31T00:00:00Z"),
      project_id: "proj_103",
    },
  },
  {
    type: "campaigns",
    id: "cmp_004",
    attributes: {
      title: "Flash Sale Weekend",
      slug: "flash-sale-weekend",
      short_code: "FLASH25",
      status: "published",
      published_at: new Date("2025-07-10T15:30:00Z"),
      project_id: "proj_104",
    },
  },
  {
    type: "campaigns",
    id: "cmp_005",
    attributes: {
      title: "Referral Rewards Program",
      slug: "referral-rewards-program",
      short_code: "REF25",
      status: "draft",
      published_at: null,
      project_id: "proj_105",
    },
  },
];

const loading = ref(true);
const emit = defineEmits(["on-close"]);

onMounted(async () => {
  await import("@/assets/js/qr-builder.js");
  loading.value = false;
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        class="relative bg-background h-[90vh] max-h-[680px] w-5xl rounded-lg grid grid-cols-[1fr_30%] overflow-hidden"
      >
        <button
          class="absolute top-4 right-4 rounded-full p-2 hover:bg-muted transition cursor-pointer z-50"
          aria-label="Close"
          @click="() => emit('on-close')"
        >
          <X />
        </button>

        <qr-builder
          v-if="!loading"
          :campaigns="campaigns"
          :show-action="true"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div class="loader" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
