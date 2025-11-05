<script setup lang="ts">
interface Props {
  currentStep: number
  totalSteps: number
  isPending: boolean
  canProceed: boolean
}

interface Emits {
  (e: "next" | "back"): void; // Remove 'register' from emits
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleNext = () => emit('next')
const handleBack = () => emit('back')
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <!-- Back Button -->
    <Button
      v-if="currentStep > 1"
      type="button"
      variant="outline"
      :disabled="isPending"
      class="flex-1"
      @click="handleBack"
    >
      <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
      Back
    </Button>
    <div v-else class="flex-1" />

    <!-- Next/Register Button -->
    <Button
      v-if="currentStep < totalSteps"
      type="button"
      :disabled="!canProceed || isPending"
      class="flex-1"
      @click="handleNext"
    >
      Next
      <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
    </Button>

    <!-- Change type to "submit" and remove @click -->
    <Button
      v-else
      type="submit"
      :disabled="isPending"
      class="flex-1"
    >
      <Icon
        v-if="isPending"
        name="lucide:loader-2"
        class="mr-2 h-4 w-4 animate-spin"
      />
      <span>{{ isPending ? "Creating account..." : "Register" }}</span>
    </Button>
  </div>
</template>