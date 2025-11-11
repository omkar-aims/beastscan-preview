import { defineStore } from "pinia";

export const useBuilderStore = defineStore("builder", () => {
  const isBuilderOpen = ref(false);
  const iframeRef = ref<HTMLIFrameElement | null>(null);
  const action = ref<"draft" | "published">("draft");
  const config = ref<object>({});
  const publishStatus = ref<"idle" | "pending" | "error" | "success">("idle");
  const draftStatus = ref<"idle" | "pending" | "error" | "success">("idle");
  const showTemplatePicker = ref<boolean>(false);
  function open() {
    isBuilderOpen.value = true;
  }

  function close() {
    isBuilderOpen.value = false;
  }

  function setAction(a: "published" | "draft") {
    action.value = a;
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
    open,
    close,
    setAction,
    action,
    iframeRef,
    publishStatus,
    draftStatus,
    config,
    showTemplatePicker,
  };
});
