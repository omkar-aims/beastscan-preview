<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type OptionType = string | number;

type AcceptableValue = string | number | bigint | boolean | Record<string, any> | null;

const props = defineProps<{
  modelValue: OptionType | null;
  options: OptionType[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: OptionType | null): void;
}>();

function handleUpdate(value: AcceptableValue) {
  if (typeof value === "bigint") {
    emit("update:modelValue", value.toString());
  } else if (typeof value === "string" || typeof value === "number" || value === null) {
    emit("update:modelValue", value);
  }

}
</script>

<template>
  <Select
    :model-value="props.modelValue"
    @update:model-value="handleUpdate"
  >
    <SelectTrigger class="w-24 bg-muted-foreground/20 dark:bg-muted-foreground/30  focus:ring-pink-400">
      <SelectValue :placeholder="props.placeholder || 'Select'" />
    </SelectTrigger>

    <SelectContent class="w-24">
      <SelectItem
        v-for="option in props.options"
        :key="option"
        :value="option"
        class="cursor-pointer"
      >
        {{ option.toString().padStart(2, "0") }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
