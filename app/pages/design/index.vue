<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, navigateTo } from "#app";
import { useCampaign } from "~/composables/campaign/useCampaign";
import { useSidebar } from "~/components/ui/sidebar";
import { useUpdateCampaign } from "~/composables/campaign/useUpdateCampaign";

const { toggleSidebar, state } = useSidebar();

const route = useRoute();
const campaignId = route.query.campaign as string | undefined;

if (!campaignId) {
  navigateTo("/dashboard/campaigns");
}

const { data: campaign, isLoading: isFetching } = useCampaign(campaignId);

const isLoading = ref(true);
const width = ref(0);
const height = ref(0);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const builderStore = useBuilderStore();

const { mutateAsync, status } = useUpdateCampaign(campaignId);

watch(
  () => status.value,
  (s) => {
    if (builderStore.action === "draft") builderStore.draftStatus = s;
    else builderStore.publishStatus = s;
  },
  { immediate: true }
);

onMounted(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - 64;
  if (state.value === "expanded") toggleSidebar();

  const iframe = iframeRef.value;
  if (!iframe) return;

  builderStore.iframeRef = iframeRef.value;

  const sendBuilderConfig = () => {
    if (!campaign.value) return;

    iframe.contentWindow?.postMessage(
      {
        type: "builderSetConfig",
        config: JSON.stringify(campaign.value.attributes?.config ?? {}),
      },
      "*"
    );

    isLoading.value = false;
  };

  watch(
    () => campaign.value,
    (val) => {
      if (val) {
        sendBuilderConfig();
      }
    },
    { immediate: true }
  );

  window.addEventListener("message", async (event: MessageEvent) => {
    if (event.origin !== "https://beast-builder.netlify.app") return;

    if (event.data?.type === "builderReady") {
      sendBuilderConfig();
    }

    if (event.data?.type == "builderConfigResponse") {
      const config = event.data.config;
      console.log(config);

      await mutateAsync({
        config: config,
      });
    }
  });
});

onUnmounted(() => {
  if (state.value === "collapsed") toggleSidebar();
});
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 w-full h-full flex justify-center">
      <div
        v-if="isLoading || isFetching"
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
        v-show="!isLoading && !isFetching"
        ref="iframeRef"
        src="https://beast-builder.netlify.app/"
        :width="width"
        :height="height"
        class="border-0"
      />
    </div>
  </div>
</template>
