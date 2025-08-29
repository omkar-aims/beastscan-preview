<script setup lang="ts">
type QrType = {
  title: string;
  desc: string;
  icon: string;
  badge?: string;
  type: "dynamic" | "static" | "both";
  pro?: boolean;
};

const qrTypes: QrType[] = [
  {
    title: "Website",
    desc: "Open any website URL",
    icon: "lucide:globe",
    type: "both",
  },
  { title: "Email", desc: "Send an email", icon: "lucide:mail", type: "both" },
  {
    title: "SMS",
    desc: "Send a text message",
    icon: "lucide:message-square",
    type: "both",
  },
  {
    title: "Call",
    desc: "Place a quick call",
    icon: "lucide:phone",
    type: "both",
  },

  {
    title: "Linkpage",
    desc: "Show a list of links",
    icon: "lucide:link",
    type: "dynamic",
  },
  {
    title: "Form",
    desc: "Create and share a form",
    icon: "lucide:file-input",
    badge: "NEW",
    type: "dynamic",
  },
  {
    title: "PDF",
    desc: "Show a PDF",
    icon: "lucide:file-text",
    type: "dynamic",
  },
  {
    title: "Map Location",
    desc: "Open on Google Maps",
    icon: "lucide:map-pin",
    type: "dynamic",
  },
  {
    title: "Business Page",
    desc: "Display your business details",
    icon: "lucide:briefcase",
    type: "dynamic",
  },
  {
    title: "Facebook Page",
    desc: "Share your Facebook profile",
    icon: "lucide:facebook",
    type: "dynamic",
  },
  {
    title: "Video",
    desc: "Play a video",
    icon: "lucide:video",
    type: "dynamic",
  },
  {
    title: "Image",
    desc: "Show an image",
    icon: "lucide:image",
    type: "dynamic",
  },
  {
    title: "Image Gallery",
    desc: "Display multiple images",
    icon: "lucide:images",
    type: "dynamic",
  },
  {
    title: "Audio",
    desc: "Play an audio file",
    icon: "lucide:music",
    type: "dynamic",
  },
  {
    title: "Event",
    desc: "Promote an event",
    icon: "lucide:calendar",
    type: "dynamic",
  },
  {
    title: "Mobile App",
    desc: "Redirect to app store",
    icon: "lucide:smartphone",
    type: "dynamic",
  },
  {
    title: "Feedback & Rating",
    desc: "Collect feedback",
    icon: "lucide:star",
    type: "dynamic",
  },
  {
    title: "Coupon Code",
    desc: "Share a coupon code",
    icon: "lucide:ticket",
    type: "dynamic",
  },
  {
    title: "Restaurant Menu",
    desc: "Display a restaurant/bar menu",
    icon: "lucide:utensils",
    type: "dynamic",
  },

  {
    title: "Digital Business Card",
    desc: "Share contact details",
    icon: "lucide:id-card",
    type: "static",
  },
  {
    title: "Wi-Fi",
    desc: "Connect to a WiFi network",
    icon: "lucide:wifi",
    type: "static",
  },
  {
    title: "Plain Text",
    desc: "Display a short message",
    icon: "lucide:align-left",
    type: "static",
  },
];

const hovered = ref<QrType | null>(null);
</script>

<template>
  <div>
    <Stepper>
      <StepperItem :step="1">
        <StepperTrigger>
          <StepperIndicator>1</StepperIndicator>
          <StepperTitle>Choose type</StepperTitle>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>
      <StepperItem :step="2">
        <StepperTrigger>
          <StepperIndicator>2</StepperIndicator>
          <StepperTitle>Setup</StepperTitle>
        </StepperTrigger>
      </StepperItem>
      <StepperItem :step="3">
        <StepperTrigger>
          <StepperIndicator>3</StepperIndicator>
          <StepperTitle>Customize</StepperTitle>
        </StepperTrigger>
      </StepperItem>
      <StepperItem :step="4">
        <StepperTrigger>
          <StepperIndicator>4</StepperIndicator>
          <StepperTitle>Done</StepperTitle>
        </StepperTrigger>
      </StepperItem>
    </Stepper>

    <div class="grid grid-cols-[1fr_30%]">
      <div class="relative grid grid-cols-2 gap-4">
        <template v-for="type in qrTypes" :key="type.title">
          <Card
            class="p-4 cursor-pointer hover:ring-2 hover:ring-primary relative"
            @mouseenter="hovered = type"
            @mouseleave="hovered = null"
          >
            <div class="flex gap-2">
              <Icon :name="type.icon" class="text-3xl" />
              <div>
                <CardTitle>{{ type.title }}</CardTitle>
                <p class="text-sm text-muted-foreground">{{ type.desc }}</p>
              </div>
            </div>
          </Card>
        </template>
      </div>

      <transition name="fade-scale">
        <div
          v-if="hovered"
          class="bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-2"
        >
          <NuxtImg
            src="https://wallpapers.com/images/high/mobile-interface-graphic-placeholder-f1o2twiljd0hv558.png"
            alt="Demo image"
            class="rounded-lg"
          />
          <p class="mt-2 text-center text-sm font-medium">
            {{ hovered.title }} Preview
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>
