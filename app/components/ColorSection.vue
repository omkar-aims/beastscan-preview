<script setup lang="ts">
import { computed, watch } from 'vue'
import { Plus, Trash2 } from 'lucide-vue-next'
import ColorPicker from '@/components/QRColourPicker.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { useQRStore } from '@/stores/useQRStore'

const qrStore = useQRStore()

const sections = computed(() => [
  { label: 'Background Color', key: 'background', data: qrStore.config.background },
  { label: 'Pattern Color', key: 'pattern', data: qrStore.config.dots },
  { label: 'Corner Square Color', key: 'cornerSquare', data: qrStore.config.cornersSquare },
  { label: 'Corner Eye Color', key: 'cornerEye', data: qrStore.config.cornersDot },
])

watch(
  () => qrStore.config,
  () => qrStore.refreshQR(),
  { deep: true },
)
</script>

<template>
  <Accordion type="single" collapsible>
    <div class="space-y-3">
      <AccordionItem v-for="section in sections" :key="section.key" :value="section.key">
        <AccordionTrigger class="px-4 py-2 font-medium text-sm">
          {{ section.label }}
        </AccordionTrigger>

        <AccordionContent>
          <div class="p-4 space-y-3">
            <div class="space-y-2">
              <div
                v-for="(_, colorIndex) in section.data.colors"
                :key="colorIndex"
                class="grid grid-cols-[32px_1fr_32px] gap-2 items-center"
              >
                <ColorPicker v-slot="{ currentColor }" v-model="section.data.colors[colorIndex]">
                  <div
                    class="w-8 h-8 rounded-md border border-border cursor-pointer shadow-xs"
                    :style="{ backgroundColor: currentColor }"
                  />
                </ColorPicker>

                <Input
                  v-model="section.data.colors[colorIndex]"
                  class="w-full"
                  placeholder="#000000"
                />

                <Button
                  v-if="section.data.colors.length > 1"
                  variant="ghost"
                  size="icon"
                  @click="section.data.colors.splice(colorIndex, 1)"
                >
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              v-if="section.data.colors.length < 2"
              variant="outline"
              size="sm"
              class="mt-2"
              @click="section.data.colors.push('#000000')"
            >
              <Plus class="w-4 h-4 mr-1" /> Add color
            </Button>

            <div v-if="section.data.colors.length > 1" class="flex items-center gap-2 mt-3">
              <span class="text-sm text-muted-foreground">Rotation</span>
              <Input
                v-model.number="section.data.rotation"
                type="number"
                class="w-24"
                min="0"
                max="360"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  </Accordion>
</template>
