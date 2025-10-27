<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-vue-next";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedTime = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const times = Array.from({ length: 24 * 4 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});

const selectTime = (time: string) => {
  selectedTime.value = time;
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-[140px] justify-between">
        <span>{{ selectedTime || "Select time" }}</span>
        <Clock class="h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="p-0 w-[160px]">
      <Command>
        <CommandGroup>
          <div class="max-h-[200px] overflow-y-auto">
            <CommandItem
              v-for="time in times"
              :key="time"
              :value="time"
              @select="selectTime(time)"
            >
              {{ time }}
            </CommandItem>
          </div>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>
