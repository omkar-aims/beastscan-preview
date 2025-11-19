<script setup lang="ts">
import { Check, Image } from "lucide-vue-next";
import { Vibrant } from "node-vibrant/browser";
import { useUpdateCampaign } from "~/composables/campaign/useUpdateCampaign";

const templates = [
  {
    id: 1,
    name: "Minimalist Portfolio",
    thumbnail: "templates/template-01.png",
    description: "Simple and minimalist portfolio",
    config:
      '{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-n-A-HZ","type":"Section","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","background":"#E9E1DA"},"content":[{"id":"element-t_efyf","type":"Grid","styles":{"padding":"1rem","gridTemplateColumns":"1fr 250px","margin":"1fr 1fr 1fr 1fr","border":"0px solid #E5D8CD"},"props":{},"content":[{"id":"element-pwXuz9","type":"Flex","content":[{"id":"element-lQXeFb","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#222222","fontSize":"63px"},"props":{"contenteditable":true},"content":"Bethany Jones"},{"id":"element-6jUO9P","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#5B5B5B"},"props":{"contenteditable":true},"content":"I\'m a dedicated culture critic and lifestyle blogger exploring the intersections of art, travel, and modern living. Based in San Francisco, California."},{"id":"element-Ug-ISF","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"32px 1px 1px 1px","color":"#222222","fontSize":"32px"},"props":{"contenteditable":true},"content":"@reallygreatsite"},{"id":"element-c4RTJ-","type":"Social","styles":{"gridTemplateColumns":"1fr 1fr"},"props":{"variant":"icon-only","shape":"pill","links":[{"platform":"facebook","url":"https://www.facebook.com/yourpage"},{"platform":"instagram","url":"https://www.facebook.com/yourpage"},{"platform":"whatsapp","url":"https://www.facebook.com/yourpage"}]},"content":null}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"}},{"id":"element-a0lnRc","type":"Flex","content":[{"id":"element-O1d6Xh","type":"Image","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","boxShadow":"12px 12px 0px 0px rgba(91, 91, 91, 0.2)"},"props":{"src":"https://images.stockcake.com/public/e/a/b/eab7d9c9-2a1d-421d-8f04-3606ead822ed_large/professional-woman-posing-stockcake.jpg","alt":"Image","width":350,"height":350},"content":null}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr"}}]}]}]},"theme":{}}',
  },
  {
    id: 2,
    name: "Simple Portfolio",
    thumbnail: "templates/template-02.png",
    description: "Simple and minimalist portfolio",
    config: `{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-oEvdnw","type":"Section","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"content":[{"id":"element-0NmsgN","type":"Grid","styles":{"padding":"1rem","gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{},"content":[{"id":"element-RMEQgP","type":"Flex","content":[{"id":"element-rogoyZ","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"contenteditable":true},"content":"Hi,"},{"id":"element-aNmFwx","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","padding":"0px 0px"},"props":{},"content":[{"id":"element-Rmj9eM","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"contenteditable":true},"content":"I'm"},{"id":"element-BrrH5j","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#PRIMARY_COLOR"},"props":{"contenteditable":true},"content":"Marlon,"}]},{"id":"element-ZMoxMQ","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"contenteditable":true},"content":"Web Designer"},{"id":"element-iHe9Bf","type":"Button","styles":{"gridTemplateColumns":"1fr 1fr","margin":"24px 1px 1px 1px","background":"#PRIMARY_COLOR"},"props":{"contenteditable":true,"variant":"default"},"content":"Contact Me"}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","gap":"6px"}},{"id":"element-Zk2qbC","type":"Flex","content":[{"id":"element-6e4J2l","type":"Image","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"src":"https://i.ibb.co/Jjn8SMWR/Screenshot-10.png","alt":"Image","width":250,"height":250},"content":null}],"styles":{"flexDirection":"column","gridTemplateColumns":"1fr 1fr","justifyContent":"space-between","alignItems":"flex-end"}}]}]}]},"theme":{}}`,
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
