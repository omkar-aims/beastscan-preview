<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema } from "~/schemas/auth";
import { useLogin } from "~/composables/auth/useLogin";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";

useHead({
  title: "Login",
});

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});

const { login, pending, error } = useLogin();

const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  const user = await login(values);

  if (user) return navigateTo("/dashboard");

  form.resetForm();
});
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12 bg-card">
      <div class="mx-auto grid gap-6 w-sm max-w-sm">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Sign in to your account</h1>
          <p class="text-balance text-muted-foreground">
            or
            <AppLink to="/register">create a new account</AppLink>
          </p>
        </div>

        <Alert v-if="error" class="flex items-start gap-3">
          <Icon name="lucide:circle-alert" class="text-lg text-destructive" />
          <AlertDescription class="text-destructive">
            {{ error }}
          </AlertDescription>
        </Alert>

        <form class="grid gap-4" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem class="grid gap-2">
              <FormLabel> Username </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="rememberMe">
            <FormItem class="flex gap-2">
              <FormControl>
                <Checkbox v-bind="componentField" />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="pending">
            <Icon
              v-if="pending"
              name="svg-spinners:180-ring-with-bg"
              class="w-5 h-5"
            />
            <span>{{ pending ? "Logging in" : "Login" }}</span>
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
