import { defineStore } from "pinia";
import type { Campaign } from "~/types";

export const useBuilderStore = defineStore("builder", () => {
  const isBuilderOpen = ref(false);
  const iframeRef = ref<HTMLIFrameElement | null>(null);
  const action = ref<"draft" | "published">("draft");

  const publishStatus = ref<"idle" | "pending" | "error" | "success">("idle");
  const draftStatus = ref<"idle" | "pending" | "error" | "success">("idle");

  const campaign = ref<Campaign | null>({
    type: "campaigns",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d25",
    attributes: {
      title: "Demo Campaign",
      slug: "demo-campaign",
      short_code: "c-zPa95a",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  });

  function open() {
    isBuilderOpen.value = true;
  }

  function close() {
    isBuilderOpen.value = false;
  }

  function setAction(a: "published" | "draft") {
    action.value = a;
  }

  function setCampaign(newCampaign: Campaign) {
    campaign.value = newCampaign;
  }

  const route = useRoute();

  watch(
    () => route.fullPath,
    (newPath) => {
      if (newPath.includes("design")) {
        open();
      } else {
        close();
      }
    },
    { immediate: true }
  );

  return {
    isBuilderOpen,
    campaign,
    open,
    close,
    setAction,
    setCampaign,
    action,
    iframeRef,
    publishStatus,
    draftStatus,
  };
});
