<script setup lang="ts">
import z from "zod";
import { nanoid } from "nanoid";
import type { CampaignType } from "~/types/campaign";
import { campaignOptions } from "~/config/campaignOptions";
import { defaultQROption } from "~/config/qrCodeTemplates";
const stepIndex = ref(1);

const allSteps = [
  {
    title: "Select Type",
    description: "Choose QR type",
    icon: "lucide:layers",
  },
  {
    title: "Template",
    description: "Select a template",
    icon: "lucide:palette",
    expandable: true,
  },
  {
    title: "Setup",
    description: "Setup your campaign",
    icon: "lucide:edit-3",
  },
  {
    title: "Customize",
    description: "Style and personalize",
    icon: "lucide:sparkles",
  },
  {
    title: "Review",
    description: "Review your QR",
    icon: "lucide:check-circle",
  },
];

const expandWizard = ref<boolean>(false);

const steps = computed(() => {
  return allSteps
    .filter((step) => expandWizard.value || !step.expandable)
    .map((step, i) => ({
      ...step,
      step: i + 1,
    }));
});

const config = useRuntimeConfig();

const uniqueURL = `${config.public.host}/${nanoid(8)}`;

const newCampaign = ref({
  type: "" as CampaignType,
  name: "",
  config: {},
  qrOption: { ...defaultQROption, data: uniqueURL },
  url: uniqueURL,
  templateName: "",
});

const campaignFormSchema = computed(() => {
  const campaign = campaignOptions.find(
    (c) => c.type === newCampaign.value.type
  );
  return campaign?.formSchema ?? z.object({});
});

watch(
  () => newCampaign.value.type,
  (type) => {
    if (type === "Digital Business Card" || type === "Form") {
      expandWizard.value = true;
    } else {
      expandWizard.value = false;
    }
  }
);
</script>

<template>
  <div>
    <Form keep-values>
      <Stepper
        v-slot="{ nextStep }"
        v-model="stepIndex"
        :linear="true"
        class="w-full"
      >
        <div class="w-full">
          <Card>
            <CardContent class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="(step, i) in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
              >
                <StepperSeparator
                  v-if="step.step !== steps[steps.length - 1]?.step"
                  class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                />

                <StepperTrigger as-child>
                  <Button
                    :variant="
                      state === 'completed' || state === 'active'
                        ? 'default'
                        : 'outline'
                    "
                    size="icon"
                    class="z-10 rounded-xs shrink-0"
                    :class="[
                      state === 'active' &&
                        'ring-2 ring-ring ring-offset-2 ring-offset-background',
                    ]"
                    :disabled="state !== 'completed'"
                  >
                    <Icon
                      v-if="state === 'completed'"
                      name="lucide:circle-check-big"
                    />
                    <Icon v-else-if="state === 'active'" :name="step.icon" />
                    <span v-else>{{ i + 1 }}</span>
                  </Button>
                </StepperTrigger>
                <div class="flex flex-col items-center text-center">
                  <StepperTitle
                    :class="[state === 'active' && 'text-primary']"
                    class="text-sm font-semibold transition lg:text-base"
                  >
                    {{ step.title }}
                  </StepperTitle>
                  <StepperDescription
                    :class="[state === 'active' && 'text-primary']"
                    class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                  >
                    {{ step.description }}
                  </StepperDescription>
                </div>
              </StepperItem>
            </CardContent>
          </Card>

          <div class="flex flex-col gap-4 mt-4">
            <div v-if="stepIndex === 1">
              <CampaignWizardTypeSelector
                :handle-change="(type: CampaignType) => {
                newCampaign.type = type;
                nextStep()
              }"
              />
            </div>

            <div v-if="expandWizard && stepIndex === 2" v-motion-slide-bottom>
              <CampaignWizardTemplatePicker
                :handle-select-template="
                  (name) => {
                    newCampaign.templateName = name;
                    nextStep();
                  }
                "
              />
            </div>

            <div
              v-if="
                (expandWizard && stepIndex === 3) ||
                (!expandWizard && stepIndex === 2)
              "
              v-motion-slide-bottom
            >
              <CampaignWizardConfigForm
                :form-schema="campaignFormSchema"
                :handle-submit="
                  (values) => {
                    newCampaign.config = values;
                    nextStep();
                  }
                "
              />
            </div>
            <div
              v-if="
                (expandWizard && stepIndex === 4) ||
                (!expandWizard && stepIndex === 3)
              "
              v-motion-slide-bottom
            >
              <CampaignWizardCustomizeQR
                v-model="newCampaign"
                :next-step="nextStep"
              />
            </div>

            <div
              v-if="
                (expandWizard && stepIndex === 5) ||
                (!expandWizard && stepIndex === 4)
              "
              v-motion-slide-bottom
            >
              <CampaignWizardReviewCampaign v-model="newCampaign" />
            </div>
          </div>
        </div>
      </Stepper>
    </Form>
  </div>
</template>
