<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const is404 = props.error.statusCode === 404;
const title = is404 ? "Oops! Page not found." : "Something went wrong.";
const message = is404
  ? "The page you are looking for does not exist."
  : props.error.message || "Please try again later.";

console.log("Error stack:", props.error.stack);
</script>

<template>
  <main
    class="w-screen h-screen flex items-center justify-center bg-background px-4"
  >
    <Card class="p-10 text-center shadow-lg max-w-md w-full gap-0">
      <NuxtImg
        :src="is404 ? './404.svg' : './500.svg'"
        alt="Page not found"
        class="mx-auto"
        width="280"
      />

      <p class="text-2xl text-muted-foreground font-semibold">{{ title }}</p>
      <p class="text-lg text-muted-foreground mt-1" role="alert">
        {{ message }}
      </p>

      <NuxtLink to="/" class="mt-6">
        <Button size="lg" variant="default">Go Back Home</Button>
      </NuxtLink>
    </Card>
  </main>
</template>
