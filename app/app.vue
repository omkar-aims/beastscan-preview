<script setup="ts">
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div class="max-h-dvh overflow-hidden">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster />
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
