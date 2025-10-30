<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Input from '@/components/ui/input/Input.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const presetColors = [
  '#FACC15',
  '#FB923C',
  '#EF4444',
  '#E879F9',
  '#22C55E',
  '#3B82F6',
  '#8B5CF6',
  '#A16207',
  '#6B7280',
  '#000000',
]

const currentColor = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== currentColor.value) currentColor.value = val
  },
)

watch(currentColor, (val) => {
  if (val) emit('update:modelValue', val)
})
</script>

<template>
  <Popover>
    <PopoverTrigger class="w-full">
      <slot :currentColor="currentColor" />
    </PopoverTrigger>

    <PopoverContent class="max-w-[220px]">
      <div class="flex flex-wrap gap-3 justify-center items-center">
        <span
          v-for="color in presetColors"
          :key="color"
          class="w-8 h-8 block border border-border shadow-xs cursor-pointer rounded-md hover:shadow-md hover:border-primary transition-all"
          :style="{ backgroundColor: color }"
          @click="currentColor = color"
        />

        <Input type="text" v-model="currentColor" placeholder="#000000" class="w-20 text-center" />
      </div>
    </PopoverContent>
  </Popover>
</template>
