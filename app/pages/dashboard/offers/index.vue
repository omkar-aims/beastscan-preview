<script setup lang="ts">
import {
  Gift,
  ShoppingBag,
  Coffee,
  Music,
  Car,
  ArrowRight,
  CheckCircle2,
  MapPin,
  CalendarDays,
} from "lucide-vue-next";

const offers = [
  {
    title: "Buy 1 Get 1 Free Coffee",
    description:
      "Enjoy a free cappuccino when you buy any coffee beverage at BrewHouse Café.",
    type: "buy one get one free",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
    validFrom: "2025-10-17T07:12:19.964Z",
    validUntil: "2025-11-17T07:12:19.964Z",
    location: {
      city: "Mumbai",
      store: "BrewHouse Café, Bandra",
    },
    icon: Coffee,
    gradient: "linear-gradient(135deg, #f59e0b, #facc15)",
    users: "1.3k",
    claimed: false,
  },
  {
    title: "Flat ₹200 Off on Fashion Orders",
    description: "Get ₹200 off on all fashion items above ₹999 on StyleKart.",
    type: "flat discount",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    validFrom: "2025-10-18T00:00:00.000Z",
    validUntil: "2025-10-31T23:59:59.000Z",
    location: {
      city: "Delhi",
      store: "Online - StyleKart",
    },
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    users: "2.1k",
    claimed: false,
  },
  {
    title: "20% Off Your First Ride",
    description: "New users get 20% off their first trip with GoRide.",
    type: "first time deal",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    validFrom: "2025-10-17T07:12:19.964Z",
    validUntil: "2025-12-31T07:12:19.964Z",
    location: {
      city: "Bengaluru",
      store: "GoRide App",
    },
    icon: Car,
    gradient: "linear-gradient(to top right, #6366f1, #3b82f6)",
    users: "3.4k",
    claimed: true,
  },
  {
    title: "Free 7-Day Music Trial",
    description:
      "Stream unlimited music for free for 7 days with SoundWave Premium.",
    type: "free trial",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    validFrom: "2025-10-17T07:12:19.964Z",
    validUntil: "2026-01-17T07:12:19.964Z",
    location: {
      city: "Chennai",
      store: "Online - SoundWave",
    },
    icon: Music,
    gradient: "linear-gradient(to top right, #ec4899, #f43f5e)",
    users: "4.8k",
    claimed: false,
  },
  {
    title: "15% Off Electronics",
    description:
      "Save 15% on all gadgets and accessories this festive season at ElectroMart.",
    type: "percent discount",
    image:
      "https://images.unsplash.com/photo-1492140260770-41aec2341f6f?auto=format&fit=crop&w=871&q=80",
    validFrom: "2025-10-17T07:12:19.964Z",
    validUntil: "2025-11-10T07:12:19.964Z",
    location: {
      city: "Pune",
      store: "ElectroMart, Phoenix Mall",
    },
    icon: Gift,
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
    users: "2.9k",
    claimed: false,
  },
];

const tags = ["Nearby offers", "My offers", "Redeemed Offers"];
const activeTag = ref<string>("Nearby offers");
</script>

<template>
  <AppRow gap="md">
    <AppRow direction="horizontal" class="justify-between items-center">
      <AppHeading :level="3">Available offers</AppHeading>
      <Button class="rounded-full">Post Offer</Button>
    </AppRow>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="tag in tags"
        :key="tag"
        class="group flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer border border-muted-foreground/10 bg-muted-foreground/10 transition-all duration-200"
        :class="
          activeTag === tag
            ? 'border-primary bg-primary '
            : 'hover:border-primary hover:bg-primary'
        "
        @click="() => (activeTag = tag)"
      >
        <span
          class="transition-colors duration-200 text-sm"
          :class="
            activeTag === tag
              ? 'text-primary-foreground'
              : 'text-muted-foreground group-hover:text-primary-foreground'
          "
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="offer in offers"
        :key="offer.title"
        class="overflow-hidden pt-0"
      >
        <NuxtImg
          :src="offer.image"
          :alt="offer.title"
          class="w-full h-40 object-cover"
        />
        <CardContent class="p-4">
          <div class="flex items-center gap-3 mb-2">
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full"
              :style="{ background: offer.gradient }"
            >
              <component :is="offer.icon" class="w-4 h-4 text-white" />
            </div>
            <h3 class="font-semibold">{{ offer.title }}</h3>
          </div>

          <p class="text-sm text-muted-foreground mb-2">
            {{ offer.description }}
          </p>
          <div class="flex flex-col gap-1 text-xs text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <MapPin class="w-4 h-4" />
              <span
                >{{ offer.location.city }} — {{ offer.location.store }}</span
              >
            </div>
            <div class="flex items-center gap-1.5">
              <CalendarDays class="w-4 h-4" />
              <span
                >Valid till
                {{ new Date(offer.validUntil).toLocaleDateString() }}</span
              >
            </div>
          </div>
        </CardContent>

        <CardFooter class="justify-between mt-2">
          <div class="text-xs text-muted-foreground">
            Claimed by
            <span class="font-medium text-foreground">{{ offer.users }}</span>
            users
          </div>

          <Button v-if="!offer.claimed" class="rounded-full gap-1">
            <span>Claim</span>
            <ArrowRight class="w-4 h-4" />
          </Button>

          <Button v-else disabled class="bg-success rounded-full">
            <CheckCircle2 class="w-4 h-4" />
            <span>Claimed</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </AppRow>
</template>
