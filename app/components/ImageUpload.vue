<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";

withDefaults(
  defineProps<{
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
</script>

<template>
  <div>
    <Dialog v-model:open="showCropper">
      <DialogTrigger as-child>
        <div>
          <slot />
          <div
            class="mt-1 h-10 border border-input shadow-xs w-full bg-card rounded-md flex items-center text-muted-foreground px-4 cursor-pointer"
          >
            <span class="text-sm">
              {{ croppedImage ? "Change Image" : "Upload Image" }}
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent class="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Upload Profile Image</DialogTitle>
          <DialogDescription>
            Select an image to use as your profile picture.
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4">
          <div v-show="!image" class="grid gap-2">
            <Label for="profile-image">
              <div
                class="w-full py-8 rounded-lg transition-all duration-200 border-2 border-muted-foreground/50 border-dashed flex flex-col items-center justify-center cursor-pointer text-center"
              >
                <p>
                  <span class="text-primary font-semibold hover:underline"
                    >Click to upload</span
                  >
                  <span class="text-muted-foreground"> or drag and drop</span>
                </p>
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

          <div v-show="image">
            <Cropper
              class="h-96 w-[400px] bg-transparent"
              :src="image"
              :stencil-props="{
                aspectRatio,
              }"
              @change="onCropChange"
            />
          </div>
        </div>

        <DialogFooter v-if="image">
          <Button
            variant="destructive"
            @click="
              () => {
                image = null;
                croppedImage = null;
              }
            "
            >Reset</Button
          >
          <Button @click="handleSelect">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
