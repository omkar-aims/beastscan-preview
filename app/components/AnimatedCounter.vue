<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number;
    duration?: number;
  }>(),
  {
    duration: 1000,
  }
);

const displayValue = ref(0);

function animateCount() {
  const start = 0;
  const end = props.value;
  const duration = props.duration;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    if (elapsed < duration) {
      const progress = elapsed / duration;
      displayValue.value = Math.floor(start + (end - start) * progress);
      requestAnimationFrame(update);
    } else {
      displayValue.value = end;
    }
  }

  requestAnimationFrame(update);
}

onMounted(animateCount);

watch(
  () => props.value,
  () => {
    animateCount();
  }
);
</script>

<template>
  <span>{{ displayValue.toLocaleString() }}</span>
</template>
