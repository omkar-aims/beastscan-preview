<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Vibrant } from "node-vibrant/browser";

const palettes = [
  { name: "Ocean", colors: ["#0074D9", "#00A8FF"] },
  { name: "Sunset", colors: ["#FF6B6B", "#FBC15E"] },
  { name: "Forest", colors: ["#2ECC71", "#27AE60"] },
  { name: "Purple Haze", colors: ["#A259FF", "#8B3DCC"] },
  { name: "Fire", colors: ["#E74C3C", "#C0392B"] },
  { name: "Sky", colors: ["#3498DB", "#1A73E8"] },
  { name: "Mint", colors: ["#1ABC9C", "#16A085"] },
  { name: "Rose", colors: ["#FF007F", "#E60057"] },
];

const showCustomPicker = ref<boolean>(false);

const extractedColors = ref<string[]>([]);

function extractColorFromImage(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target?.files || !target.files[0]) return;

  const imagePath = URL.createObjectURL(target.files[0]);
  Vibrant.from(imagePath)
    .getPalette()
    .then((palette) => {
      Object.entries(palette).map(([_, swatch]) => {
        if (swatch?.hex) {
          extractedColors.value.push(swatch.hex.replace("#", ""));
        }
      });
    });
}
</script>

<template>
  <div class="grid grid-cols-[1fr_320px] gap-6">
    <div class="space-y-6">
      <div class="flex flex-wrap gap-6">
        <div
          v-for="palette in palettes"
          :key="palette.name"
          class="group cursor-pointer bg-card flex items-center justify-center gap-2 rounded-full py-2 px-4 hover:shadow"
        >
          <div class="rounded-full overflow-hidden h-8 w-8 flex">
            <div
              v-for="(color, i) in palette.colors"
              :key="i"
              :style="{ backgroundColor: color }"
              class="flex-1"
            />
          </div>

          <div class="text-sm font-medium text-center text-foreground">
            {{ palette.name }}
          </div>
        </div>

        <div
          class="group cursor-pointer bg-card flex items-center justify-center gap-2 rounded-full py-2 px-4 hover:shadow transition"
          @click="showCustomPicker = true"
        >
          <Plus class="w-4 h-4" />
          <div class="text-sm font-medium text-center text-foreground">
            Custom
          </div>
        </div>
      </div>
    </div>

    <div class="h-[428px] overflow-hidden flex justify-end">
      <NuxtImg
        src="templates/template-03.png"
        alt="Selected Template"
        class="h-full rounded-xl"
      />
    </div>

    <Dialog v-model:open="showCustomPicker">
      <DialogContent class="space-y-6 w-[360px]">
        <div class="px-4 my-4">
          <FileUpload v-slot="{ handleSelect, file }">
            <div
              class="relative"
              @drop.prevent="
                (e) => {
                  handleSelect(e);
                  extractColorFromImage(e);
                }
              "
            >
              <Input
                id="colorImage"
                type="file"
                class="hidden"
                accept="image/*"
                @change="(e: Event) => {
                          handleSelect(e);
                          extractColorFromImage(e);
                        }"
              />

              <label
                for="colorImage"
                class="group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 border-2 border-dashed flex flex-col items-center justify-center w-full h-48 bg-muted/20 hover:bg-muted/30 relative"
              >
                <NuxtImg
                  v-if="file"
                  :src="file"
                  class="w-full h-full object-contain"
                />

                <div
                  v-else
                  class="flex flex-col items-center gap-2 text-muted-foreground transition-opacity"
                >
                  <Image class="w-6 h-6" />
                  <span class="text-sm">Browse or drop an image</span>

                  <span class="text-xs text-muted-foreground/60">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </label>
            </div>
          </FileUpload>
        </div>

        <span
          v-if="extractedColors.length > 0"
          class="block font-semibold mb-2 mt-4 px-4 text-muted-foreground"
          >Detected Colors</span
        >

        <div
          v-if="extractedColors.length > 0"
          class="flex flex-wrap gap-4 m-4 mt-0"
        >
          <button
            v-for="color in extractedColors"
            :key="color"
            class="w-10 h-10 cursor-pointer border relative flex items-center justify-center transition-all duration-200 hover:scale-105"
            :class="['rounded-full border-muted']"
          >
            <Check v-motion-pop class="text-white w-8 h-8" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
