<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
const stepIndex = ref<number>(1);

useRouteStepSync(stepIndex);
useScrollToTopWizard(stepIndex);

const steps = [
  {
    step: 1,
    title: "Template",
    description: "Pick a template",
    icon: "lucide:layers",
  },
  {
    step: 2,
    title: "Customize",
    description: "Customize Your VCard",
    icon: "lucide:palette",
  },

  {
    step: 3,
    title: "Final",
    description: "Review & finish",
    icon: "lucide:circle-check-big",
  },
];
</script>

<template>
  <section>
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
              <VcardWizardStepOne :next-step="nextStep" />
            </div>
            <div v-if="stepIndex === 2">
              <VcardWizardStepTwo>
                <Button type="button" @click="nextStep">
                  Next
                  <ChevronRight class="w-4 h-4" />
                </Button>
              </VcardWizardStepTwo>
            </div>
            <div v-if="stepIndex === 3">
              <VcardWizardStepThree />
            </div>
          </div>
        </div>
      </Stepper>
    </Form>
  </section>
</template>
