<script setup lang="ts">
import { ref } from "vue";

const file = ref<string | null>(null);

const handleSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target?.files || !target.files[0]) return;
  file.value = URL.createObjectURL(target.files[0]);
  console.log(file.value);
};
</script>

<template>
  <div>
    <slot :file="file" :handle-select="handleSelect" />
  </div>
</template>
