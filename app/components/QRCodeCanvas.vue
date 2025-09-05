<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";

const props = defineProps<{ options: object }>();

const qrCodePreviewRef = useTemplateRef("qrCodePreviewRef");

const qrCode = new QRCodeStyling(props.options);

onMounted(async () => {
  if (qrCodePreviewRef.value) {
    qrCode.append(qrCodePreviewRef.value);
  }
});
</script>

<template>
  <div ref="qrCodePreviewRef" />
</template>
