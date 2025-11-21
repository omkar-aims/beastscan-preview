<script setup="ts">
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";

useHead({
  titleTemplate: (title) => (title ? `${title} | Beastscan` : "Beastscan"),
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#f63b82" :height="5" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster position="top-center" theme="light" rich-colors />
  </div>
</template>
