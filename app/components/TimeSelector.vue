<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import DropdownSelect from "@/components/DropdownSelect.vue";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const hours = Array.from({ length: 24 }, (_, i) => i + 1);
const minutes = [0, 15, 30, 45];

const selectedHour = ref<number | null>(null);
const selectedMinute = ref<number | null>(null);

// Initialize from modelValue
if (props.modelValue) {
  const [h, m] = props.modelValue.split(":").map((v) => Number(v) || 0);
  selectedHour.value = h ?? null;
  selectedMinute.value = m ?? null;
}

// Emit formatted value
watch([selectedHour, selectedMinute], ([h, m]) => {
  if (h !== null && m !== null) {
    const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    emit("update:modelValue", formatted);
  }
});
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Hour Dropdown -->
    <DropdownSelect
      v-model="selectedHour"
      :options="hours"
      placeholder="Hour"
      class="h-16"
    />

    <span class=" font-semibold">:</span>

    <!-- Minute Dropdown -->
    <DropdownSelect
      v-model="selectedMinute"
      :options="minutes"
      placeholder="Min"
    />
  </div>
</template>
