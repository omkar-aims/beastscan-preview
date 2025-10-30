<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import frameJson from '@/data/frame.json'
import type { QRFrameType } from '@/types/qr'
import { X, CheckCircle2 } from 'lucide-vue-next'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import QRColorPicker from '@/components/QRColourPicker.vue'

import { useQRStore } from '@/stores/useQRStore'
const qrStore = useQRStore()

type FrameType = {
  value: string
  label: string
}

const frames = frameJson as FrameType[]

const initialFrame: QRFrameType = {
  type: '',
  text: '',
  text_color: '',
  fill_color: '',
}

const frame = ref<QRFrameType>(
  qrStore.config.frame ? { ...qrStore.config.frame } : { ...initialFrame },
)

onMounted(() => {
  if (!qrStore.config.frame) {
    qrStore.config.frame = { ...initialFrame }
  }
})

watch(
  () => qrStore.config.frame,
  (latestFrame) => {
    frame.value = latestFrame ? { ...latestFrame } : { ...initialFrame }
  },
  { deep: true, immediate: true },
)

watch(
  frame,
  (updatedFrame) => {
    if (qrStore.config.frame) {
      Object.assign(qrStore.config.frame, updatedFrame)
    }
  },
  { deep: true },
)

const removeFrame = () => {
  qrStore.config.frame = { ...initialFrame }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 lg:grid-cols-6 gap-3">
      <div
        key="no-frame"
        class="rounded-sm cursor-pointer transition-transform duration-200 hover:scale-105 border-2 border-border flex justify-center items-center"
        @click="removeFrame"
      >
        <X class="text-muted-foreground w-8 h-8" />
      </div>

      <div
        v-for="f in frames"
        :key="f.value"
        class="cursor-pointer transition-transform duration-200 hover:scale-105 relative"
        @click="frame.type = f.value"
      >
        <img
          class="w-full h-24 object-contain"
          :src="`https://my.beastscan.com/images/frames/${f.value}.svg`"
          :alt="f.label"
        />
        <CheckCircle2
          v-if="frame.type === f.value"
          class="absolute top-2 right-2 text-primary bg-white rounded-full"
        />
      </div>
    </div>

    <div v-if="qrStore.config.frame?.type" class="space-y-4">
      <div class="space-y-1">
        <Label for="frameText">Frame Text</Label>
        <Input id="frameText" v-model="frame.text" placeholder="Enter frame text" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1">
          <Label>Text Color</Label>
          <QRColourPicker v-slot="{ currentColor }" v-model="frame.text_color" >
            <div class="grid grid-cols-[32px_1fr] gap-2">
              <div
                class="w-8 h-8 rounded-md border border-border shadow-xs cursor-pointer"
                :style="{ backgroundColor: currentColor || '#000000' }"
              ></div>
              <Input v-model="frame.text_color" placeholder="#000000" />
            </div>
          </QRColourPicker>
        </div>

        <div class="space-y-1">
          <Label>Fill Color</Label>
          <QRColorPicker v-model="frame.fill_color" v-slot="{ currentColor }">
            <div class="grid grid-cols-[32px_1fr] gap-2">
              <div
                class="w-8 h-8 rounded-md border border-border shadow-xs cursor-pointer"
                :style="{ backgroundColor: currentColor || '#ffffff' }"
              ></div>
              <Input v-model="frame.fill_color" placeholder="#ffffff" />
            </div>
          </QRColorPicker>
        </div>
      </div>
    </div>
  </div>
</template>
