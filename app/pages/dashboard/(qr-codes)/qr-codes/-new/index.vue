<script setup lang="ts">
import z from "zod";
import { nanoid } from "nanoid";
import type { CampaignType } from "~/types/campaign";
import { campaignOptions } from "~/config/campaignOptions";
import { defaultQROption } from "~/config/qrCodeTemplates";
const stepIndex = ref(1);

useRouteStepSync(stepIndex);
useScrollToTopWizard(stepIndex);

const steps = [
  {
    step: 1,
    title: "Select Type",
    description: "Choose QR type",
    icon: "lucide:layers",
  },
  {
    step: 2,
    title: "Setup",
    description: "Setup your QR",
    icon: "lucide:edit-3",
  },
  {
    step: 3,
    title: "Customize",
    description: "Style and personalize",
    icon: "lucide:sparkles",
  },
  {
    step: 4,
    title: "Review",
    description: "Review your QR",
    icon: "lucide:check-circle",
  },
];

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
          <TheStepper :steps="steps" />

          <div class="flex flex-col gap-4 mt-4">
            <div v-if="stepIndex === 1">
              <CampaignWizardTypeSelector
                :handle-change="(type: CampaignType | '') => {
                  if(type) {
                    newCampaign.type = type;
                    nextStep()
                  } 
              }"
              />
            </div>

            <div v-if="stepIndex === 2" v-motion-fade>
              <CampaignWizardConfigForm
                :form-schema="campaignFormSchema"
                :type="newCampaign.type"
                :handle-submit="
                  (values) => {
                    newCampaign.config = values;
                    nextStep();
                  }
                "
              />
            </div>
            <div v-if="stepIndex === 3" v-motion-fade>
              <CampaignWizardCustomizeQR
                v-model="newCampaign"
                :next-step="nextStep"
              />
            </div>

            <div v-if="stepIndex === 4" v-motion-fade>
              <CampaignWizardReviewCampaign v-model="newCampaign" />
            </div>
          </div>
        </div>
      </Stepper>
    </Form>
  </div>
</template>
