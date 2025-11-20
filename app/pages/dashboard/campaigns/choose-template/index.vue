<script setup lang="ts">
import { Check, Image } from "lucide-vue-next";
import { Vibrant } from "node-vibrant/browser";
import { useUpdateCampaign } from "~/composables/campaign/useUpdateCampaign";

const templates = [
  {
    id: 1,
    name: "Simple Demo",
    thumbnail: "templates/template-03.png",
    description: "Simple and minimalist portfolio",
    config: `{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-UjXDmF","type":"Section","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","background":"linear-gradient(0deg, #PRIMARY_COLOR, #EF4444)"},"content":[{"id":"element-vmibqE","type":"Container","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","justifyContent":"flex-end","alignItems":"center"},"props":{},"content":[{"id":"element-pLqTWl","type":"Image","styles":{"gridTemplateColumns":"1fr 1fr","borderRadius":"120px","margin":"1fr 1fr 1fr 1fr","boxShadow":"0px 0px 0px 0px rgba(255, 255, 255, 1)"},"props":{"src":"https://mockmind-api.uifaces.co/content/human/125.jpg","alt":"Image","width":250,"height":250},"content":null},{"id":"element-m7ucmM","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1px 1px 24px 1px","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"NAME"},{"id":"element-HWoObk","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-5-GYc2","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24px"},"props":{"icon":"globe"},"content":null},{"id":"element-11zDdk","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Visit My Website"}]},{"id":"element-BgFOX-","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-j7CeKy","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24"},"props":{"icon":"shopping-bag"},"content":null},{"id":"element-0MiPwS","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Shop My Merch"}]},{"id":"element-avmgCp","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1px 1px 24px 1px","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-EmPtcp","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24"},"props":{"icon":"camera"},"content":null},{"id":"element-Eq5_6-","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Book a shoot"}]},{"id":"element-ZCk-Im","type":"Social","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"variant":"icon-only","shape":"pill","links":[{"platform":"facebook","url":"https://www.facebook.com/yourpage"},{"platform":"instagram","url":"https://www.facebook.com/yourpage"},{"platform":"tiktok","url":"https://www.facebook.com/yourpage"}]},"content":null}]}]}]},"theme":{}}`,
  },
];

const selectedTemplate = ref<(typeof templates)[0] | null>(null);
const showColorSheet = ref<boolean>(false);
const selectTemplate = (newTemplate: (typeof templates)[0]) => {
  selectedTemplate.value = newTemplate;
  showColorSheet.value = true;
};

const colors = [
  { name: "Primary", value: "f63b82" },
  { name: "Blue", value: "3B82F6" },
  { name: "Green", value: "22C55E" },
  { name: "Purple", value: "8B5CF6" },
  { name: "Orange", value: "F97316" },
  { name: "Red", value: "EF4444" },
  { name: "Teal", value: "20c997" },
  { name: "Gray", value: "343a40" },
];

const activeColor = ref<string>("f63b82");
const isDragging = ref<boolean>(false);
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

watch(
  () => showColorSheet.value,
  () => {
    if (showColorSheet.value === false) {
      extractedColors.value = [];
      activeColor.value = "f63b82";
      selectedTemplate.value = null;
    }
  }
);

const onColorInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target) return;

  let value = target.value.trim();

  if (value.startsWith("#")) {
    value = value.slice(1);
  }

  if (value.length === 6 || value.length === 3) {
    activeColor.value = value;
  }
};

const route = useRoute();
const campaignId = route.query.campaign;

if (!campaignId) navigateTo("/dashboard");

const { mutateAsync, status } = useUpdateCampaign(campaignId);

async function handleThemeSelect() {
  const config = selectedTemplate.value?.config.replaceAll(
    "PRIMARY_COLOR",
    activeColor.value
  );

  if (!config) return;

  await mutateAsync({
    config: JSON.parse(config),
  });

  navigateTo(`/design?campaign=${campaignId}`, { replace: true });
}
</script>

<template>
  <section class="space-y-6">
    <AppHeading :level="3">Choose a template</AppHeading>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="template in templates"
        :key="template.id"
        class="group bg-card cursor-pointer border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition relative"
        :class="{
          'ring-2 ring-primary ring-offset-2':
            selectedTemplate?.id === template.id,
        }"
        @click="selectTemplate(template)"
      >
        <NuxtImg
          :src="template.thumbnail"
          :alt="template.name"
          class="w-full h-40 object-cover"
        />
        <div class="p-3">
          <h3 class="font-medium text-gray-800">{{ template.name }}</h3>
          <p class="text-sm text-gray-500">{{ template.description }}</p>
        </div>

        <div
          v-if="selectedTemplate?.id === template.id"
          class="absolute inset-0 bg-primary/30 flex items-center justify-center"
        >
          <Check class="text-white w-8 h-8" />
        </div>
      </div>
    </div>
    <Sheet v-model:open="showColorSheet">
      <SheetContent>
        <SheetHeader class="px-0">
          <SheetTitle class="px-4">Customize the theme</SheetTitle>
          <SheetDescription>
            <Tabs default-value="brand">
              <TabsList class="flex px-0 gap-0 w-full">
                <TabsTrigger
                  value="brand"
                  class="focus-visible:ring-transparent rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:font-bold border-0 border-b-2 border-muted-foreground/10 data-[state=active]:border-primary"
                  >Brand Color</TabsTrigger
                >
                <TabsTrigger
                  value="logo"
                  class="focus-visible:ring-transparent rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:font-bold border-0 border-b-2 border-muted-foreground/10 data-[state=active]:border-primary"
                  >Detect from Logo</TabsTrigger
                >
              </TabsList>

              <TabsContent value="brand">
                <div class="my-4 grid grid-cols-4 gap-2 px-4">
                  <button
                    v-for="color in colors"
                    :key="color.value"
                    class="w-full h-24 rounded-xl border cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-105"
                    :class="[
                      'border-muted',
                      color.value === activeColor
                        ? 'ring-2 ring-primary ring-offset-2'
                        : '',
                    ]"
                    :style="{ backgroundColor: `#${color.value}` }"
                    @click="activeColor = color.value"
                  >
                    <Check
                      v-if="color.value === activeColor"
                      v-motion-pop
                      class="text-white w-6 h-6"
                    />
                  </button>
                </div>

                <div class="py-6 px-4">
                  <label
                    for="customColor"
                    class="block font-semibold mb-2 text-muted-foreground"
                    >Custom Color</label
                  >
                  <div class="flex justify-center items-center gap-2">
                    <span
                      class="w-12 h-12 block rounded-full border border-muted-foreground/50 shrink-0"
                      :style="{ backgroundColor: `#${activeColor}` }"
                    />
                    <Input
                      id="customColor"
                      placeholder="Enter hex code "
                      @input="onColorInput"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logo">
                <div class="px-4 my-4">
                  <FileUpload v-slot="{ handleSelect, file }">
                    <div
                      class="relative"
                      @dragover.prevent="isDragging = true"
                      @dragleave.prevent="isDragging = false"
                      @drop.prevent="
                        (e) => {
                          isDragging = false;
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
                        :class="[
                          isDragging
                            ? 'border-primary bg-primary/10 scale-[1.01]'
                            : 'border-muted-foreground/40',
                        ]"
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

                        <div
                          v-if="isDragging"
                          class="absolute inset-0 bg-primary/10 border-2 border-primary rounded-xl pointer-events-none animate-pulse"
                        />
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
                    :class="[
                      'rounded-full border-muted',
                      color === activeColor
                        ? 'ring-2 ring-primary ring-offset-2'
                        : '',
                    ]"
                    :style="{ backgroundColor: `#${color}` }"
                    @click="activeColor = color"
                  >
                    <Check
                      v-if="color === activeColor"
                      v-motion-pop
                      class="text-white w-8 h-8"
                    />
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <div class="flex gap-3 justify-end">
            <Button variant="outline" @click="showColorSheet = false"
              >Cancel</Button
            >

            <div @click="handleThemeSelect">
              <StatefulButton :status="status"> Continue </StatefulButton>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </section>
</template>
