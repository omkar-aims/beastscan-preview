<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const modalRef = useTemplateRef("modal");

const showModal = ref(false);

onClickOutside(modalRef, () => {
  showModal.value = false;
});

onMounted(async () => {
  await import("@/assets/js/qr-builder");
});
</script>

<template>
  <div>
    <div @click="showModal = true">
      <slot />
    </div>

    <div
      v-if="showModal"
      v-motion-pop
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        ref="modal"
        class="h-[90vh] max-h-[680px] bg-white rounded-xl shadow-lg relative border border-border overflow-hidden"
      >
        <ClientOnly>
          <!-- <qr-builder /> -->
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
