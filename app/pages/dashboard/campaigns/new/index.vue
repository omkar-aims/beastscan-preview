<script setup lang="ts">
import { ChevronRight, Check } from "lucide-vue-next";

const steps = [
  {
    id: 1,
    title: "Basic Details",
  },
  {
    id: 2,
    title: "Type",
  },
  {
    id: 3,
    title: "Configure",
  },
  {
    id: 4,
    title: "Theme",
  },
  {
    id: 5,
    title: "Done",
  },
];

const currentStep = ref<number>(1);
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-4">
      <AppHeading :level="3">Create new campaign</AppHeading>
      <div class="flex items-center gap-6">
        <div
          v-for="step in steps"
          :key="step.id"
          class="flex items-center gap-3"
        >
          <div
            class="h-6 w-6 flex items-center justify-center rounded-full border font-medium text-base transition-all"
            :class="[
              currentStep > step.id
                ? 'bg-success text-white border-success'
                : currentStep === step.id
                ? 'border-primary text-primary border-2'
                : 'border-muted-foreground/40 text-muted-foreground border-2',
            ]"
          >
            <Check v-if="currentStep > step.id" class="w-4 h-4 stroke-[3]" />
            <span v-else class="text-sm font-normal">{{ step.id }}</span>
          </div>

          <span
            class="text-sm font-medium transition-colors"
            :class="[
              currentStep > step.id
                ? 'text-muted-foreground/70'
                : currentStep === step.id
                ? 'text-primary'
                : 'text-muted-foreground/80',
            ]"
          >
            {{ step.title }}
          </span>

          <ChevronRight
            v-if="step.id !== steps.length"
            class="w-4 h-4 text-muted-foreground/50"
          />
        </div>
      </div>
    </div>

    <CampaignWizardDetail v-if="currentStep === 1" @done="currentStep += 1" />
    <CampaignWizardType v-if="currentStep === 2" @done="currentStep += 1" />
    <CampaignWizardConfigure
      v-if="currentStep === 3"
      @done="currentStep += 1"
    />
    <CampaignWizardTheme v-if="currentStep === 4" @done="currentStep += 1" />
    <CampaignWizardCustomize
      v-if="currentStep === 5"
      @done="currentStep += 1"
    />
  </section>
</template>
