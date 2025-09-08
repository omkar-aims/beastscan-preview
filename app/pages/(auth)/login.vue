<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

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
  await login(values);
  if (values.username === "test@gmail.com" || values.password === "test1234") {
    await navigateTo("/dashboard");
  }

  if (error.value) {
    toast.error(error.value);
  }

  form.resetForm();
});
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid max-w-[350px] gap-6">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Sign in to your account</h1>
          <p class="text-balance text-muted-foreground">
            or
            <AppLink to="/register">create a new account</AppLink>
          </p>
        </div>

        <form class="grid gap-4" @submit="onSubmit">
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
          <div
            class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
          >
            <span
              class="relative z-10 bg-background px-2 text-muted-foreground"
            >
              Or continue with
            </span>
          </div>
          <div class="flex gap-4 flex-col md:flex-row">
            <Button variant="outline" class="w-full md:w-auto">
              <Icon name="logos:google-icon" /> <span>Login with</span> Google
            </Button>
            <Button variant="outline" class="w-full md:w-auto">
              <Icon name="logos:microsoft-icon" class="w-5 h-5" />
              Login with Microsoft
            </Button>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <NuxtImg
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        alt="Image"
        src="https://images.unsplash.com/photo-1567473030492-533b30c5494c?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
</template>
