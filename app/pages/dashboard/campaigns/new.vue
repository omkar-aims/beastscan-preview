<script setup lang="ts">
import { useCampaignWizard } from "~/composables/campaign/useCampaignWizard";
const {
  newCampaign,
  steps,
  currentStep,
  nextStep,
  formSchema,
  handleTypeSelect,
  handleSubmit,
} = useCampaignWizard();
</script>

<template>
  <AppRow gap="md">
    <Card><AppStepper v-model="currentStep" :steps="steps" /></Card>

    <CampaignWizardTypeSelector
      v-if="currentStep === 1"
      :handle-type-select="handleTypeSelect"
    />
    <CampaignWizardConfigForm
      v-else-if="currentStep === 2"
      :form-schema="formSchema"
      :handle-submit="handleSubmit"
    />
    <CampaignWizardCustomizeQR
      v-else-if="currentStep === 3"
      v-model="newCampaign"
      :next-step="nextStep"
    />
    <CampaignWizardReviewCampaign
      v-else-if="currentStep === 4"
      v-model="newCampaign"
    />
  </AppRow>
</template>
