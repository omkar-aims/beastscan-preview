<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { QrCode } from "lucide-vue-next";
import QRCodeStyling from "qr-code-styling";

const qrcodeContainer = ref<HTMLElement | null>(null);
const frameContainer = ref<HTMLElement | null>(null);

// Campaign selection
const selectedCampaign = ref<string>("");
const campaignOptions = [
  { label: "My Awesome Campaign", value: "https://example.com/campaign1" },
  { label: "Summer Sale 2025", value: "https://example.com/summer-sale" },
  { label: "Product Launch", value: "https://example.com/product-launch" },
  { label: "Newsletter Signup", value: "https://example.com/newsletter" },
];

// Color states
const dotColor = ref("#000000");
const bgColor = ref("#ffffff");
const outerEyeColor = ref("#000000");
const innerEyeColor = ref("#000000");

// Shape states
const dotType = ref("rounded");
const eyeOuterShape = ref("square");
const eyeInnerShape = ref("dot");

// Other states
const qrSize = ref(300);
const logoFile = ref<string | null>(null);
const selectedFrame = ref("none");

let qrCode: QRCodeStyling | null = null;

// Dot pattern options with visual icons
const dotPatterns = [
  { value: "square", label: "Square", icon: "⬛" },
  { value: "dots", label: "Dots", icon: "⚫" },
  { value: "rounded", label: "Rounded", icon: "🔘" },
  { value: "extra-rounded", label: "Extra Round", icon: "⬜" },
  { value: "classy", label: "Classy", icon: "◆" },
  { value: "classy-rounded", label: "Classy Round", icon: "◇" },
];

// Eye shape options with visual icons
const eyeShapes = [
  { value: "square", label: "Square", icon: "⬛" },
  { value: "dot", label: "Dot", icon: "⚫" },
  { value: "extra-rounded", label: "Rounded", icon: "🔘" },
];

// Frame style options
const frameStyles = [
  { 
    name: "none", 
    label: "None", 
    description: "No frame",
    class: "bg-background" 
  },
  { 
    name: "bold", 
    label: "Bold", 
    description: "Dark bold frame",
    class: "bg-slate-900 rounded-xl shadow-xl" 
  },
  { 
    name: "elegant", 
    label: "Elegant", 
    description: "Subtle gradient",
    class: "bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl shadow-lg" 
  },
  { 
    name: "vibrant", 
    label: "Vibrant", 
    description: "Colorful gradient",
    class: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl shadow-2xl p-2" 
  },
];

const frameStyleClass = computed(() => {
  const selected = frameStyles.find((f) => f.name === selectedFrame.value);
  return selected?.class || "";
});

// Initialize QR Code when campaign is selected
const handleCampaignChange = async (value: string) => {
  selectedCampaign.value = value;
  await nextTick();
  initializeQRCode();
};

const initializeQRCode = () => {
  if (!qrcodeContainer.value || !selectedCampaign.value) return;

  // Clear existing QR code
  if (qrCode) {
    qrcodeContainer.value.innerHTML = "";
  }

  qrCode = new QRCodeStyling({
    width: qrSize.value,
    height: qrSize.value,
    data: selectedCampaign.value,
    margin: 10,
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    dotsOptions: {
      color: dotColor.value,
      type: dotType.value as any,
    },
    backgroundOptions: {
      color: bgColor.value,
    },
    cornersSquareOptions: {
      color: outerEyeColor.value,
      type: eyeOuterShape.value as any,
    },
    cornersDotOptions: {
      color: innerEyeColor.value,
      type: eyeInnerShape.value as any,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: 0.4,
    },
  });

  qrCode.append(qrcodeContainer.value);
};

const updateQRCode = () => {
  if (!qrCode || !selectedCampaign.value) return;

  qrCode.update({
    data: selectedCampaign.value,
    width: qrSize.value,
    height: qrSize.value,
    dotsOptions: {
      color: dotColor.value,
      type: dotType.value as any,
    },
    backgroundOptions: {
      color: bgColor.value,
    },
    cornersSquareOptions: {
      color: outerEyeColor.value,
      type: eyeOuterShape.value as any,
    },
    cornersDotOptions: {
      color: innerEyeColor.value,
      type: eyeInnerShape.value as any,
    },
    image: logoFile.value || undefined,
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: 0.4,
    },
  });
};

const selectDotPattern = (pattern: string) => {
  dotType.value = pattern;
  updateQRCode();
};

const selectOuterEyeShape = (shape: string) => {
  eyeOuterShape.value = shape;
  updateQRCode();
};

const selectInnerEyeShape = (shape: string) => {
  eyeInnerShape.value = shape;
  updateQRCode();
};

const handleLogoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    logoFile.value = event.target?.result as string;
    updateQRCode();
  };
  reader.readAsDataURL(file);
};

const removeLogo = () => {
  logoFile.value = null;
  updateQRCode();
};

const selectFrame = (frame: typeof frameStyles[0]) => {
  selectedFrame.value = frame.name;
};

const downloadQRCode = () => {
  if (!qrCode) return;
  qrCode.download({
    name: "qr-code",
    extension: "png",
  });
};
</script>
<template>
  <div class="space-y-6 p-6">
    <SheetHeader>
      <SheetTitle>Create New QR Code</SheetTitle>
      <SheetDescription>
        Select a campaign and customize your QR code
      </SheetDescription>
    </SheetHeader>

    <!-- Campaign Selection Dropdown -->
    <div class="space-y-2">
      <Label for="campaign-select">Choose a Campaign</Label>
      <Select v-model="selectedCampaign" @update:model-value="handleCampaignChange">
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

    <!-- QR Code Display Area -->
    <div 
      v-if="selectedCampaign"
      ref="frameContainer"
      class="flex justify-center items-center p-8 rounded-lg border-2 border-dashed border-muted transition-all"
      :class="frameStyleClass"
    >
      <div ref="qrcodeContainer" class="qr-container" />
    </div>

    <!-- Show placeholder icon when no campaign selected -->
    <div 
      v-else
      class="flex justify-center items-center p-8 rounded-lg border-2 border-dashed border-muted"
    >
      <QrCode class="w-24 h-24 text-muted-foreground" />
    </div>

    <!-- Customization Options - Only show when QR is generated -->
    <div v-if="selectedCampaign" class="space-y-6">
      <Separator />

      <!-- Colors Section -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Colors</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="foreground-color">Foreground</Label>
            <div class="flex items-center gap-2">
              <Input
                id="foreground-color"
                v-model="dotColor"
                type="color"
                class="w-16 h-10 p-1 cursor-pointer"
                @input="updateQRCode"
              />
              <Input
                v-model="dotColor"
                placeholder="#000000"
                class="flex-1 font-mono text-sm"
                @input="updateQRCode"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="background-color">Background</Label>
            <div class="flex items-center gap-2">
              <Input
                id="background-color"
                v-model="bgColor"
                type="color"
                class="w-16 h-10 p-1 cursor-pointer"
                @input="updateQRCode"
              />
              <Input
                v-model="bgColor"
                placeholder="#ffffff"
                class="flex-1 font-mono text-sm"
                @input="updateQRCode"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="outer-eye-color">Outer Eye Color</Label>
            <div class="flex items-center gap-2">
              <Input
                id="outer-eye-color"
                v-model="outerEyeColor"
                type="color"
                class="w-16 h-10 p-1 cursor-pointer"
                @input="updateQRCode"
              />
              <Input
                v-model="outerEyeColor"
                placeholder="#000000"
                class="flex-1 font-mono text-sm"
                @input="updateQRCode"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="inner-eye-color">Inner Eye Color</Label>
            <div class="flex items-center gap-2">
              <Input
                id="inner-eye-color"
                v-model="innerEyeColor"
                type="color"
                class="w-16 h-10 p-1 cursor-pointer"
                @input="updateQRCode"
              />
              <Input
                v-model="innerEyeColor"
                placeholder="#000000"
                class="flex-1 font-mono text-sm"
                @input="updateQRCode"
                />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Dot Shape Section -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Dot Pattern</h3>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="dot in dotPatterns"
            :key="dot.value"
            :class="[
              'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary',
              dotType === dot.value ? 'border-primary bg-primary/5' : 'border-border'
            ]"
            @click="selectDotPattern(dot.value)"
          >
            <div class="text-2xl">{{ dot.icon }}</div>
            <span class="text-xs font-medium">{{ dot.label }}</span>
          </button>
        </div>
      </div>

      <Separator />

      <!-- Eye Shapes Section -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Eye Shapes</h3>
        
        <div class="space-y-3">
          <Label>Outer Eye Shape</Label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="shape in eyeShapes"
              :key="shape.value"
              :class="[
                'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary',
                eyeOuterShape === shape.value ? 'border-primary bg-primary/5' : 'border-border'
              ]"
              @click="selectOuterEyeShape(shape.value)"
            >
              <div class="text-2xl">{{ shape.icon }}</div>
              <span class="text-xs font-medium">{{ shape.label }}</span>
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <Label>Inner Eye Shape</Label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="shape in eyeShapes"
              :key="shape.value"
              :class="[
                'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:border-primary',
                eyeInnerShape === shape.value ? 'border-primary bg-primary/5' : 'border-border'
              ]"
              @click="selectInnerEyeShape(shape.value)"
            >
              <div class="text-2xl">{{ shape.icon }}</div>
              <span class="text-xs font-medium">{{ shape.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Logo Upload Section -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Logo</h3>
        <div class="space-y-2">
          <Label for="logo-upload">Upload Logo (Center)</Label>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            class="cursor-pointer"
            @change="handleLogoUpload"
          />
          <p class="text-xs text-muted-foreground">
            Recommended: Square image, PNG with transparent background
          </p>
          <Button
            v-if="logoFile"
            variant="outline"
            size="sm"
            class="w-full"
            @click="removeLogo"
          >
            Remove Logo
          </Button>
        </div>
      </div>

      <Separator />

      <!-- Frame Style Section -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Frame Style</h3>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="frame in frameStyles"
            :key="frame.name"
            :class="[
              'p-4 rounded-lg border-2 transition-all hover:border-primary text-left',
              selectedFrame === frame.name ? 'border-primary bg-primary/5' : 'border-border'
            ]"
            @click="selectFrame(frame)"
          >
            <div class="font-medium text-sm">{{ frame.label }}</div>
            <div class="text-xs text-muted-foreground mt-1">{{ frame.description }}</div>
          </button>
        </div>
      </div>

      <Separator />

      <!-- Size Control -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">QR Code Size</h3>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Label for="qr-size">Size: {{ qrSize }}px</Label>
            <span class="text-sm text-muted-foreground">{{ qrSize }}x{{ qrSize }}</span>
          </div>
          <Input
            id="qr-size"
            v-model.number="qrSize"
            type="range"
            min="200"
            max="500"
            step="50"
            class="w-full"
            @input="updateQRCode"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4">
        <Button class="flex-1" @click="downloadQRCode" >
          Download QR Code
        </Button>
        <Button class="flex-1" variant="outline"  >
          Save QR Code
        </Button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="range"] {
  cursor: pointer;
}

input[type="color"] {
  cursor: pointer;
  border-radius: 0.375rem;
}
</style>