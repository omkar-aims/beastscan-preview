<script setup lang="ts">
import { ChevronRight, Check } from "lucide-vue-next";
import { useCreateCampaign } from "~/composables/campaign/useCreateCampaign";

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
    title: "Template",
  },
  {
    id: 4,
    title: "Configure",
  },
  {
    id: 5,
    title: "Customize",
  },
];

const currentStep = ref<number>(1);

const themeData = ref("");
const extractedColors = ref([]);

const newCampaign = ref({
  title: null,
  slug: null,
  alias: null,
  type: null,
  config: null,
  status: null,
});

const { mutate, status } = useCreateCampaign();
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

    <CampaignWizardDetail
      v-if="currentStep === 1"
      @done="
        (values) => {
          currentStep += 1;
          Object.assign(newCampaign, values);
        }
      "
    />
    <CampaignWizardType
      v-if="currentStep === 2"
      v-motion-fade
      @done="
        (type) => {
          currentStep += 1;
          newCampaign.type = type;
        }
      "
    />

    <CampaignWizardTheme
      v-if="currentStep === 3"
      v-motion-fade
      @done="
        (theme) => {
          currentStep += 1;
          themeData = theme;
        }
      "
    />

    <CampaignWizardConfigure
      v-if="currentStep === 4"
      v-motion-fade
      :theme="themeData"
      @done="
        (theme) => {
          currentStep += 1;
          themeData = theme;
        }
      "
      @extract-color="
        (colors: []) => {
          extractedColors = [...colors];
        }
      "
    />

    <CampaignWizardCustomize
      v-if="currentStep === 5"
      v-motion-fade
      :theme="themeData"
      :status="status"
      :extracted-colors="extractedColors"
      @done="
        (theme) => {
          newCampaign.config = theme;
          mutate(newCampaign);
        }
      "
    />
  </section>
</template>
