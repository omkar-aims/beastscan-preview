<script setup lang="ts">
import { useSidebar } from "~/components/ui/sidebar";

const isLoading = ref<boolean>(true);
const width = ref<number>(0);
const height = ref<number>(0);

const { toggleSidebar } = useSidebar();

onMounted(() => {
  width.value = window.innerWidth - 18;
  height.value = window.innerHeight;

  toggleSidebar();
});
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      class="w-full h-full flex justify-center items-center mt-12"
    >
      <div class="max-w-sm">
        <div class="flex flex-col items-center">
          <div class="loader my-6" />
          <AppHeading :level="3">Hang On!</AppHeading>
          <p class="text-muted-foreground">The builder is loading</p>
        </div>
      </div>
    </div>
    <iframe
      v-show="!isLoading"
      src="https://bw.aimsinfosoft.com/beast-builder/"
      :width="width"
      :height="height"
      @loadstart="isLoading = true"
      @load="isLoading = false"
    />
  </div>
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  position: relative;
  --c: no-repeat linear-gradient(var(--color-primary));
  background: var(--c) center/100% 10px, var(--c) center/10px 100%;
}
.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c) 0 0, var(--c) 100% 0, var(--c) 0 100%, var(--c) 100% 100%;
  background-size: 15.5px 15.5px;
  animation: l16 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}
@keyframes l16 {
  33% {
    inset: -10px;
    transform: rotate(0deg);
  }
  66% {
    inset: -10px;
    transform: rotate(90deg);
  }
  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}
</style>
