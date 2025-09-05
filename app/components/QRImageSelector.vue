<script setup lang="ts">
const images = useQRImages();

defineEmits(["update:modelValue"]);
</script>

<template>
  <KeepAlive>
    <AppRow direction="horizontal" gap="sm">
      <template v-for="image in images" :key="image">
        <NuxtImg
          :src="image"
          width="32"
          height="32"
          class="cursor-pointer hover:scale-110 duration-100 transition-transform"
          @click="$emit('update:modelValue', image)"
        />
      </template>
    </AppRow>
  </KeepAlive>
</template>
