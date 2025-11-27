<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";

withDefaults(
  defineProps<{
    title: string;
    aspectRatio?: number;
  }>(),
  {
    aspectRatio: 1,
  }
);

const emit = defineEmits(["select"]);

const image = ref<null | string>();
const croppedImage = ref<null | string>();
const cropCanvas = ref<null | HTMLCanvasElement>(null);
const showCropper = ref<boolean>(false);

function handleChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  image.value = URL.createObjectURL(file);
}

function onCropChange({ _, canvas }) {
  cropCanvas.value = canvas;
}

function handleSelect() {
  if (!cropCanvas.value) return;
  showCropper.value = false;
  croppedImage.value = cropCanvas.value.toDataURL("image/png", 0.9);
  emit("select", croppedImage.value);
}

const config = useRuntimeConfig();
</script>

<template>
  <Dialog v-model:open="showCropper">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent
      class="sm:max-w-4xl bg-card max-h-[85vh] overflow-hidden flex flex-col"
    >
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          Upload an image or choose one of the presets.
        </DialogDescription>
      </DialogHeader>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
        <div class="overflow-y-auto pr-2">
          <div
            v-if="title === 'Banner Image'"
            class="grid grid-cols-2 gap-3 p-1 h-[256px]"
          >
            <NuxtImg
              v-for="i in 6"
              :key="i"
              :src="`/banners/0${i}.png`"
              class="cursor-pointer hover:ring-2 hover:ring-primary transition w-full h-full object-cover"
              @click="image = `${config.public.previewBase}banners/0${i}.png`"
            />
          </div>
          <div v-else class="grid grid-cols-2 gap-3 p-1 h-[256px]">
            <NuxtImg
              v-for="i in 10"
              :key="i"
              :src="`/avatars/0${i}.png`"
              class="cursor-pointer hover:ring-2 hover:ring-primary transition w-full h-full object-cover"
              @click="image = `${config.public.previewBase}avatars/0${i}.png`"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4 overflow-hidden">
          <div v-if="!image" class="flex-1">
            <Label for="profile-image">
              <div
                class="h-full min-h-[360px] w-full rounded-lg border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer text-center hover:border-primary transition"
              >
                <p class="text-sm">
                  <span class="text-primary font-semibold hover:underline">
                    Click to upload
                  </span>
                  <span class="text-muted-foreground">
                    or select from gallery</span
                  >
                </p>
                <p class="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP</p>
              </div>
            </Label>

            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleChange"
            />
          </div>

          <div v-else class="flex-1 flex items-center justify-center">
            <Cropper
              class="w-full max-w-[360px] h-[360px]"
              :src="image"
              :stencil-props="{ aspectRatio }"
              @change="onCropChange"
            />
          </div>
        </div>
      </div>

      <DialogFooter class="mt-4">
        <Button
          v-if="image"
          variant="outline"
          @click="
            () => {
              image = null;
              croppedImage = null;
            }
          "
        >
          Reset
        </Button>

        <Button v-else variant="outline" @click="showCropper = false">
          Close
        </Button>

        <Button @click="handleSelect"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
