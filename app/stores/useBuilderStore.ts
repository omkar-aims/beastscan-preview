import { defineStore } from "pinia";

export const useBuilderStore = defineStore("builder", () => {
  const isBuilderOpen = ref(false);

  const action = ref<null | (() => void)>(null);

  function open() {
    isBuilderOpen.value = true;
  }

  function close() {
    isBuilderOpen.value = false;
  }

  function setAction(fn: () => void) {
    action.value = fn;
  }

  return { isBuilderOpen, open, close, setAction, action };
});
