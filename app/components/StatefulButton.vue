<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const props = defineProps<{
  onClick?: () => Promise<any>;
}>();

const emit = defineEmits(["click"]);

const pending = ref(false);
const success = ref(false);

const handleClick = async (event: MouseEvent) => {
  emit("click", event);

  if (props.onClick) {
    const result = props.onClick();

    if (result && typeof result.then === "function") {
      try {
        pending.value = true;
        success.value = false;
        await result;
        success.value = true;
      } catch (e) {
        console.error(e);
      } finally {
        pending.value = false;
        setTimeout(() => {
          success.value = false;
        }, 2000);
      }
    }
  }
};
</script>

<template>
  <Button
    :disabled="pending"
    type="button"
    class="flex items-center justify-center gap-2"
    v-bind="$attrs"
    @click="handleClick"
  >
    <Icon v-if="pending" name="svg-spinners:180-ring-with-bg" class="text-lg" />

    <Icon
      v-else-if="success"
      v-motion-pop
      name="lucide:circle-check"
      class="text-lg"
    />

    <span>
      <slot />
    </span>
  </Button>
</template>
