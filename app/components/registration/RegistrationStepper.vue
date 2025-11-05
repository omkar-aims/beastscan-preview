<script setup lang="ts">
import { Progress } from "@/components/ui/progress"

interface Props {
  currentStep: number
  totalSteps: number
}

const props = defineProps<Props>()

// Calculate progress percentage
const progressValue = computed(() => {
  if (props.totalSteps <= 1) return 0
  return ((props.currentStep - 1) / (props.totalSteps - 1)) * 100
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-2">
      <!-- Stepper Bar -->
      <Progress :model-value="progressValue" class="h-2 rounded-full" />

      
    </div>
  </div>
</template>
