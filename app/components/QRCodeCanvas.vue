<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";

const props = defineProps<{ options: object }>();

const qrCodePreviewRef = useTemplateRef("qrCodePreviewRef");

onMounted(async () => {
  if (qrCodePreviewRef.value) {
    const qrCode = new QRCodeStyling(props.options);
    qrCode.append(qrCodePreviewRef.value);
  }
});
</script>

<template>
  <div ref="qrCodePreviewRef" />
</template>
