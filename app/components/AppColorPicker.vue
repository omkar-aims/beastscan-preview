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
    v-slot="{ color, show }"
    v-model="currentColor"
    with-alpha
    with-hex-input
    with-rgb-input
    with-eye-dropper
    with-colors-history
  >
    <div class="flex items-center gap-3">
      <div
        class="rounded-full w-10 h-10 shadow-sm shadow-foreground cursor-pointer transition hover:scale-105"
        :style="{ backgroundColor: color.value }"
        :title="color.value"
        @click="show"
      />

      <Input
        v-model="color.value"
        type="text"
        class="w-[85%]"
        placeholder="#000000"
      />
    </div>
  </color-picker>
</template>
