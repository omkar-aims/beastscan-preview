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
  console.log("Saving QR Code configuration:", qrStore.config);
};
</script>

<template>
  <div class="space-y-6 p-6">
    <SheetHeader class="p-0">
      <SheetTitle class="text-primary text-xl font-semibold">Create New QR Code</SheetTitle>
    </SheetHeader>

    <!-- QR Preview Section -->
    <div class="mt-4 flex justify-center items-center">
      <div v-if="!selectedValue" class="flex flex-col items-center text-muted-foreground">
        <QrCode class="w-24 h-24 opacity-70 text-primary/70 shadow-lg rounded-md" />
        <p class="mt-2 text-sm">Select a campaign to generate QR</p>
      </div>

      <div v-else-if="qrStore.generatedQR" class="transition-all duration-300">
        <img
          :src="qrStore.generatedQR"
          alt="Generated QR Code"
          class="w-[150px] h-[150px]"
        />
      </div>

      <div v-else class="flex flex-col items-center text-muted-foreground">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p class="mt-2 text-sm">Generating QR Code...</p>
      </div>
    </div>

    <!-- Campaign Dropdown -->
    <div class="px-2 space-y-2">
      <Label for="campaign-select" class="text-primary text-lg">Choose a Campaign</Label>
      <Select v-model="selectedValue">
        <SelectTrigger id="campaign-select" class="w-full">
          <SelectValue placeholder="Select a campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in campaignOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Customization Section -->
    <div v-if="selectedValue" class="space-y-6 p-2">
      <h2 class="text-lg text-primary">Customize QR Code</h2>

      <Accordion type="single" collapsible class="w-full" default-value="shape">
        <AccordionItem value="shape">
          <AccordionTrigger>Change Dot Shape</AccordionTrigger>
          <AccordionContent>
            <PatternSelection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="colors">
          <AccordionTrigger>Customize Colors</AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" class="w-full space-y-2 mt-2">

              <!-- Dots Color -->
              <AccordionItem value="dots">
                <AccordionTrigger>Dots Color</AccordionTrigger>
                <AccordionContent>
                  <QRColourPicker
                    :model-value="qrStore.config.dots.colors[0]"
                    @update:model-value="updateDotsColor"
                    v-slot="{ currentColor }"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-md border border-border shadow-xs"
                        :style="{ backgroundColor: currentColor }"
                      />
                      <span class="text-sm">Current: {{ currentColor }}</span>
                    </div>
                  </QRColourPicker>
                </AccordionContent>
              </AccordionItem>

              <!-- Background Color -->
              <AccordionItem value="background">
                <AccordionTrigger>Background Color</AccordionTrigger>
                <AccordionContent>
                  <QRColourPicker
                    :model-value="qrStore.config.background.colors[0]"
                    @update:model-value="updateBackgroundColor"
                    v-slot="{ currentColor }"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-md border border-border shadow-xs"
                        :style="{ backgroundColor: currentColor }"
                      />
                      <span class="text-sm">Current: {{ currentColor }}</span>
                    </div>
                  </QRColourPicker>
                </AccordionContent>
              </AccordionItem>

              <!-- Corner Square Color -->
              <AccordionItem value="cornerSquare">
                <AccordionTrigger>Corner Square Color</AccordionTrigger>
                <AccordionContent>
                  <QRColourPicker
                    :model-value="qrStore.config.cornersSquare.colors[0]"
                    @update:model-value="updateCornerSquareColor"
                    v-slot="{ currentColor }"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-md border border-border shadow-xs"
                        :style="{ backgroundColor: currentColor }"
                      />
                      <span class="text-sm">Current: {{ currentColor }}</span>
                    </div>
                  </QRColourPicker>
                </AccordionContent>
              </AccordionItem>

              <!-- Corner Dot Color -->
              <AccordionItem value="cornerDot">
                <AccordionTrigger>Corner Dot Color</AccordionTrigger>
                <AccordionContent>
                  <QRColourPicker
                    :model-value="qrStore.config.cornersDot.colors[0]"
                    @update:model-value="updateCornerDotColor"
                    v-slot="{ currentColor }"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-md border border-border shadow-xs"
                        :style="{ backgroundColor: currentColor }"
                      />
                      <span class="text-sm">Current: {{ currentColor }}</span>
                    </div>
                  </QRColourPicker>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="d">
          <AccordionTrigger>Upload Logo</AccordionTrigger>
          <AccordionContent>
            <QRBuilderLogoPicker>
              <div class="grid grid-cols-[40px_1fr] gap-3 items-center">
                <span
                  v-if="!qrStore.config.logoUrl"
                  class="flex justify-center items-center w-10 h-10 rounded-md border border-border cursor-pointer"
                >
                  <X class="w-5 h-5" />
                </span>
                <img
                  v-else
                  :src="qrStore.config.logoUrl"
                  alt="Logo"
                  class="w-10 h-10 p-1 rounded-md border border-border object-contain cursor-pointer"
                />
                <Input
                  :placeholder="qrStore.config.logoUrl ? 'Change logo' : 'Choose a logo'"
                  class="w-full"
                />
              </div>
            </QRBuilderLogoPicker>
          </AccordionContent>
        </AccordionItem>

        <!-- 🪟 Frame Style -->
        <AccordionItem value="e">
          <AccordionTrigger>Select Frame Style</AccordionTrigger>
          <AccordionContent>
            <QRBuilderFrameSelection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pt-2">
        <Button class="w-full sm:w-auto" @click="downloadQR">Download</Button>
        <Button variant="secondary" class="w-full sm:w-auto" @click="saveQR">Save</Button>
      </div>
    </div>
  </div>
</template>
