<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";
import { toast } from "vue-sonner";
import type { QROption } from "~/types/campaign";

const props = defineProps<{
  title: string;
  qrOptions: QROption;
}>();

const qrCode = ref<QRCodeStyling | null>(null);

onMounted(() => {
  qrCode.value = new QRCodeStyling(props.qrOptions as object);
});

function download(format: "png" | "jpeg" | "svg") {
  if (!qrCode.value) return;

  qrCode.value.download({
    name: props.title.split(" ").join("-"),
    extension: format,
  });

  toast.success("QR code downloaded");
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="download('png')">PNG</DropdownMenuItem>
      <DropdownMenuItem @click="download('jpeg')">JPEG</DropdownMenuItem>
      <DropdownMenuItem @click="download('svg')">SVG</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
