<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";
import redirectIfAuthenticated from "~/middleware/redirectIfAuthenticated";

definePageMeta({
  layout: false,
  middleware: [redirectIfAuthenticated],
});
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Create an Account</h1>
          <p class="text-balance text-muted-foreground">
            Enter your details below to get started
          </p>
        </div>

        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" required />
          </div>

          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          <div class="grid gap-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" required />
          </div>

          <Button type="submit" class="w-full"> Sign Up </Button>
          <Button variant="outline" class="w-full">
            Sign up with Google
          </Button>
        </div>

        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink class="underline" to="/login">Login</NuxtLink>
        </div>
      </div>
    </div>

    <div class="hidden bg-muted lg:block">
      <NuxtImg
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        alt="Register Image"
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
      />
    </div>
  </div>
</template>
