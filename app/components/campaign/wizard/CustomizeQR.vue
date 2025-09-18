<script setup lang="ts">
import type { Campaign } from "~/types/campaign";

const props = defineProps<{
  modelValue: Campaign;
  nextStep: () => void;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Campaign): void;
}>();

const campaign = reactive({ ...props.modelValue });

watch(
  campaign,
  (val) => {
    emit("update:modelValue", { ...val });
  },
  { deep: true }
);
</script>

<template>
  <QRCodeBuilder v-model="campaign.qrOption">
    <Button @click="props.nextStep">
      <span>Next</span>
      <Icon name="lucide:chevron-right" />
    </Button>
  </QRCodeBuilder>
</template>
