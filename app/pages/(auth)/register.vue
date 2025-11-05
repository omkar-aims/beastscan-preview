<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registrationSchema } from "~/schemas/auth";
import { useRegister } from "~/composables/auth/useRegister";
import { useRegistrationWizard } from "~/composables/useRegistrationWizard";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";
import { toast } from "vue-sonner";
import { ref, watch } from "vue";

import RegistrationStepper from "~/components/registration/RegistrationStepper.vue";
import NavigationButtons from "~/components/registration/NavigationButtons.vue";
import EmailStep from "~/components/registration/steps/EmailStep.vue";
import PasswordStep from "~/components/registration/steps/PasswordStep.vue";
import AccountNameStep from "~/components/registration/steps/AccountNameStep.vue";
import ProjectNameStep from "~/components/registration/steps/ProjectNameStep.vue";
import ReferralCodeStep from "~/components/registration/steps/ReferralCodeStep.vue";

useHead({ title: "Register" });

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});

const { register, isPending } = useRegister();
const errorMessage = ref<string | null>(null);

const form = useForm({
  validationSchema: toTypedSchema(registrationSchema),
  keepValuesOnUnmount: true,
});

const { currentStep, totalSteps, canProceed, nextStep, prevStep } =
  useRegistrationWizard(form);

const handleSubmit = form.handleSubmit(
  async (values) => {
    errorMessage.value = null;
    try {
      await register({
        email: values.email,
        password: values.password,
        accountName: values.accountName,
        projectName: values.projectName,
        referralCode: values.referralCode,
      });
      toast.success("Registration successful! Please login.");
    } catch (err: any) {
      const detail =
        err?.data?.detail || "Registration failed. Please try again.";
      errorMessage.value = detail;
      toast.error(detail);
    }
  },
  (_errors) => {
    toast.error("Please check all required fields");
  }
);

// 👉 Track direction (for animation)
const direction = ref<"forward" | "backward">("forward");
watch(currentStep, (newVal, oldVal) => {
  direction.value = newVal > oldVal ? "forward" : "backward";
});

function getStepComponent(step: number) {
  switch (step) {
    case 1:
      return EmailStep;
    case 2:
      return PasswordStep;
    case 3:
      return AccountNameStep;
    case 4:
      return ProjectNameStep;
    case 5:
      return ReferralCodeStep;
    default:
      return EmailStep;
  }
}

</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2 overflow-hidden">
    <div class="flex items-center justify-center py-12 bg-card">
      <div class="mx-auto grid gap-6 w-full max-w-md px-4">
        <div class="grid gap-1 text-center mb-6">
          <AppLogo />
          <h1 class="text-3xl font-bold">Create new account</h1>
          <p class="text-balance text-muted-foreground">
            Already have an account?
            <AppLink to="/login">Sign in</AppLink>
          </p>
        </div>

        <!-- Error Alert -->
        <Alert
          v-if="errorMessage"
          variant="destructive"
          class="flex items-start gap-3"
        >
          <Icon name="lucide:circle-alert" class="text-lg" />
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <!-- Form -->
        <form 
          class="relative overflow-hidden" 
          @submit="handleSubmit"
        >
          <!-- Transition Wrapper -->
          <Transition
            :name="direction === 'forward' ? 'slide-left' : 'slide-right'"
            mode="out-in"
          >
            <component
              :is="getStepComponent(currentStep)"
              :key="currentStep"
              :disabled="isPending"
            />
          </Transition>

          <!-- Stepper -->
          <div class="mt-6">
            <RegistrationStepper
              :current-step="currentStep"
              :total-steps="totalSteps"
            />
          </div>

          <!-- Navigation -->
          <div class="mt-4">
            <NavigationButtons
              :current-step="currentStep"
              :total-steps="totalSteps"
              :is-pending="isPending"
              :can-proceed="!!canProceed"
              @next="
                direction = 'forward';
                nextStep();
              "
              @back="
                direction = 'backward';
                prevStep();
              "
            />
          </div>
        </form>
      </div>
    </div>

    <!-- Hero Image -->
    <div class="relative hidden bg-primary lg:block overflow-hidden w-full">
      <NuxtImg
        class="w-full absolute -right-[25%] top-1/2 -translate-y-1/2 scale-125 -rotate-3 rounded"
        alt="Image"
        src="/auth-hero.png"
      />
    </div>
  </div>
</template>

<style scoped>
/* Slide animations */
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>