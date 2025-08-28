<script setup lang="ts">
import { useRegisterForm } from "~/composables/useRegisterForm";
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";

useHead({
  title: "Register",
});

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});

const {
  step,
  formData,
  errorMessage,
  currentStep,
  enterClass,
  leaveClass,
  goNext,
  goBack,
  handleRegisterSubmit,
  steps,
} = useRegisterForm();
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2 overflow-x-hidden">
    <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
      <div class="max-w-md space-y-8">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Create an account</h1>
          <p class="text-balance text-muted-foreground">
            <span>or{{ " " }}</span>
            <AppLink to="/login">Login to your Account</AppLink>
          </p>
        </div>

        <Transition
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
          mode="out-in"
        >
          <form
            v-if="currentStep"
            :key="step"
            class="space-y-1"
            @submit.prevent="handleRegisterSubmit"
          >
            <!-- Fields per step -->
            <div
              v-for="field in currentStep.fields"
              :key="field.id"
              class="space-y-0"
            >
              <FormField v-slot="{ componentField }" :name="field.id">
                <FormItem class="grid">
                  <FormLabel :for="field.id">{{ field.label }}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      v-if="field.type === 'password'"
                      v-bind="componentField"
                      v-model="formData[field.id]"
                      :type="field.type"
                      :placeholder="field.placeholder"
                      :required="field.required"
                    />
                    <Input
                      v-if="field.type !== 'password'"
                      v-bind="componentField"
                      v-model="formData[field.id]"
                      :id="field.id"
                      :type="field.type"
                      :placeholder="field.placeholder"
                      :required="field.required"
                    />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>

            <!-- Error Message -->
            <p v-if="errorMessage" class="text-red-500 text-sm m-0 p-0">
              {{ errorMessage }}
            </p>

            <div
              class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4"
            >
              <Button
                v-if="step > 0"
                type="button"
                variant="outline"
                class="w-full sm:w-32"
                @click="goBack"
              >
                Back
              </Button>

              <Button
                v-if="step < steps.length - 1"
                type="button"
                class="w-full sm:w-32"
                @click="goNext"
              >
                Next
              </Button>

              <Button
                v-if="step === steps.length - 1"
                type="submit"
                class="w-full sm:w-32"
              >
                Submit
              </Button>
            </div>
          </form>
        </Transition>

        <div
          class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
          <span class="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div class="flex gap-4 flex-col md:flex-row w-full">
          <Button variant="outline" class="w-full md:w-auto">
            <Icon name="logos:google-icon" />Sign Up with Google
          </Button>
          <Button variant="outline" class="w-full md:w-auto">
            <Icon name="logos:microsoft-icon" class="w-5 h-5" />
            Sign Up with Microsoft
          </Button>
        </div>
      </div>
    </div>

    <!-- Right Section (Image) -->
    <div class="hidden lg:block overflow-hidden max-h-screen">
      <Transition
        :enter-active-class="enterClass"
        :leave-active-class="leaveClass"
        mode="out-in"
      >
        <NuxtImg
          v-if="currentStep"
          :key="step"
          :src="currentStep.image"
          class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          alt="Register Image"
        />
      </Transition>
    </div>
  </div>
</template>
