<script setup lang="ts">
import { nanoid } from "nanoid";
defineProps<{
  status: "idle" | "pending" | "error" | "success";
  idleIcon?: string;
}>();
</script>

<template>
  <Button
    :key="nanoid()"
    :disabled="status === 'pending'"
    class="flex items-center justify-center gap-2"
    v-bind="$attrs"
  >
    <Icon
      v-if="status === 'pending'"
      name="svg-spinners:180-ring-with-bg"
      class="text-lg"
    />

    <Icon
      v-else-if="status === 'success'"
      v-motion-pop
      name="lucide:circle-check"
      class="text-lg"
    />

    <Icon
      v-else-if="status === 'error'"
      v-motion-pop
      name="lucide:circle-x"
      class="text-lg"
    />

    <Icon
      v-else-if="status === 'idle' && idleIcon"
      :name="idleIcon"
      class="text-lg"
    />

    <span>
      <slot />
    </span>
  </Button>
</template>
