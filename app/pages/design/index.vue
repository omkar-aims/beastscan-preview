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

      await mutateAsync({
        config: config,
      });
    }
  });
});

onUnmounted(() => {
  if (state.value === "collapsed") toggleSidebar();
});

const templates = [
  {
    id: 1,
    name: "Minimalist Portfolio",
    thumbnail: "templates/template-01.png",
    description: "Simple and minimalist portfolio",
    config:
      '{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-n-A-HZ","type":"Section","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","background":"#E9E1DA"},"content":[{"id":"element-t_efyf","type":"Grid","styles":{"padding":"1rem","gridTemplateColumns":"1fr 250px","margin":"1fr 1fr 1fr 1fr","border":"0px solid #E5D8CD"},"props":{},"content":[{"id":"element-pwXuz9","type":"Flex","content":[{"id":"element-lQXeFb","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#222222","fontSize":"63px"},"props":{"contenteditable":true},"content":"Bethany Jones"},{"id":"element-6jUO9P","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#5B5B5B"},"props":{"contenteditable":true},"content":"I\'m a dedicated culture critic and lifestyle blogger exploring the intersections of art, travel, and modern living. Based in San Francisco, California."},{"id":"element-Ug-ISF","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"32px 1px 1px 1px","color":"#222222","fontSize":"32px"},"props":{"contenteditable":true},"content":"@reallygreatsite"},{"id":"element-c4RTJ-","type":"Social","styles":{"gridTemplateColumns":"1fr 1fr"},"props":{"variant":"icon-only","shape":"pill","links":[{"platform":"facebook","url":"https://www.facebook.com/yourpage"},{"platform":"instagram","url":"https://www.facebook.com/yourpage"},{"platform":"whatsapp","url":"https://www.facebook.com/yourpage"}]},"content":null}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"}},{"id":"element-a0lnRc","type":"Flex","content":[{"id":"element-O1d6Xh","type":"Image","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","boxShadow":"12px 12px 0px 0px rgba(91, 91, 91, 0.2)"},"props":{"src":"https://images.stockcake.com/public/e/a/b/eab7d9c9-2a1d-421d-8f04-3606ead822ed_large/professional-woman-posing-stockcake.jpg","alt":"Image","width":350,"height":350},"content":null}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr"}}]}]}]},"theme":{}}',
  },
];

const selectedTemplate = ref<(typeof templates)[0] | null>(null);
const selectTemplate = (newTemplate: (typeof templates)[0]) => {
  selectedTemplate.value = newTemplate;
};

const confirmSelection = () => {
  if (!selectedTemplate.value) return;
  builderStore.showTemplatePicker = false;
  builderStore.iframeRef?.contentWindow?.postMessage(
    {
      type: "builderSetConfig",
      config: selectedTemplate.value.config,
    },
    "*"
  );
};
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

    <div
      v-if="builderStore.showTemplatePicker"
      v-motion-fade
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        v-motion-pop
        class="bg-white rounded-2xl shadow-xl max-w-5xl w-full h-[80vh] max-h-[600px] overflow-y-auto p-6 relative flex flex-col"
      >
        <div class="flex-1">
          <div class="flex justify-between items-center mb-4">
            <AppHeading :level="4">Select a Template</AppHeading>

            <button
              class="text-gray-500 hover:text-gray-700"
              @click="builderStore.showTemplatePicker = false"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="template in templates"
              :key="template.id"
              class="group cursor-pointer border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative"
              :class="{
                'ring-2 ring-primary ring-offset-2':
                  selectedTemplate?.id === template.id,
              }"
              @click="selectTemplate(template)"
            >
              <NuxtImg
                :src="template.thumbnail"
                :alt="template.name"
                class="w-full h-40 object-cover"
              />
              <div class="p-3">
                <h3 class="font-medium text-gray-800">{{ template.name }}</h3>
                <p class="text-sm text-gray-500">{{ template.description }}</p>
              </div>

              <div
                v-if="selectedTemplate?.id === template.id"
                class="absolute inset-0 bg-primary/30 flex items-center justify-center"
              >
                <Check class="text-white w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <Button
            variant="outline"
            @click="builderStore.showTemplatePicker = false"
          >
            Cancel
          </Button>

          <Button :disabled="!selectedTemplate" @click="confirmSelection">
            Use Template
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
