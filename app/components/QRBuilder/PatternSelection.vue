<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Label from '@/components/ui/label/Label.vue'
import { formatPatternName } from '@/lib/formatPatternName'
import { useQRStore } from '@/stores/useQRStore'

const bodyPatterns = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded']

const cornerSquarePatterns = ['dot', 'square', 'extra-rounded','rounded','classy','classy-rounded']

const cornerEyePatterns = ['dot','dots', 'square','rounded','extra-rounded','classy','classy-rounded']

const qrStore = useQRStore()
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <Label>Body Pattern</Label>
      <Select v-model="qrStore.config.dots.type">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select body pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="pattern in bodyPatterns" :key="pattern" :value="pattern">
            {{ formatPatternName(pattern) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="space-y-2">
      <Label>Corner Square Pattern</Label>
      <Select v-model="qrStore.config.cornersSquare.type">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select corner square pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="pattern in cornerSquarePatterns" :key="pattern" :value="pattern">
            {{ formatPatternName(pattern) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="space-y-2">
      <Label>Corner Eye Pattern</Label>
      <Select v-model="qrStore.config.cornersDot.type">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select corner eye pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="pattern in cornerEyePatterns" :key="pattern" :value="pattern">
            {{ formatPatternName(pattern) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
