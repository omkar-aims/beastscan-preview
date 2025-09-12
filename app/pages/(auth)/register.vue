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

const { register, pending, error } = useRegister()

const form = useForm({
  validationSchema: toTypedSchema(registrationSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  const payload = {
    type: 'user',
    locale: navigator.language.split('-')[0],
    email: values.email,
    password: values.password,
  };

  const user = await register(payload); 

  if (user && user.status === 'ok') {
    toast.success("Register Sucessfuly")
    return navigateTo('/login');
  } else {
    error.value = user?.result?.message || 'Something went wrong';
    form.resetForm();
  }
});

</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid max-w-[350px] gap-6">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Create new account</h1>
          <p class="text-balance text-muted-foreground">
            or
            <AppLink to="/login">Sign in into existing Account</AppLink>
          </p>
        </div>

        <Alert v-if="error" class="flex items-start gap-3">
          <Icon
            name="lucide:circle-alert"
            class="text-lg text-destructive-foreground"
          />
          <AlertDescription class="text-destructive-foreground">
            {{ error }}
          </AlertDescription>
        </Alert>
       

        <form class="grid gap-4" @submit.prevent="onSubmit" >
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="grid gap-2">
              <FormLabel> Email </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your email"
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


          <Button type="submit" class="w-full">
            <span>Register</span>
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
              <Icon name="logos:google-icon" /> <span>Register with</span>Google
            </Button>
            <Button variant="outline" class="w-full md:w-auto">
              <Icon name="logos:microsoft-icon" class="w-5 h-5" />
              Register with Microsoft
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
