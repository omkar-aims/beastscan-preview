<script setup lang="ts">
import { z } from "zod";

const {
  prevStep,
  currentStepIndex,
  state,
  nextStep,
  canProceed,
  errors,
  isAllStepCompleted,
} = useWizardAd({
  storageKey: "register",
  steps: [
    {
      key: "name",
      title: "Your name",
      description: "Please enter your name",
      data: {
        firstName: {
          value: "",
          validator: z.string().min(1),
        },
      },
    },
    {
      key: "address",
      title: "Your Address",
      description: "Please enter your address",
      data: {
        city: { value: "", validator: z.string().min(1) },
        country: { value: "", validator: z.string().min(1) },
      },
    },
  ],
});
</script>

<template>
  <div>
    <Form v-if="!isAllStepCompleted">
      <div v-if="currentStepIndex === 0">
        <FormField name="firstName">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                v-model="state.name.firstName"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormMessage>{{ errors.name.firstName }}</FormMessage>
          </FormItem>
        </FormField>
      </div>

      <div v-if="currentStepIndex === 1">
        <FormField name="city">
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input
                v-model="state.address.city"
                placeholder="Enter your city"
              />
            </FormControl>
            <FormMessage>{{ errors.address.city }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="country">
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input
                v-model="state.address.country"
                placeholder="Enter your country"
              />
            </FormControl>
            <FormMessage>{{ errors.address.country }}</FormMessage>
          </FormItem>
        </FormField>
      </div>

      <ClientOnly>
        <div class="flex gap-2 mt-4">
          <Button type="button" @click="prevStep">Prev</Button>
          <Button type="button" :disabled="!canProceed()" @click="nextStep"
            >Next</Button
          >
        </div>
      </ClientOnly>
    </Form>

    <div v-if="isAllStepCompleted">
      <h1>NICE</h1>
    </div>
  </div>
</template>
