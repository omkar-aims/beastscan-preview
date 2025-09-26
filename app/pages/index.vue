<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute right-0 top-0 h-[70%] w-[60%] bg-primary/20 rounded-bl-[100px] blur-3xl"
    />

    <div
      class="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-dvh px-6 lg:px-16"
    >
      <div class="space-y-6 text-center md:text-left">
        <Badge variant="secondary" class="rounded-full px-4 py-1 text-sm">
          🚀 Beastscan V2
        </Badge>

        <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
          Build <span class="text-primary">Forms</span>,
          <span class="text-primary">QR Codes</span> &
          <span class="text-primary">Sites</span> — All-in-One.
        </h1>

        <p class="text-lg text-muted-foreground leading-relaxed">
          Create, customize, and track high-performing campaigns with Beastscan
          V2. Perfect for marketers, teams, and creators — no coding required.
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <NuxtLink to="/login">
            <Button size="lg" class="w-full sm:w-auto">Start Free</Button>
          </NuxtLink>
          <Button size="lg" variant="outline" class="w-full sm:w-auto">
            Learn More
          </Button>
        </div>
      </div>

      <div class="flex justify-center relative">
        <div
          class="w-[85%] sm:w-[70%] lg:w-[100%] aspect-[4/3] overflow-hidden"
        >
          <NuxtImg
            src="/hero.svg"
            alt="Campaign dashboard preview"
            class="w-full h-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
