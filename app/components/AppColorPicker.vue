<template>
  <color-picker
    v-slot="{ color, show }"
    with-alpha
    with-hex-input
    with-rgb-input
    with-eye-dropper
    with-colors-history
  >
    <AppRow direction="horizontal">
      <div
        class="w-8 h-8 rounded-lg border border-foreground shadow-sm cursor-pointer"
        :style="{ background: color.value }"
        :title="color.value"
        @click="show"
      />

      <Input v-model="color.value" type="text" />
    </AppRow>
  </color-picker>
</template>
