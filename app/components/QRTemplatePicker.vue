<script setup lang="ts">
import { qrTemplates } from "~/config/qrCodeTemplates";

defineEmits(["template-selected"]);
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-4">
    <template v-for="(qrTemplate, i) in qrTemplates" :key="i">
      <QRCodeCanvas
        class="cursor-pointer hover:scale-105 transition-transform duration-200 flex justify-center"
        :options="{ ...qrTemplate, data: 'https://www.google.com' }"
        @click="$emit('template-selected', qrTemplate)"
      />
    </template>
  </div>
</template>
