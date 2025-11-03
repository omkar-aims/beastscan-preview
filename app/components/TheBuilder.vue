<script setup lang="ts">
import { useSidebar } from "./ui/sidebar";

const props = withDefaults(
  defineProps<{
    source: string;
    waitForLoad?: boolean;
  }>(),
  {
    waitForLoad: true,
  }
);

const isLoading = ref<boolean>(props.waitForLoad);
const width = ref<number>(0);
const height = ref<number>(0);

const { toggleSidebar, state } = useSidebar();



onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - 64;
  if (state.value === "expanded") toggleSidebar();

  if (!props.waitForLoad) {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  if (state.value === "collapsed") toggleSidebar();
});
</script>

<template>
  <div class="absolute inset-0 w-full h-full flex justify-center">
    <div
      v-if="isLoading"
      class="w-full h-full flex justify-center items-center py-32"
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
      :src="source"
      :class="[state === 'expanded' && 'shadow-2xl']"
      :width="width"
      :height="height"
      @loadstart="isLoading = true"
      @load="isLoading = false"
    />
  </div>
</template>