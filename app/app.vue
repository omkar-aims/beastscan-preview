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

    <Toaster position="top-center" theme="system" rich-colors />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
