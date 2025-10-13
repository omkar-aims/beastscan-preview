<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { cn } from "@/lib/utils"; 

const props = defineProps<{
  icon: any;
  label: string;
  selected?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
  type="button"
  :class="cn(
      'flex items-center gap-2 px-6 py-2 border rounded-full transition-all duration-200 font-medium',
      'hover:border-primary/40 hover:text-primary/90',
      selected
      ? 'border-primary text-primary bg-primary/5'
      : 'border-muted-foreground   text-muted-foreground '
    )"
    @click="emit('click')"
>
  <component :is="icon" class="w-5 h-5" />
  <span>{{ props.label }}</span>
</button>
</template>
