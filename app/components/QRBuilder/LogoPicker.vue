<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import logos from '@/constants/logos'
import { useQRStore } from '@/stores/useQRStore'

const qrStore = useQRStore()

const customLogoURL = ref<string>('')
</script>

<template>
  <Popover>
    <PopoverTrigger class="w-full">
      <slot />
    </PopoverTrigger>

    <PopoverContent
      class="max-h-60 w-64 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-card [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <Input
        placeholder="Paste Logo URL"
        v-model="customLogoURL"
        class="w-full"
        @change="qrStore.setLogo(customLogoURL)"
      />
      <div>
        <p class="text-sm text-muted-foreground mb-1">Choose from our library</p>

        <div class="grid grid-cols-4 gap-4">
          <button
            class="flex justify-center items-center w-10 h-10 rounded-md border border-border p-2 cursor-pointer hover:shadow-md hover:border-primary transition-all duration-200"
            @click="qrStore.setLogo('')"
            type="button"
          >
            <X class="w-5 h-5" />
          </button>

          <img
            v-for="logo in logos"
            :key="logo"
            :src="logo"
            :alt="logo"
            class="w-10 h-10 rounded-md border border-border p-2 object-contain cursor-pointer hover:shadow-md hover:border-primary transition-all duration-200"
            @click="qrStore.setLogo(logo)"
          />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
