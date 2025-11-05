<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registrationSchema } from "~/schemas/auth";
import { useRegister } from "~/composables/auth/useRegister";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";
import { toast } from "vue-sonner";
import { ref } from "vue";

useHead({
  title: "Register",
});

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});

const { register, isPending } = useRegister();
const errorMessage = ref<string | null>(null);

const form = useForm({
  validationSchema: toTypedSchema(registrationSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  errorMessage.value = null;
  
  try {
    await register({
      email: values.email,
      password: values.password,
    });
    
    toast.success("Registration successful! Please login.");
  } catch (err: any) {
    // Extract the detail message from the error response
    const detail = err?.data?.detail  || "Registration failed. Please try again.";
    errorMessage.value = detail;
    toast.error(detail);
  }
});
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12 bg-card">
      <div class="mx-auto grid gap-6 w-sm max-w-sm">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Create new account</h1>
          <p class="text-balance text-muted-foreground">
            Already have an account?
            <AppLink to="/login">Sign in</AppLink>
          </p>
        </div>

        <!-- Error Alert -->
        <Alert v-if="errorMessage" variant="destructive" class="flex items-start gap-3">
          <Icon
            name="lucide:circle-alert"
            class="text-lg"
          />
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  v-bind="componentField"
                  :disabled="isPending"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  v-bind="componentField"
                  :disabled="isPending"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isPending">
            <Icon v-if="isPending" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
            <span>{{ isPending ? "Creating account..." : "Register" }}</span>
          </Button>
        </form>
      </div>
    </div>
    <div class="relative hidden bg-primary lg:block overflow-hidden w-full">
      <NuxtImg
        class="w-full absolute -right-[25%] top-1/2 -translate-y-1/2 scale-125 -rotate-3 rounded"
        alt="Image"
        src="/auth-hero.png"
      />
    </div>
  </div>
</template>