<script setup lang="ts">
import { ref } from "vue";
import { CheckCircle2, ArrowRight } from "lucide-vue-next";

const activeTab = ref("basic");

const sections = ["basic", "business", "hours", "images"];
const completedSections = ref<string[]>([]);

function markSectionComplete(section: string) {
  if (!completedSections.value.includes(section)) {
    completedSections.value.push(section);
  }

  const currentIndex = sections.indexOf(section);
  const nextSection = sections[currentIndex + 1];
  if (nextSection) {
    activeTab.value = nextSection;
  }
}

const galleryFiles = ref<string[]>([]);

function handleGallerySelect(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target?.files?.length) return;

  const urls = Array.from(target.files).map((file) =>
    URL.createObjectURL(file)
  );
  galleryFiles.value.push(...urls);
}

function removeGalleryImage(index: number) {
  galleryFiles.value.splice(index, 1);
}

const businessHours = ref([
  {
    name: "monday",
    label: "Monday",
    enabled: true,
    from: "10:30",
    to: "20:30",
  },
  {
    name: "tuesday",
    label: "Tuesday",
    enabled: true,
    from: "10:30",
    to: "20:30",
  },
  {
    name: "wednesday",
    label: "Wednesday",
    enabled: true,
    from: "10:30",
    to: "20:30",
  },
  {
    name: "thursday",
    label: "Thursday",
    enabled: true,
    from: "10:30",
    to: "20:30",
  },
  {
    name: "friday",
    label: "Friday",
    enabled: true,
    from: "11:30",
    to: "17:30",
  },
  { name: "saturday", label: "Saturday", enabled: false, from: "", to: "" },
  { name: "sunday", label: "Sunday", enabled: false, from: "", to: "" },
]);
</script>

<template>
  <Accordion
    v-model="activeTab"
    type="single"
    collapsible
    :default-value="activeTab"
    class="w-full space-y-4"
  >
    <AccordionItem
      value="basic"
      class="bg-card rounded-md border border-border"
    >
      <AccordionTrigger
        class="border-b px-8 py-4 rounded-none flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <CheckCircle2
            v-if="completedSections.includes('basic')"
            v-motion-pop
            class="text-success w-8 h-8"
          />
          <span
            v-else
            class="font-bold w-8 h-8 bg-gray-100 flex justify-center items-center rounded-full text-muted-foreground"
          >
            1
          </span>

          <h4 class="text-base font-medium text-muted-foreground">
            Basic Details
          </h4>
        </div>
      </AccordionTrigger>

      <AccordionContent class="px-8 py-6">
        <div class="space-y-4 max-w-5xl">
          <div class="grid gap-6 md:grid-cols-2">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Offer title"
                    class="bg-card"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="slug">
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="offer slug"
                    class="bg-card"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <FormField name="validFrom">
              <FormItem>
                <FormLabel>Valid From</FormLabel>
                <FormControl>
                  <DatePicker />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="validUntil">
              <FormItem>
                <FormLabel>Valid Until</FormLabel>
                <FormControl>
                  <DatePicker />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <FormField name="cooldownDays">
              <FormItem>
                <FormLabel>Cooldown Days</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 7"
                    min="0"
                    class="bg-card"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="maxRedemptionsPerLead">
              <FormItem>
                <FormLabel>Max Redemptions Per Lead</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 1"
                    min="1"
                    class="bg-card"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your offer in detail..."
                  class="min-h-[100px] bg-card resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex py-4">
            <Button type="button" @click="markSectionComplete('basic')">
              Save & Continue
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="business"
      class="bg-card rounded-md border border-border"
    >
      <AccordionTrigger
        class="border-b px-8 py-4 rounded-none flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <CheckCircle2
            v-if="completedSections.includes('business')"
            v-motion-pop
            class="text-success w-8 h-8"
          />
          <span
            v-else
            class="font-bold w-8 h-8 bg-gray-100 flex justify-center items-center rounded-full text-muted-foreground"
          >
            2
          </span>

          <h4 class="text-base font-medium text-muted-foreground">
            Business Details
          </h4>
        </div>
      </AccordionTrigger>

      <AccordionContent class="px-8 py-6">
        <div class="space-y-4 max-w-5xl">
          <FormField name="businessName">
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business name" class="bg-card" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField name="businessAddress">
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter street address"
                  class="bg-card"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField name="city">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your city"
                    class="bg-card"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="postalCode">
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter postal code"
                    class="bg-card"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="country">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your country"
                    class="bg-card"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <div class="flex py-4">
            <Button type="button" @click="markSectionComplete('business')">
              Save & Continue
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="hours"
      class="bg-card rounded-md border border-border"
    >
      <AccordionTrigger
        class="border-b px-8 py-4 rounded-none flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <CheckCircle2
            v-if="completedSections.includes('hours')"
            v-motion-pop
            class="text-success w-8 h-8"
          />
          <span
            v-else
            class="font-bold w-8 h-8 bg-gray-100 flex justify-center items-center rounded-full text-muted-foreground"
          >
            3
          </span>

          <h4 class="text-base font-medium text-muted-foreground">
            Business Hours
          </h4>
        </div>
      </AccordionTrigger>

      <AccordionContent class="px-8 py-6">
        <div class="max-w-3xl space-y-6">
          <div
            v-for="day in businessHours"
            :key="day.name"
            class="flex items-center justify-between gap-4"
          >
            <div class="w-32 font-medium text-sm">
              {{ day.label }}
            </div>

            <Switch v-model="day.enabled" />

            <div class="flex items-center gap-2 flex-1">
              <TimePicker />
              <span class="text-muted-foreground">to</span>
              <TimePicker />
            </div>

            <div
              v-if="!day.enabled"
              class="text-sm text-muted-foreground w-32 text-center"
            >
              Closed
            </div>
          </div>

          <div class="flex py-4">
            <Button type="button" @click="markSectionComplete('hours')">
              Save & Continue
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem
      value="images"
      class="bg-card rounded-md border border-border"
    >
      <AccordionTrigger
        class="border-b px-8 py-4 rounded-none flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <CheckCircle2
            v-if="completedSections.includes('images')"
            v-motion-pop
            class="text-success w-8 h-8"
          />
          <span
            v-else
            class="font-bold w-8 h-8 bg-gray-100 flex justify-center items-center rounded-full text-muted-foreground"
          >
            4
          </span>

          <h4 class="text-base font-medium text-muted-foreground">Images</h4>
        </div>
      </AccordionTrigger>
      <AccordionContent class="px-8 py-6">
        <div class="space-y-8 max-w-5xl">
          <div>
            <span class="block mb-1 text-sm font-medium">Cover Image</span>
            <FileUpload v-slot="{ file, handleSelect }">
              <div class="space-y-3">
                <Label
                  for="coverImage"
                  class="h-10 border border-input rounded-md w-full px-4"
                  >Upload cover image</Label
                >
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  class="bg-card hidden"
                  @change="handleSelect"
                />
                <div
                  v-if="file"
                  class="relative w-64 h-40 border rounded overflow-hidden"
                >
                  <NuxtImg
                    :src="file"
                    alt="Cover Preview"
                    class="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
              </div>
            </FileUpload>
          </div>

          <div>
            <span class="block mb-1 text-sm font-medium">Gallery Images</span>
            <div class="space-y-3">
              <Label
                for="galleryImage"
                class="h-10 border border-input rounded-md w-full px-4"
                >Upload gallery image</Label
              >
              <Input
                id="galleryImage"
                type="file"
                accept="image/*"
                multiple
                class="bg-card hidden"
                @change="handleGallerySelect"
              />

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                  v-for="(img, i) in galleryFiles"
                  :key="i"
                  class="relative group border rounded overflow-hidden"
                >
                  <NuxtImg
                    :src="img"
                    class="w-full h-32 object-cover"
                    alt="Gallery Preview"
                  />
                  <button
                    type="button"
                    class="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition"
                    @click="removeGalleryImage(i)"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex py-4">
            <Button type="button" @click="markSectionComplete('images')">
              Finish
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
