<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref, onMounted, defineEmits } from "vue";
import { useCampaigns } from "~/composables/campaign/useCampaigns";

const loading = ref(true);
const emit = defineEmits(["on-close"]);

const { data, isLoading } = useCampaigns();

onMounted(async () => {
  await import("@/assets/js/qr-builder.js");

  loading.value = false;

  window.addEventListener("QRCreateTrigger", (e) => {
    console.log(e);
  });
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
          v-if="!loading && !isLoading"
          :campaigns="data"
          :show-action="true"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div class="loader" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
