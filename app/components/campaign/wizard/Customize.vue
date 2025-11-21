<script setup lang="ts">
import { Plus, Image } from "lucide-vue-next";
import { nanoid } from "nanoid";
import { Vibrant } from "node-vibrant/browser";

const palettes = [
  { name: "Rose", colors: ["#FF007F", "#E60057"] },
  { name: "Ocean", colors: ["#0074D9", "#00A8FF"] },
  { name: "Sunset", colors: ["#FF6B6B", "#FBC15E"] },
  { name: "Forest", colors: ["#2ECC71", "#27AE60"] },
  { name: "Purple Haze", colors: ["#A259FF", "#8B3DCC"] },
  { name: "Fire", colors: ["#E74C3C", "#C0392B"] },
  { name: "Sky", colors: ["#3498DB", "#1A73E8"] },
  { name: "Mint", colors: ["#1ABC9C", "#16A085"] },
];

const customColor = ref<{ primary: string; secondary: string }>({
  primary: "",
  secondary: "",
});

const showCustomPicker = ref<boolean>(false);
const selectedImage = ref<string | null>(null);
const extractedPairs = ref<null | (typeof palettes)[0]>(null);

async function extractColorPairsFromImage(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target?.files || !target.files[0]) return;

  const imagePath = URL.createObjectURL(target.files[0]);
  selectedImage.value = imagePath;

  extractedPairs.value = null;

  const palette = await Vibrant.from(imagePath).getPalette();

  const swatches = Object.values(palette)
    .filter((s) => s?.hex)
    .map((s) => ({
      hex: s.hex,
      population: s.population ?? 0,
    }));

  swatches.sort((a, b) => b.population - a.population);

  const unique = Array.from(new Set(swatches.map((s) => s.hex)));

  const pairs = [];

  for (let i = 0; i < unique.length - 1; i++) {
    pairs.push({
      name: nanoid(),
      colors: [unique[i], unique[i + 1]],
    });

    if (pairs.length >= 4) break;
  }

  if (pairs) extractedPairs.value = pairs;
}

const selected = ref<string>("Rose");

const emit = defineEmits(["done"]);
const props = defineProps<{
  theme: string;
  status: "idle" | "pending" | "error" | "success";
}>();

function handleSelect() {
  if (!selected.value) return;
  const pallet = palettes.find((p) => p.name === selected.value);

  if (!pallet) return;

  const [primary, secondary] = pallet.colors;

  let updatedTemplate = props.theme.replaceAll("PRIMARY_COLOR", primary);
  updatedTemplate = updatedTemplate.replaceAll("SECONDARY_COLOR", secondary);
  emit("done", updatedTemplate);
}
</script>

<template>
  <div class="grid grid-cols-[1fr_320px] gap-6">
    <div class="space-y-6">
      <div class="flex flex-wrap gap-6">
        <div
          v-for="palette in palettes"
          :key="palette.name"
          class="active:translate-y-1 ring-2 duration-200 transition-transform group cursor-pointer bg-card flex items-center justify-center gap-2 rounded-full py-2 px-4 hover:shadow"
          :class="
            palette.name === selected ? 'ring-primary' : 'ring-transparent'
          "
          @click="selected = palette.name"
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
          :class="
            customColor.primary !== '' && customColor.secondary !== ''
              ? 'ring-primary'
              : 'ring-transparent'
          "
          @click="showCustomPicker = true"
        >
          <Plus class="w-4 h-4" />
          <div class="text-sm font-medium text-center text-foreground">
            Custom
          </div>
        </div>
        <label
          class="group cursor-pointer bg-card flex items-center justify-center gap-2 rounded-full py-2 px-4 hover:shadow transition"
          for="pickImage"
        >
          <Image class="w-4 h-4" />
          <div class="text-sm font-medium text-center text-foreground">
            Pick from image
          </div>
          <Input
            id="pickImage"
            type="file"
            class="hidden"
            @change="extractColorPairsFromImage"
          />
        </label>
      </div>

      <StatefulButton :status="status" @click="handleSelect">
        Create
      </StatefulButton>
    </div>

    <div class="h-[428px] overflow-hidden flex justify-end">
      <NuxtImg
        src="templates/template-03.png"
        alt="Selected Template"
        class="h-full rounded-xl"
      />
    </div>

    <Dialog v-model:open="showCustomPicker">
      <DialogContent class="max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Choose a custom color</DialogTitle>
        </DialogHeader>
        <div class="space-y-6">
          <div>
            <label
              for="primaryColor"
              class="block font-medium text-sm mb-2 text-muted-foreground"
            >
              Primary Color
            </label>

            <div class="flex justify-center items-center gap-2">
              <span
                class="w-10 h-10 block rounded-full border border-muted-foreground/50 shrink-0"
                :style="{
                  backgroundColor: customColor.primary || '#ffffff',
                }"
              />
              <Input
                id="primaryColor"
                v-model="customColor.primary"
                placeholder="Enter hex code"
                class="bg-muted shadow-none"
              />
            </div>
          </div>

          <div>
            <label
              for="secondaryColor"
              class="block font-medium text-sm mb-2 text-muted-foreground"
            >
              Secondary Color
            </label>

            <div class="flex justify-center items-center gap-2">
              <span
                class="w-10 h-10 block rounded-full border border-muted-foreground/50 shrink-0"
                :style="{
                  backgroundColor: customColor.secondary || '#000000',
                }"
              />
              <Input
                id="secondaryColor"
                v-model="customColor.secondary"
                placeholder="Enter hex code"
                class="bg-muted shadow-none"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button>Done</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
