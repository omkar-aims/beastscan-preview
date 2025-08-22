<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center px-4">
    <div class="mx-auto max-w-2xl text-center space-y-6">
      <h1 class="text-4xl font-bold sm:text-5xl">🚀 Let&apos;s Get Started</h1>
      <p class="text-lg text-muted-foreground">
        Kickstart your journey with Beastscan V2 and take your campaigns, leads,
        and growth to the next level.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/register">
          <Button type="button" class="w-full sm:w-auto">Start Free</Button>
        </NuxtLink>
        <Button variant="outline" class="w-full sm:w-auto">Learn More</Button>
      </div>
    </div>
  </div>
</template>
