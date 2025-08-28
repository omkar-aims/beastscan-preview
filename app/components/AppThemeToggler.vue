<script setup lang="ts">
import { Icon } from "@iconify/vue";

const colorMode = useColorMode();

function toggleTheme() {
  if (colorMode.preference === "system") {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  } else {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  }
}
</script>

<template>
  <SwapIcons effect="rotate" @click="toggleTheme">
    <Icon icon="lucide:sun" class="h-[1.2rem] w-[1.2rem]" />
    <Icon icon="lucide:moon" class="h-[1.2rem] w-[1.2rem]" />
  </SwapIcons>
  <span class="sr-only">Toggle theme</span>
</template>
