import { ref } from "vue";
import jsQR from "jsqr";

export function useQRCodeScannable() {
  const isScannable = ref<boolean | null>(null);
  const scanning = ref(false);

  const checkQRCode = async (rawCode: Blob) => {
    scanning.value = true;
    try {
      const bitmap = await createImageBitmap(rawCode);

      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        isScannable.value = false;
        return;
      }

      ctx.drawImage(bitmap, 0, 0);

      const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      isScannable.value = code !== null;
    } finally {
      scanning.value = false;
    }
  };

  return {
    isScannable,
    scanning,
    checkQRCode,
  };
}
