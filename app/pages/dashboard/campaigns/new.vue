<script setup lang="ts">
import type { CampaignOption } from "~/types/campaign";
import { capitalize } from "~/utils/";

const options: CampaignOption[] = [
  {
    title: "Website",
    desc: "Open any website URL",
    icon: "lucide:globe",
    type: "both",
    category: "communication",
  },
  {
    title: "Email",
    desc: "Send an email",
    icon: "lucide:mail",
    type: "both",
    category: "communication",
  },
  {
    title: "SMS",
    desc: "Send a text message",
    icon: "lucide:message-square",
    type: "both",
    category: "communication",
  },
  {
    title: "Call",
    desc: "Place a quick call",
    icon: "lucide:phone",
    type: "both",
    category: "communication",
  },

  {
    title: "Linkpage",
    desc: "Show a list of links",
    icon: "lucide:link",
    type: "dynamic",
    category: "content",
  },
  {
    title: "Form",
    desc: "Create and share a form",
    icon: "lucide:form-input",
    badge: "NEW",
    type: "dynamic",
    category: "content",
  },
  {
    title: "PDF",
    desc: "Show a PDF",
    icon: "lucide:file-text",
    type: "dynamic",
    category: "content",
  },
  {
    title: "Video",
    desc: "Play a video",
    icon: "lucide:video",
    type: "dynamic",
    category: "content",
  },
  {
    title: "Image",
    desc: "Show an image",
    icon: "lucide:image",
    type: "dynamic",
    category: "content",
  },
  {
    title: "Image Gallery",
    desc: "Display multiple images",
    icon: "lucide:images",
    type: "dynamic",
    category: "content",
  },
  {
    title: "Audio",
    desc: "Play an audio file",
    icon: "lucide:music",
    type: "dynamic",
    category: "content",
  },

  {
    title: "Business Page",
    desc: "Display your business details",
    icon: "lucide:briefcase",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Facebook Page",
    desc: "Share your Facebook profile",
    icon: "lucide:facebook",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Event",
    desc: "Promote an event",
    icon: "lucide:calendar",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Mobile App",
    desc: "Redirect to app store",
    icon: "lucide:smartphone",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Feedback & Rating",
    desc: "Collect feedback",
    icon: "lucide:star",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Coupon Code",
    desc: "Share a coupon code",
    icon: "lucide:ticket",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Restaurant Menu",
    desc: "Display a restaurant/bar menu",
    icon: "lucide:utensils",
    type: "dynamic",
    category: "business",
  },
  {
    title: "Map Location",
    desc: "Open on Google Maps",
    icon: "lucide:map-pin",
    type: "dynamic",
    category: "business",
  },

  {
    title: "Digital Business Card",
    desc: "Share contact details",
    icon: "lucide:id-card",
    type: "static",
    category: "utility",
  },
  {
    title: "Wi-Fi",
    desc: "Connect to a WiFi network",
    icon: "lucide:wifi",
    type: "static",
    category: "utility",
  },
  {
    title: "Plain Text",
    desc: "Display a short message",
    icon: "lucide:align-left",
    type: "static",
    category: "utility",
  },
];

function groupedTypes(tab: "dynamic" | "static") {
  return options
    .filter((t) => t.type === tab || t.type === "both")
    .reduce<Record<string, CampaignOption[]>>((acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    }, {});
}
</script>

<template>
  <Tabs default-value="dynamic" class="w-full">
    <div class="flex justify-between">
      <TabsList class="grid grid-cols-2 mb-4">
        <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
        <TabsTrigger value="static">Static</TabsTrigger>
      </TabsList>
    </div>

    <TabsContent value="dynamic">
      <div
        v-for="(group, category) in groupedTypes('dynamic')"
        :key="category"
        class="mb-6"
      >
        <h3 class="text-lg font-semibold mb-3">{{ capitalize(category) }}</h3>
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

    <TabsContent value="static">
      <div
        v-for="(group, category) in groupedTypes('static')"
        :key="category"
        class="mb-6"
      >
        <h3 class="text-lg font-semibold mb-3">{{ capitalize(category) }}</h3>
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
</template>
