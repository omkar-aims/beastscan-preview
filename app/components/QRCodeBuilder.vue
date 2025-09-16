<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";

const props = defineProps({
  modelValue: null,
});

const emit = defineEmits(["update:modelValue"]);

const qrOptions = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const qrCodePreviewRef = useTemplateRef("qrCodePreviewRef");

const qrCode = new QRCodeStyling(JSON.parse(JSON.stringify(qrOptions.value)));
const { checkQRCode, isScannable } = useQRCodeScannable();

const scanableLabel = computed(() =>
  isScannable.value ? "Scanable" : "Not scanable"
);

onMounted(async () => {
  if (qrCodePreviewRef.value) {
    qrCode.append(qrCodePreviewRef.value);
    const rawCode = (await qrCode.getRawData("png")) as Blob;
    await checkQRCode(rawCode);
  }
});

watch(
  qrOptions,
  async (newVal) => {
    qrCode.update(JSON.parse(JSON.stringify(newVal)));
    const rawCode = (await qrCode.getRawData("png")) as Blob;
    await checkQRCode(rawCode);
  },
  { deep: true }
);

const handleSelectTemplate = (config: typeof qrOptions) => {
  qrOptions.value = {
    ...config,
    width: 280,
    height: 280,
    data: qrOptions.value.data,
  };
};
</script>

<template>
  <Tabs default-value="templates">
    <TabsList>
      <TabsTrigger value="templates">Templates</TabsTrigger>
      <TabsTrigger value="styles">Styles</TabsTrigger>
    </TabsList>
    <div class="grid md:grid-cols-[1fr_30%] gap-8">
      <TabsContent value="templates" class="space-y-4">
        <QRTemplatePicker @template-selected="handleSelectTemplate" />
      </TabsContent>
      <TabsContent value="styles" class="space-y-4">
        <Accordion
          type="single"
          collapsible
          class="w-full"
          default-value="logo"
        >
          <AccordionItem value="logo">
            <AccordionTrigger class="font-semibold">Logo</AccordionTrigger>
            <AccordionContent class="space-y-4">
              <QRImageSelector v-model="qrOptions.image" />

              <AppRow gap="md">
                <AppRow gap="sm">
                  <Label for="imageSize">Size</Label>
                  <Slider
                    id="imageSize"
                    :default-value="[qrOptions.imageOptions.imageSize]"
                    :min="0.1"
                    :max="0.5"
                    :step="0.1"
                    @update:model-value="
                      (val) =>
                        (qrOptions.imageOptions.imageSize =
                          val?.[0] ?? qrOptions.imageOptions.imageSize)
                    "
                  />
                </AppRow>

                <AppRow gap="sm">
                  <Label for="imageMargin">Margin</Label>
                  <Slider
                    id="imageMargin"
                    :default-value="[qrOptions.imageOptions.margin]"
                    :min="0"
                    :max="20"
                    :step="1"
                    @update:model-value="
                      (val) =>
                        (qrOptions.imageOptions.margin =
                          val?.[0] ?? qrOptions.imageOptions.margin)
                    "
                  />
                </AppRow>
              </AppRow>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="frame">
            <AccordionTrigger class="font-semibold">Frame</AccordionTrigger>
            <AccordionContent class="space-y-4">
              <AppColorPicker v-model="qrOptions.backgroundOptions.color" />

              <AppRow>
                <Label for="frameMargin">Margin</Label>
                <Slider
                  id="frameMargin"
                  :default-value="[qrOptions.margin]"
                  :min="0"
                  :max="20"
                  :step="1"
                  @update:model-value="
                    (val) => (qrOptions.margin = val?.[0] ?? qrOptions.margin)
                  "
                />
              </AppRow>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dots">
            <AccordionTrigger class="font-semibold">Dots</AccordionTrigger>
            <AccordionContent>
              <AppRow direction="vertical" gap="sm">
                <AppColorPicker v-model="qrOptions.dotsOptions.color" />

                <ShapeSelector
                  id="dotsOptions"
                  v-model="qrOptions.dotsOptions.type"
                />
              </AppRow>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cornerSquare">
            <AccordionTrigger class="font-semibold"
              >Corner Square</AccordionTrigger
            >
            <AccordionContent>
              <AppRow direction="vertical" gap="sm">
                <AppColorPicker
                  v-model="qrOptions.cornersSquareOptions.color"
                />
                <ShapeSelector
                  id="cornersSquareOptions"
                  v-model="qrOptions.cornersSquareOptions.type"
                />
              </AppRow>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cornerDot">
            <AccordionTrigger class="font-semibold"
              >Corner Dot</AccordionTrigger
            >
            <AccordionContent>
              <AppRow direction="vertical" gap="sm">
                <AppColorPicker v-model="qrOptions.cornersDotOptions.color" />
                <ShapeSelector
                  id="cornersDotOptions"
                  v-model="qrOptions.cornersDotOptions.type"
                  :shapes="[
                    'square',
                    'dot',
                    'rounded',
                    'extra-rounded',
                    'classy',
                    'classy-rounded',
                  ]"
                />
              </AppRow>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <AppRow>
        <Card class="self-baseline w-full gap-2">
          <CardContent>
            <div ref="qrCodePreviewRef" class="flex justify-center" />

            <AppRow direction="vertical" gap="xs" class="items-center mt-4">
              <AppRow
                direction="horizontal"
                gap="sm"
                class="transition-all duration-300 items-center"
                :class="
                  isScannable
                    ? 'text-success-foreground'
                    : 'text-destructive-foreground'
                "
              >
                <Icon
                  :name="isScannable ? 'lucide:check' : 'lucide:x'"
                  class="text-2xl"
                />
                <span class="text-lg font-semibold uppercase">{{
                  scanableLabel
                }}</span>
              </AppRow>
            </AppRow>
          </CardContent>
        </Card>
        <slot />
      </AppRow>
    </div>
  </Tabs>
</template>
