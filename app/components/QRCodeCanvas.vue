<script setup lang="ts">
import { NuxtImg } from "#components";
import QRCodeStyling from "qr-code-styling";

const props = withDefaults(
  defineProps<{ options: object; allowPreview?: boolean }>(),
  { allowPreview: true }
);

const qrCodePreviewRef = useTemplateRef("qrCodePreviewRef");
const qrImageUrl = ref<string>("");

onMounted(async () => {
  if (qrCodePreviewRef.value) {
    const qrPreview = new QRCodeStyling(props.options);
    qrPreview.append(qrCodePreviewRef.value);

    if (props.allowPreview) {
      const qrLarge = new QRCodeStyling({
        ...props.options,
        width: 350,
        height: 350,
      });

      const blob = (await qrLarge.getRawData("png")) as Blob;
      if (blob) {
        qrImageUrl.value = URL.createObjectURL(blob);
      }
    }
  }
});
</script>

<template>
  <Dialog v-if="props.allowPreview">
    <DialogTrigger>
      <div ref="qrCodePreviewRef" class="cursor-pointer" />
    </DialogTrigger>

    <DialogContent class="bg-transparent border-0">
      <DialogHeader class="sr-only">
        <DialogTitle>Scan QR</DialogTitle>
        <DialogDescription>
          Scan your QR code to open preview
        </DialogDescription>
      </DialogHeader>

      <NuxtImg
        v-if="qrImageUrl"
        :src="qrImageUrl"
        alt="QR Code"
        width="350"
        height="350"
        class="mx-auto"
      />
    </DialogContent>
  </Dialog>

  <div v-else ref="qrCodePreviewRef" />
</template>
