<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    shapes?: string[];
    id: string;
    modelValue?: string;
  }>(),
  {
    shapes: () => [
      "square",
      "dots",
      "rounded",
      "extra-rounded",
      "classy",
      "classy-rounded",
    ],
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selectedShape = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const getBorderRadius = (shape: string) => {
  switch (shape) {
    case "square":
      return "0";
    case "dots":
      return "50%";
    case "rounded":
      return ".25rem";
    case "extra-rounded":
      return ".5rem";
    case "classy":
      return "0.5rem 0 0.5rem 0";
    case "classy-rounded":
      return "1rem 0 1rem 0";
    default:
      return "0";
  }
};
</script>

<template>
  <RadioGroup v-model="selectedShape" class="flex gap-2">
    <template v-for="(shape, i) in shapes" :key="i">
      <div class="flex items-center">
        <RadioGroupItem :id="`${id}-${shape}`" class="hidden" :value="shape" />
        <Label
          :for="`${id}-${shape}`"
          class="flex items-center justify-center cursor-pointer"
        >
          <div
            class="w-8 h-8 bg-foreground"
            :style="{ borderRadius: getBorderRadius(shape) }"
          />
        </Label>
      </div>
    </template>
  </RadioGroup>
</template>
