<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-slot="table-container" class="relative w-full overflow-auto">
    <table
      data-slot="table"
      :class="
        cn(
          'w-full caption-bottom text-sm border-separate border-spacing-y-4 ',
          props.class
        )
      "
    >
      <slot />
    </table>
  </div>
</template>
