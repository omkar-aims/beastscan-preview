<script setup lang="ts">
import { useSidebar } from "./ui/sidebar";

defineProps<{
  source: string;
}>();

const isLoading = ref<boolean>(false);
const width = ref<number>(0);
const height = ref<number>(0);

const { toggleSidebar, state } = useSidebar();

const iframeRef = useTemplateRef("iframeRef");

const builderStore = useBuilderStore();

onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - 64;
  if (state.value === "expanded") toggleSidebar();

  builderStore.iframeRef = iframeRef.value;

  const iframe = iframeRef.value;

  if (!iframe) return;

  const sendBuilderConfig = () => {
    iframe.contentWindow?.postMessage(
      { type: "builderSetConfig", config: JSON.stringify(builderStore.config) },
      "*"
    );
    isLoading.value = false;
  };

  sendBuilderConfig();

  if (iframe.contentDocument?.readyState === "complete") {
    isLoading.value = false;
  }
  iframe.addEventListener("load", () => {
    isLoading.value = false;
    sendBuilderConfig();
  });
  iframe.addEventListener("loadstart", () => {
    isLoading.value = true;
  });
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
      ref="iframeRef"
      :src="source"
      :class="[state === 'expanded' && 'shadow-2xl']"
      :width="width"
      :height="height"
    />
  </div>
</template>
