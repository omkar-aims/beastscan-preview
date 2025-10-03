<script setup lang="ts">
import { useSidebar } from "./ui/sidebar";

const props = defineProps<{
  template: string;
}>();

console.log(props.template);

const isLoading = ref<boolean>(true);
const width = ref<number>(0);
const height = ref<number>(0);

const { toggleSidebar, state } = useSidebar();
const iframeScale = computed(() => (state.value === "expanded" ? 0.5 : 1));

onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  if (state.value === "expanded") toggleSidebar();
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
      :src="`https://bw.aimsinfosoft.com/beast-builder/?template=${template}`"
      :class="[state === 'expanded' && 'shadow-2xl']"
      :style="{
        transform: `scale(${iframeScale}) ${
          state === 'expanded' ? 'translate(50%, 32px)' : ''
        } `,
        transformOrigin: 'top left',
        transition: 'transform 0.3s ease',
      }"
      :width="width"
      :height="height"
      @loadstart="isLoading = true"
      @load="isLoading = false"
    />
  </div>
</template>
