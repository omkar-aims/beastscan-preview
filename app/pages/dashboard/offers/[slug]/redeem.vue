<script setup lang="ts">
import { useSidebar } from "~/components/ui/sidebar";

import { MapPin, Calendar, Timer, Repeat, Clock } from "lucide-vue-next";

const { toggleSidebar, state } = useSidebar();

onMounted(() => {
  if (state.value === "expanded") toggleSidebar();
});

onUnmounted(() => {
  if (state.value === "collapsed") toggleSidebar();
});

const offer = {
  title: "Free Coffee with Any Purchase",
  slug: "free-coffee-offer",
  type: "freebie",
  status: "active",
  description:
    "Enjoy a freshly brewed cup of coffee absolutely free with any purchase above ₹300 at our café. Limited-time offer!",
  validFrom: "2025-11-01T00:00:00.000Z",
  validUntil: "2025-12-31T23:59:59.000Z",
  cooldownDays: 7,
  maxRedemptionsPerLead: 1,
  location: {
    name: "Bean & Brew Café",
    address: "123 MG Road, Pune, Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    postalCode: "411001",
  },
  openingHours: {
    monday: { open: "08:00", close: "20:00" },
    tuesday: { open: "08:00", close: "20:00" },
    wednesday: { open: "08:00", close: "20:00" },
    thursday: { open: "08:00", close: "20:00" },
    friday: { open: "08:00", close: "22:00" },
    saturday: { open: "09:00", close: "22:00" },
    sunday: { open: "09:00", close: "18:00" },
  },
  images: {
    cover: "https://example.com/images/free-coffee-banner.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1548869447-faef5000334c?auto=format&fit=crop&q=80&w=870",
      "https://images.unsplash.com/photo-1549119246-cf57ef8a17b2?auto=format&fit=crop&q=80&w=870",
      "https://images.unsplash.com/photo-1548913344-66177da9425e?auto=format&fit=crop&q=80&w=873",
    ],
  },
};
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto grid md:grid-cols-[2fr_1fr] gap-6 items-start"
  >
    <Card class="overflow-hidden pt-0">
      <Carousel class="rounded-t-xl overflow-hidden">
        <CarouselContent>
          <CarouselItem v-for="(image, i) in offer.images.gallery" :key="i">
            <NuxtImg
              :src="image"
              class="w-full aspect-video object-cover"
              alt="Offer image"
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="left-4" variant="default" />
        <CarouselNext class="right-4" variant="default" />
      </Carousel>

      <CardContent class="p-6 space-y-5">
        <div class="flex items-center gap-3">
          <div>
            <h3 class="text-xl font-semibold leading-tight">
              {{ offer.title }}
            </h3>

            <span
              :class="[
                'mt-3 px-2 py-0.5 rounded-full text-xs font-medium capitalize shadow-sm bg-green-100 text-success',
              ]"
            >
              Active
            </span>
          </div>
        </div>

        <p class="text-muted-foreground leading-relaxed">
          {{ offer.description }}
        </p>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm text-muted-foreground"
        >
          <div
            class="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/30 transition"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 shadow-sm flex-shrink-0"
            >
              <Calendar class="w-5 h-5 text-white" />
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-foreground">Validity Period</span>
              <span class="text-xs text-muted-foreground">
                {{ new Date(offer.validFrom).toLocaleDateString() }} –
                {{ new Date(offer.validUntil).toLocaleDateString() }}
              </span>
            </div>
          </div>

          <div
            class="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/30 transition"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-sm flex-shrink-0"
            >
              <MapPin class="w-5 h-5 text-white" />
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-foreground">Location</span>
              <span class="text-xs text-muted-foreground">
                {{ offer.location.address }}, {{ offer.location.city }}
              </span>
            </div>
          </div>

          <div
            class="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/30 transition"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 shadow-sm flex-shrink-0"
            >
              <Timer class="w-5 h-5 text-white" />
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-foreground">Cooldown Period</span>
              <span class="text-xs text-muted-foreground">
                {{ offer.cooldownDays }} days between redemptions
              </span>
            </div>
          </div>

          <div
            class="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/30 transition"
          >
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 shadow-sm flex-shrink-0"
            >
              <Repeat class="w-5 h-5 text-white" />
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-foreground">Max Redemptions</span>
              <span class="text-xs text-muted-foreground">
                {{ offer.maxRedemptionsPerLead }} per customer
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="flex flex-col justify-between shadow-sm border-border/50">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Clock /> Opening Hours
        </CardTitle>
      </CardHeader>

      <CardContent
        class="divide-y divide-border/30 text-sm text-muted-foreground"
      >
        <div
          v-for="(hours, day) in offer.openingHours"
          :key="day"
          class="flex justify-between py-2"
        >
          <span class="capitalize">{{ day }}</span>
          <span>{{ hours.open }} - {{ hours.close }}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button class="w-full font-medium">Redeem Now</Button>
      </CardFooter>
    </Card>
  </div>
</template>
