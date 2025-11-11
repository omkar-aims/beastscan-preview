<script setup lang="ts">
import { useCampaign } from "~/composables/campaign/useCampaign";

definePageMeta({
  layout: false,
});

const route = useRoute();
const campaignId = route.params.slug as string | undefined;
const { data: campaign, isLoading: isFetching } = useCampaign(campaignId);

const isLoading = ref<boolean>(false);
const width = ref<number>(0);
const height = ref<number>(0);

const iframeRef = useTemplateRef("iframeRef");

const sendBuilderConfig = () => {
  const iframe = iframeRef.value;
  if (!iframe || !campaign.value) return;

  iframe.contentWindow?.postMessage(
    {
      type: "builderSetConfig",
      config: JSON.stringify(campaign.value.attributes?.config ?? {}),
    },
    "https://beast-builder.netlify.app"
  );

  isLoading.value = false;
};

onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - 64;

  const iframe = iframeRef.value;
  isLoading.value = true;

  if (!iframe) return;

  window.addEventListener("message", (event: MessageEvent) => {
    if (event.data?.type === "builderReady") {
      sendBuilderConfig();
    }
  });
});

watch(
  () => campaign.value,
  (val) => {
    if (val) sendBuilderConfig();
  },
  { immediate: true }
);
</script>

<template>
  <div class="absolute inset-0 w-full h-full flex justify-center">
    <div
      v-if="isFetching"
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
      src="https://beast-builder.netlify.app/?mode=view"
      :width="width"
      :height="height"
    />
  </div>
</template>
