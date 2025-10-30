<script setup lang="ts">
import { ref, watch} from "vue";
import { QrCode ,X} from "lucide-vue-next";
import { useQRStore } from "@/stores/useQRStore";
import QRColourPicker from "./QRColourPicker.vue";
import PatternSelection from "./QRBuilder/PatternSelection.vue";
const qrStore = useQRStore();

const selectedValue = ref("");

const campaignOptions = [
  { label: "My Awesome Campaign", value: "https://google.com/" },
  { label: "Summer Sale 2025", value: "https://youtube.com/" },
  { label: "Product Launch", value: "https://facebook.com/" },
  { label: "Newsletter Signup", value: "https://yahoo.com/" },
];

// Watch for campaign selection changes and update store
watch(selectedValue, (newVal) => {
  qrStore.config.text = newVal || "";
});

// Helper to update color in store
const updateDotsColor = (color: string) => {
  qrStore.config.dots.colors = [color];
};

const updateBackgroundColor = (color: string) => {
  qrStore.config.background.colors = [color];
};

const updateCornerSquareColor = (color: string) => {
  qrStore.config.cornersSquare.colors = [color];
};

const updateCornerDotColor = (color: string) => {
  qrStore.config.cornersDot.colors = [color];
};

const downloadQR = () => {
  if (qrStore.generatedQR) {
    const link = document.createElement("a");
    link.href = qrStore.generatedQR;
    link.download = "qr-code.png";
    link.click();
  }
};

const saveQR = () => {
  // Implement save functionality as needed
  console.log("Saving QR Code configuration:", qrStore.config);
};
</script>

<template>
  <div class="space-y-6 p-6">
    <SheetHeader class="p-0">
      <SheetTitle class="text-xl text-primary">Create New QR Code</SheetTitle>
    </SheetHeader>

    <!-- QR Preview or Placeholder Icon -->
    <div class="mt-4 flex justify-center items-center">
      <div v-if="!selectedValue" class="text-muted-foreground flex flex-col items-center">
        <QrCode class="w-24 h-24 opacity-50" />
        <p class="mt-2 text-sm text-muted-foreground">
          Select a campaign to generate QR
        </p>
      </div>

      <div v-else-if="qrStore.generatedQR" class="transition-all duration-300">
        <img 
          :src="qrStore.generatedQR" 
          alt="Generated QR Code" 
          class="w-[150px] h-[150px]"
        />
      </div>

      <div v-else class="text-muted-foreground flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p class="mt-2 text-sm text-muted-foreground">Generating QR Code...</p>
      </div>
    </div>

    <!-- Dropdown -->
    <div class="px-2 space-y-2">
      <Label for="campaign-select">Choose a Campaign</Label>
      <Select v-model="selectedValue">
        <SelectTrigger id="campaign-select" class="w-full">
          <SelectValue placeholder="Select a campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="option in campaignOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Customization Options - Only show when QR is generated -->
    <div v-if="selectedValue" class="space-y-6 p-2">
      <p class="text-primary text-xl font-bold">Customize QR Code</p>
      <Accordion type="single" collapsible class="w-full" default-value="a">
        <AccordionItem value="a">
          <AccordionTrigger>Customize Colors</AccordionTrigger>
          <AccordionContent class="space-y-4">
            <div class="space-y-2">
              <QRColourPicker 
                :model-value="qrStore.config.dots.colors[0]"
                @update:model-value="updateDotsColor"
                v-slot="{ currentColor }"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm text-primary font-medium">Dots Color:</span>
                  <div 
                    class="w-8 h-8 rounded-md border border-border cursor-pointer shadow-xs"
                    :style="{ backgroundColor: currentColor }"
                  />
                </div>
              </QRColourPicker>
            </div>

            <div class="space-y-2">
              <QRColourPicker 
                :model-value="qrStore.config.background.colors[0]"
                @update:model-value="updateBackgroundColor"
                v-slot="{ currentColor }"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm text-primary font-medium">Background Color:</span>
                  <div 
                    class="w-8 h-8 rounded-md border border-border cursor-pointer shadow-xs"
                    :style="{ backgroundColor: currentColor }"
                  />
                </div>
              </QRColourPicker>
            </div>

            <div class="space-y-2">
              <QRColourPicker 
                :model-value="qrStore.config.cornersSquare.colors[0]"
                @update:model-value="updateCornerSquareColor"
                v-slot="{ currentColor }"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm text-primary font-medium">Corner Square Color:</span>
                  <div 
                    class="w-8 h-8 rounded-md border border-border cursor-pointer shadow-xs"
                    :style="{ backgroundColor: currentColor }"
                  />
                </div>
              </QRColourPicker>
            </div>

            <div class="space-y-2">
              <QRColourPicker 
                :model-value="qrStore.config.cornersDot.colors[0]"
                @update:model-value="updateCornerDotColor"
                v-slot="{ currentColor }"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm text-primary font-medium">Corner Dot Color:</span>
                  <div 
                    class="w-8 h-8 rounded-md border border-border cursor-pointer shadow-xs"
                    :style="{ backgroundColor: currentColor }"
                  />
                </div>
              </QRColourPicker>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="b">
          <AccordionTrigger>Change Dot Shape</AccordionTrigger>
          <AccordionContent>
            <PatternSelection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="d">
          <AccordionTrigger>Upload Logo</AccordionTrigger>
          <AccordionContent>
            <QRBuilderLogoPicker>
              <div class="grid grid-cols-[32px_1fr] gap-2 items-center">
              <span
                v-if="!qrStore.config.logoUrl"
                class="flex justify-center items-center w-8 h-8 rounded-md border border-border cursor-pointer hover:shadow-md hover:border-primary transition-all duration-200"
              >
                <X class="w-5 h-5" />
              </span>
              <img
                v-else
                :src="qrStore.config.logoUrl"
                :alt="qrStore.config.logoUrl"
                class="w-8 h-8 p-1 rounded-md border border-border object-contain cursor-pointer hover:shadow-md hover:border-primary transition-all duration-200"
              />
              <Input
                :placeholder="qrStore.config.logoUrl ? 'Change logo' : 'Choose a logo'"
                class="w-full"
              />
            </div>
            </QRBuilderLogoPicker>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="e">
          <AccordionTrigger>Select Frame Style</AccordionTrigger>
          <AccordionContent>
            <QRBuilderFrameSelection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="f">
          <AccordionTrigger>Adjust Size</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>

      <div class="flex w-full items-center gap-3">
        <Button @click="downloadQR">Download QR Code</Button>
        <Button @click="saveQR">Save QR Code</Button>
      </div>
    </div>
  </div>
</template>