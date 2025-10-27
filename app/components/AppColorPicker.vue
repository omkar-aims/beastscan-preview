<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "#ffffff",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const currentColor = ref(props.modelValue);

watch(currentColor, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <color-picker
    v-model="currentColor"
    with-alpha
    with-hex-input
    with-rgb-input
    with-eye-dropper
    with-colors-history
  >
    <div class="flex items-center gap-3" />
  </color-picker>
</template>
