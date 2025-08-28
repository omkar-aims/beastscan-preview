<script setup lang="ts">
import { ref, useSlots } from "vue";

withDefaults(
  defineProps<{
    effect?: "fade" | "rotate";
  }>(),
  { effect: "fade" }
);

const slots = useSlots();
const currentIndex = ref(0);

const toggle = () => {
  if (slots.default) {
    const count = slots.default().length;
    currentIndex.value = (currentIndex.value + 1) % count;
  }
};
</script>

<template>
  <Button variant="ghost" class="rounded-full w-8 h-8" @click="toggle">
    <Transition :name="effect" mode="out-in">
      <component :is="slots.default?.()[currentIndex]" :key="currentIndex" />
    </Transition>
  </Button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.2s cubic-bezier(0.65, 0, 0.35, 1);
  transform-style: preserve-3d;
}

.rotate-enter-from {
  transform: perspective(800px) rotateY(90deg);
}
.rotate-enter-to {
  transform: perspective(800px) rotateY(0deg);
}

.rotate-leave-from {
  transform: perspective(800px) rotateY(0deg);
}
.rotate-leave-to {
  transform: perspective(800px) rotateY(-90deg);
}
</style>
