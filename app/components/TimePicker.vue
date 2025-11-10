<!-- TimePicker.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { Clock } from "lucide-vue-next";
import { cn } from "~/lib/utils";

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const minutes = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const meridiems = ["AM", "PM"];

const selectedHour = ref("12");
const selectedMinute = ref("0");
const selectedMeridiem = ref("AM");

const formattedTime = computed(
  () =>
    `${selectedHour.value}:${selectedMinute.value} ${selectedMeridiem.value}`
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'group h-10 w-[200px] justify-start text-left font-normal bg-card border border-input text-sm',
            'hover:bg-accent hover:text-accent-foreground transition-colors rounded-md hover:border-primary',
            !formattedTime && 'text-muted-foreground'
          )
        "
      >
        <Clock
          class="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary-foreground"
        />
        <span>{{ formattedTime || "Select time" }}</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="w-[260px] p-4 rounded-md border border-border bg-popover shadow-md space-y-4"
    >
      <div class="text-sm font-medium text-muted-foreground mb-2">
        Select Time
      </div>

      <div class="flex items-center justify-between gap-2">
        <Select v-model="selectedHour">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="h in hours" :key="h" :value="h" class="text-sm">
              {{ h }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedMinute">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="m in minutes"
              :key="m"
              :value="m"
              class="text-sm"
            >
              {{ m }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedMeridiem">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="p in meridiems"
              :key="p"
              :value="p"
              class="text-sm"
            >
              {{ p }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </PopoverContent>
  </Popover>
</template>
