<script setup lang="ts">
import type { CampaignOption } from "~/types/campaign";
import { capitalize } from "~/utils/";

import { campaignOptions } from "~/config/campaignOptions";
import z from "zod";
import { useClipboard } from "@vueuse/core";

import { defaultQROption } from "~/config/qrCodeTemplates";

function groupedTypes(tab: "dynamic" | "static") {
  return campaignOptions
    .filter((t) => t.type === tab || t.type === "both")
    .reduce<Record<string, CampaignOption[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});
}

const selectedType = ref<string>();

const formSchema = computed(() => {
  const campaign = campaignOptions.find(
    (campaign) => campaign.title === selectedType.value
  );
  return campaign?.formSchema ?? z.object({});
});

const { currentStep, isLastStep, nextStep } = useWizard(4);
const { shoot } = useConfetti();
watch(selectedType, () => {
  if (selectedType.value) nextStep();
});

const { copy, copied, isSupported } = useClipboard();

function handleSubmit() {
  nextStep();
}

watch(isLastStep, () => {
  shoot();
});

const steps = [
  {
    step: 1,
    title: "Select Type",
    description: "Choose the QR code type",
    icon: "lucide:layers",
  },
  {
    step: 2,
    title: "Fill Data",
    description: "Enter your details",
    icon: "lucide:edit-3",
  },
  {
    step: 3,
    title: "Customize QR",
    description: "Style and personalize",
    icon: "lucide:sparkles",
  },
  {
    step: 4,
    title: "Done",
    description: "Download or share",
    icon: "lucide:check-circle",
  },
];

const qrOptions = ref({ ...defaultQROption, data: "https://www.google.com" });

watch(
  qrOptions,
  (option) => {
    console.log(option);
  },
  { deep: true }
);
</script>

<template>
  <AppRow gap="md">
    <Card v-show="!isLastStep">
      <AppStepper v-model="currentStep" :steps="steps" :disabled="isLastStep" />
    </Card>

    <div v-if="currentStep === 1">
      <Tabs default-value="dynamic" class="w-full">
        <TabsList class="grid grid-cols-2">
          <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
          <TabsTrigger value="static">Static</TabsTrigger>
        </TabsList>

        <TabsContent value="dynamic">
          <div
            v-for="(group, category) in groupedTypes('dynamic')"
            :key="category"
            class="mb-6"
          >
            <h3 class="text-lg font-semibold mb-3">
              {{ capitalize(category) }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AppHoverCard
                v-for="qr in group"
                :key="qr.title"
                v-model="selectedType"
                :title="qr.title"
                :desc="qr.desc"
                :icon="qr.icon"
                :preview="`campaign-previews/campaign-previews-website.png`"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="static">
          <div
            v-for="(group, category) in groupedTypes('static')"
            :key="category"
            class="mb-6"
          >
            <h3 class="text-lg font-semibold mb-3">
              {{ capitalize(category) }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AppHoverCard
                v-for="qr in group"
                :key="qr.title"
                :title="qr.title"
                :desc="qr.desc"
                :icon="qr.icon"
                :preview="`campaign-previews/campaign-previews-website.png`"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    <div v-if="currentStep === 2 && formSchema" v-motion-slide-bottom>
      <AutoForm
        keep-values
        class="space-y-4"
        :schema="formSchema"
        @submit="handleSubmit"
      >
        <Button type="submit">Submit</Button>
      </AutoForm>
    </div>
    <div v-if="currentStep === 3" v-motion-slide-bottom>
      <QRCodeBuilder v-model="qrOptions">
        <Button @click="nextStep()">Done</Button>
      </QRCodeBuilder>
    </div>
    <div v-if="currentStep === 4" v-motion-slide-bottom>
      <Card class="max-w-md text-center mx-auto">
        <CardHeader>
          <div class="mx-auto">
            <QRCodeCanvas
              :options="{ ...qrOptions, width: 150, height: 150 }"
            />
          </div>
          <CardTitle class="text-2xl font-semibold tracking-tight">
            Campaign Created!
          </CardTitle>
          <CardDescription>
            Your campaign has been successfully created.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <Button as-child>
            <a href="#">
              <Icon name="lucide:external-link" class="mr-2 h-4 w-4" />
              View Campaign
            </a>
          </Button>

          <Separator />

          <AppRow>
            <p class="text-sm font-medium text-center text-muted-foreground">
              Share this campaign with your audience
            </p>
            <div class="flex flex-row justify-between gap-2">
              <Button variant="outline" class="flex-1 gap-2">
                <Icon name="logos:facebook" class="h-4 w-4" />
                <span class="hidden sm:inline">Facebook</span>
              </Button>
              <Button variant="outline" class="flex-1 gap-2">
                <Icon name="logos:twitter" class="h-4 w-4" />
                <span class="hidden sm:inline">Twitter</span>
              </Button>
              <Button variant="outline" class="flex-1 gap-2">
                <Icon name="logos:linkedin-icon" class="h-4 w-4" />
                <span class="hidden sm:inline">LinkedIn</span>
              </Button>
            </div>
            <Button
              variant="secondary"
              class="w-full gap-2"
              :disabled="!isSupported"
              @click="copy('https://www.google.com')"
            >
              <Icon name="lucide:copy" class="h-4 w-4" />
              {{ copied ? "Copied" : "Copy Campaign Link" }}
            </Button>
          </AppRow>
        </CardContent>
      </Card>
    </div>
  </AppRow>
</template>
