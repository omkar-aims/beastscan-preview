<script setup lang="ts">
import { CheckCircle2, Plus } from "lucide-vue-next";
import { TwitterPicker } from "vue-color";

import { applyColors } from "#imports";
import { nanoid } from "nanoid";

const palettes = [
  { name: "Rose", colors: ["#FF007F", "#E60057"] },
  { name: "Ocean", colors: ["#0074D9", "#00A8FF"] },
  { name: "Sunset", colors: ["#FF6B6B", "#FBC15E"] },
  { name: "Forest", colors: ["#2ECC71", "#27AE60"] },
  { name: "Purple Haze", colors: ["#A259FF", "#8B3DCC"] },
  { name: "Fire", colors: ["#E74C3C", "#C0392B"] },
  { name: "Mint", colors: ["#1ABC9C", "#16A085"] },
];

const customColor = reactive<{ primary: string; secondary: string }>({
  primary: "#333333",
  secondary: "#333333",
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

    let pallet;

    if (val.startsWith("custom")) {
      pallet = {
        name: "custom",
        colors: [customColor.primary, customColor.secondary],
      };
    } else {
      pallet = [...palettes, ...props.extractedColors].find(
        (p) => p.name === val
      );
    }

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
  <div class="grid grid-cols-[1fr_600px] gap-8">
    <div class="space-y-8">
      <div v-if="extractedColors.length > 0" class="space-y-2">
        <h2 class="font-semibold text-muted-foreground">Extracted palettes</h2>

        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="palette in extractedColors"
            :key="palette.name"
            class="relative group flex items-center gap-4 rounded-lg p-4 bg-card ring-1 transition shadow-sm"
            :class="selected === palette.name ? 'ring-primary' : 'ring-card'"
            @click="selected = palette.name"
          >
            <div
              class="shrink-0 flex h-12 w-12 overflow-hidden rounded-full ring-2 ring-background"
            >
              <span
                v-for="(color, i) in palette.colors"
                :key="i"
                class="flex-1"
                :style="{ backgroundColor: color }"
              />
            </div>

            <div class="text-left">
              <div class="text-sm font-semibold">
                {{ palette.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ palette.colors[0] }}&nbsp;/&nbsp;{{ palette.colors[1] }}
              </div>
            </div>

            <CheckCircle2
              v-if="selected === palette.name"
              class="absolute top-2 right-2 w-6 h-6 text-primary"
            />
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <h2 class="font-semibold text-muted-foreground">Predefined palettes</h2>

        <div class="grid grid-cols-2 gap-4">
          <button
            class="relative group flex items-center gap-4 rounded-lg p-4 bg-card ring-1 transition shadow-sm"
            :class="
              selected.startsWith('custom') ? 'ring-primary' : 'ring-border'
            "
            @click="showCustomPicker = true"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-muted ring-2 ring-background"
            >
              <Plus class="w-5 h-5 text-muted-foreground" />
            </div>

            <div class="text-left">
              <div class="text-sm font-semibold">Custom</div>
              <div class="text-xs text-muted-foreground">
                {{
                  selected.startsWith("custom")
                    ? `${customColor.primary}&nbsp;/&nbsp;${customColor.secondary}`
                    : "Pick your own colors"
                }}
              </div>
            </div>

            <CheckCircle2
              v-if="selected.startsWith('custom')"
              class="absolute top-2 right-2 w-6 h-6 text-primary"
            />
          </button>

          <button
            v-for="palette in palettes"
            :key="palette.name"
            class="relative group flex items-center gap-4 rounded-lg p-4 bg-card ring-1 transition shadow-sm"
            :class="selected === palette.name ? 'ring-primary' : 'ring-border'"
            @click="selected = palette.name"
          >
            <div
              class="shrink-0 flex h-12 w-12 overflow-hidden rounded-full ring-2 ring-background"
            >
              <span
                v-for="(color, i) in palette.colors"
                :key="i"
                class="flex-1"
                :style="{ backgroundColor: color }"
              />
            </div>

            <div class="text-left">
              <div class="text-sm font-semibold">
                {{ palette.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ palette.colors[0] }}&nbsp;/&nbsp;{{ palette.colors[1] }}
              </div>
            </div>

            <CheckCircle2
              v-if="selected === palette.name"
              class="absolute top-2 right-2 w-6 h-6 text-primary"
            />
          </button>
        </div>
      </div>

      <StatefulButton
        :status="status"
        class="mt-6 h-10 text-lg w-[120px]"
        @click="handleSelect"
      >
        Create
      </StatefulButton>
    </div>

    <div class="flex justify-center items-start">
      <div class="w-full h-[620px] rounded-xl bg-card">
        <div class="flex items-center gap-2 px-4 py-2 border-b">
          <span class="h-3 w-3 rounded-full bg-red-500" />
          <span class="h-3 w-3 rounded-full bg-yellow-400" />
          <span class="h-3 w-3 rounded-full bg-green-500" />
          <span class="ml-3 text-xs text-muted-foreground"> Live Preview </span>
        </div>

        <div class="flex justify-center items-start h-full">
          <div
            class="relative w-full h-full aspect-[16/10] origin-top rounded-lg bg-muted shadow-inner"
          >
            <iframe
              ref="iframeRef"
              src="https://beast-builder.netlify.app/?mode=view"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:open="showCustomPicker">
      <DialogContent class="max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Custom color</DialogTitle>
          <DialogDescription>Choose a custom color</DialogDescription>
        </DialogHeader>

        <div class="space-y-6">
          <span class="text-sm font-semibold text-muted-foreground"
            >Primary Color</span
          >
          <TwitterPicker
            v-model="customColor.primary"
            width="100%"
            triangle="hide"
            class="shadow-none"
          />

          <span class="text-sm font-semibold text-muted-foreground"
            >Secondary Color</span
          >
          <TwitterPicker
            v-model="customColor.secondary"
            width="100%"
            triangle="hide"
            class="shadow-none"
          />
        </div>

        <DialogFooter>
          <Button
            @click="
              () => {
                showCustomPicker = false;
                selected = `custom-${nanoid(4)}`;
              }
            "
            >Save</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
