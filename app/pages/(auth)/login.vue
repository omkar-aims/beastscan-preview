<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";
</script>

<template>
  <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
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
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full"> Login </Button>
          <Button variant="outline" class="w-full"> Login with Google </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink class="underline" to="/register">Sign up</NuxtLink>
        </div>
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
