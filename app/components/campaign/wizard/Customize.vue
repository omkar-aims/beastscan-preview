<script setup lang="ts">
import { Plus } from "lucide-vue-next";

import { applyColors } from "#imports";

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

const selected = ref<string>("Rose");

const emit = defineEmits(["done"]);
const props = defineProps<{
  theme: string;
  status: "idle" | "pending" | "error" | "success";
  extractedColors: (typeof palettes)[0][];
}>();

const template = ref<string>(props.theme);

function handleSelect() {
  emit("done", template.value);
}

const iframeRef = useTemplateRef("iframeRef");

const sendBuilderConfig = () => {
  const iframe = iframeRef.value;
  if (!iframe) return;

  iframe.contentWindow?.postMessage(
    {
      type: "builderSetConfig",
      config: template.value,
    },
    "*"
  );
};

onMounted(() => {
  const iframe = iframeRef.value;

  if (!iframe) return;

  const [primary, secondary] = palettes[0].colors;

  template.value = applyColors(props.theme, {
    primary,
    secondary,
  });

  window.addEventListener("message", (event: MessageEvent) => {
    if (event.data?.type === "builderReady") {
      sendBuilderConfig();
    }
  });
});

watch(
  () => template.value,
  (val) => {
    if (val) sendBuilderConfig();
  },
  { immediate: true }
);

watch(
  () => selected.value,
  (val) => {
    if (!val) return;

    const pallet = [...palettes, ...props.extractedColors].find(
      (p) => p.name === val
    );
    if (!pallet) return;

    const [primary, secondary] = pallet.colors;

    template.value = applyColors(props.theme, {
      primary,
      secondary,
    });
  }
);
</script>

<template>
  <div class="grid grid-cols-[1fr_320px] gap-6">
    <div class="space-y-6">
      <h2 class="text-lg font-semibold mb-2">Extracted Palettes</h2>

      <div class="flex flex-wrap gap-6">
        <div
          v-for="palette in extractedColors"
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
      </div>

      <h2 class="text-lg font-semibold mb-2">Predefined Palettes</h2>
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
      </div>

      <StatefulButton :status="status" @click="handleSelect">
        Create
      </StatefulButton>
    </div>
    <div class="flex justify-end">
      <div
        class="relative mx-auto bg-black rounded-[40px] p-4 shadow-2xl border border-gray-700"
        style="width: 320px; height: 600px"
      >
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20"
        />

        <div class="w-full h-full overflow-hidden rounded-[32px] bg-white">
          <iframe
            ref="iframeRef"
            src="https://beast-builder.netlify.app/?mode=view"
            width="286"
            height="600"
          />
        </div>
      </div>
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
