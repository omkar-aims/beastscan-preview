<script setup lang="ts">
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";

const props = defineProps<{
  modelValue?: string;
  defaultValue?: string;
  class?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const showPassword = ref(false);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="relative w-full">
    <Input
      v-model="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :class="['pr-10', props.class]"
      data-slot="input"
    />

    <Button
      type="button"
      variant="ghost"
      size="sm"
      class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent active:animate-spin"
      tabindex="-1"
      @click="showPassword = !showPassword"
    >
      <Icon
        class="text-lg text-muted-foreground"
        :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
      />
    </Button>
  </div>
</template>
