import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { generateQR } from '~/lib/generateQR'
import type { QROptions, QRFrameType } from '@/types/qr'
import { useDebounceFn } from '@vueuse/core'

const INITIAL_THEME: QROptions = {
  text: '',
  size: 150,
  margin: 5,
  type: 'png',
  dots: { type: 'square', coloring: 'solid', colors: ['#000000'], rotation: 0 },
  cornersSquare: { type: 'square', coloring: 'solid', colors: ['#000000'], rotation: 0 },
  cornersDot: { type: 'dot', coloring: 'solid', colors: ['#000000'], rotation: 0 },
  background: { coloring: 'solid', colors: ['#ffffff'], rotation: 0 },
  logoUrl: '',
  frame: {
    type: '',
    text: '',
    text_color: '',
    fill_color: '',
  },
}

export const useQRStore = defineStore('qr', () => {
  const config = ref<QROptions>(structuredClone(INITIAL_THEME))
  const generatedQR = ref<string | null>(null)
  const isGenerating = ref(false)

  const refreshQR = useDebounceFn(() => {
    if (config.value.text) {
      isGenerating.value = true
      generatedQR.value = generateQR(config.value)
    }
  }, 200)

  watch(
    () => [
      config.value.background,
      config.value.dots,
      config.value.cornersDot,
      config.value.cornersSquare,
    ],
    (sections) => {
      for (const section of sections) {
        section.coloring = section.colors.length > 1 ? 'linear' : 'solid'
      }
    },
    { deep: true },
  )

  watch(
    () => config.value,
    () => {
      refreshQR()
    },
    { deep: true, immediate: true },
  )

  const setLogo = (url: string) => {
    config.value.logoUrl = url
  }

  const setFrame = (frame: QRFrameType) => {
    config.value.frame = { ...frame }
    refreshQR()
  }

  const setTheme = (theme: object) => {
    config.value = { ...config.value, ...structuredClone(theme) }
    refreshQR()
  }

  const resetTheme = () => {
    config.value = { ...structuredClone(INITIAL_THEME), text: config.value.text }
    refreshQR()
  }

  return { config, generatedQR, refreshQR, setLogo, setTheme, resetTheme, setFrame, isGenerating }
})
