<script setup lang="ts">
import { useSidebar } from "~/components/ui/sidebar";

const isLoading = ref<boolean>(true);
const width = ref<number>(0);
const height = ref<number>(0);

const { toggleSidebar } = useSidebar();

onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;

  toggleSidebar();
});
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      class="w-full h-full flex justify-center items-center mt-12"
    >
      <div class="max-w-sm">
        <div class="flex flex-col items-center">
          <div class="loader my-6" />
          <AppHeading :level="3">Hang On!</AppHeading>
          <p class="text-muted-foreground">The builder is loading</p>
        </div>
      </div>
    </div>
    <iframe
      v-show="!isLoading"
      src="https://bw.aimsinfosoft.com/beast-builder/"
      :width="width"
      :height="height"
      @loadstart="isLoading = true"
      @load="isLoading = false"
    />
  </div>
</template>
