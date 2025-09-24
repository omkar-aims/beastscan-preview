<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";

defineProps<{
  stepIndex: number;
  nextStep: () => void;
}>();
</script>

<template>
  <div v-if="stepIndex > 1" class="space-y-2 mt-4">
    <PhonePreview src="/preview.png" alt="New form preview" />
    <Button
      v-if="stepIndex === 2"
      v-motion-fade
      type="button"
      class="w-full"
      variant="secondary"
      >Open in builder</Button
    >
    <Button
      v-if="stepIndex !== 4"
      type="button"
      class="w-full items-center"
      @click="nextStep"
    >
      <span>Next</span>
      <ChevronRight />
    </Button>
  </div>
</template>
