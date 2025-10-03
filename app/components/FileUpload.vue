<script setup lang="ts">
const file = ref<string | null>(null);
const isFresh = ref(false);

const handleSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target?.files || !target.files[0]) return;

  file.value = URL.createObjectURL(target.files[0]);
  isFresh.value = true;

  setTimeout(() => {
    isFresh.value = false;
  }, 2000);
};
</script>

<template>
  <div>
    <slot :file="file" :handle-select="handleSelect" :is-fresh="isFresh" />
  </div>
</template>
