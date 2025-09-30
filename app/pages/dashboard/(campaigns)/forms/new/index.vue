<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";

const steps = [
  {
    step: 1,
    title: "Goal",
    description: "Choose your goal",
    icon: "lucide:target",
  },
  {
    step: 2,
    title: "Template",
    description: "Pick a template",
    icon: "lucide:layers",
  },
  {
    step: 3,
    title: "Quick Style",
    description: "Apply quick styles",
    icon: "lucide:palette",
  },
  {
    step: 4,
    title: "Behaviour",
    description: "Set form behaviour",
    icon: "lucide:zap",
  },
  {
    step: 5,
    title: "Final",
    description: "Review & finish",
    icon: "lucide:circle-check-big",
  },
];

const stepIndex = ref(1);

useRouteStepSync(stepIndex);

watch(stepIndex, () => {
  const mainContainer = document.querySelector("#main");
  if (!mainContainer) return;
  mainContainer.scrollTo({ top: 0, behavior: "smooth" });
});
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
                    class="z-10 rounded-full shrink-0"
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

          <div :class="stepIndex > 2 ? 'grid grid-cols-[1fr_25%] gap-4' : ''">
            <div class="flex flex-col gap-4 mt-4">
              <div v-if="stepIndex === 1">
                <FormsWizardStepZero :next-step="nextStep" />
              </div>

              <div v-if="stepIndex === 2">
                <FormsWizardStepOne :next-step="nextStep" />
              </div>

              <div v-if="stepIndex === 3" v-motion-fade>
                <FormsWizardStepTwo>
                  <Button @click="nextStep">
                    <span>Next</span>
                    <ChevronRight />
                  </Button>
                </FormsWizardStepTwo>
              </div>

              <div v-if="stepIndex === 4" v-motion-fade>
                <FormsWizardStepThree>
                  <Button @click="nextStep">
                    <span>Next</span>
                    <ChevronRight />
                  </Button>
                </FormsWizardStepThree>
              </div>

              <div v-if="stepIndex === 5" v-motion-fade>
                <FormsWizardStepFour />
              </div>
            </div>

            <div v-if="stepIndex > 2" class="py-4 px-2">
              <PhonePreview src="/preview.png" alt="New form preview" />
            </div>
          </div>
        </div>
      </Stepper>
    </Form>
  </section>
</template>
