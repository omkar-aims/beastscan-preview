<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registrationSchema } from "~/schemas/auth";
import { useRegister } from "~/composables/auth/useRegister";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";
import { toast } from "vue-sonner";

useHead({
  title: "Register",
});

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});

const { register, error } = useRegister();

const form = useForm({
  validationSchema: toTypedSchema(registrationSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  const payload = {
    email: values.email,
    password: values.password,
    accountName: values.accountName,
    projectName: values.projectName,
    referralCode: values.referralCode,     
  };

  const user = await register(payload);

  if (user && user.status === "ok") {
    toast.success("Register Sucessfuly");
    return navigateTo("/login");
  } else {
    error.value = user?.result?.message || "Something went wrong";
    form.resetForm();
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
        <Alert v-if="error" class="flex items-start gap-3">
          <Icon
            name="lucide:circle-alert"
            class="text-lg text-destructive-foreground"
          />
          <AlertDescription class="text-destructive-foreground">
            {{ error }}
          </AlertDescription>
        </Alert>

        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="accountName">
            <FormItem class="grid gap-2">
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="referralCode">
            <FormItem class="grid gap-2">
              <FormLabel>Referral Code (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter referral code (if any)"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full">
            <span>Register</span>
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
