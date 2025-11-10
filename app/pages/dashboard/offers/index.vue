<script setup lang="ts">
import {
  Gift,
  ShoppingBag,
  Coffee,
  Music,
  Car,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Plus,
} from "lucide-vue-next";
import { ref } from "vue";

const emptyStates = {
  "my-offers": {
    icon: Gift,
    title: "You haven't created any offers yet",
    description:
      "Start by creating your first offer to attract more customers.",
    buttonText: "Create Offer",
    link: "/dashboard/offers/new",
  },
  redeemed: {
    icon: CheckCircle2,
    title: "No redeemed offers yet",
    description: "Claim an offer to see it here.",
  },
  nearby: {
    icon: MapPin,
    title: "No nearby offers found",
    description: "Check back later for offers in your area.",
  },
};

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
    location: { city: "Mumbai", store: "BrewHouse Café, Bandra" },
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
    location: { city: "Delhi", store: "Online - StyleKart" },
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
    location: { city: "Bengaluru", store: "GoRide App" },
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
    location: { city: "Chennai", store: "Online - SoundWave" },
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
    location: { city: "Pune", store: "ElectroMart, Phoenix Mall" },
    icon: Gift,
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
    users: "2.9k",
    claimed: false,
  },
];

const tags = [
  { label: "Nearby offers", value: "nearby" },
  { label: "My offers", value: "my-offers" },
  { label: "Redeemed offers", value: "redeemed" },
];

const route = useRoute();
const router = useRouter();

const activeTag = ref((route.query.key as string) || "nearby");
const currentState = computed(() => emptyStates[activeTag.value]);

watch(
  () => route.query.key,
  (val) => {
    activeTag.value = val?.toString() || "nearby";
  }
);

function setActiveTag(tag: string) {
  activeTag.value = tag;
  router.replace({ query: { key: tag } });
}

const filteredOffers = computed(() => {
  switch (activeTag.value) {
    case "nearby":
      return offers;

    case "my-offers":
      return offers.filter((o) => !o.claimed);

    case "redeemed":
      return offers.filter((o) => o.claimed);

    default:
      return offers;
  }
});
</script>

<template>
  <AppRow gap="md">
    <AppRow direction="horizontal" class="justify-between items-center">
      <AppHeading :level="3">Available offers</AppHeading>
      <NuxtLink href="/dashboard/offers/new">
        <Button class="rounded-full">Post Offer</Button>
      </NuxtLink>
    </AppRow>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="tag in tags"
        :key="tag.value"
        class="group flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer border border-muted-foreground/10 bg-muted-foreground/10 transition-all duration-200"
        :class="
          activeTag === tag.value
            ? 'border-primary bg-primary '
            : 'hover:border-primary hover:bg-primary'
        "
        @click="setActiveTag(tag.value)"
      >
        <span
          class="transition-colors duration-200 text-sm"
          :class="
            activeTag === tag.value
              ? 'text-primary-foreground'
              : 'text-muted-foreground group-hover:text-primary-foreground'
          "
        >
          {{ tag.label }}
        </span>
      </div>
    </div>

    <div
      v-if="filteredOffers.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <Card
        v-for="offer in filteredOffers"
        :key="offer.title"
        class="overflow-hidden pt-0"
      >
        <NuxtImg
          :src="offer.image"
          :alt="offer.title"
          class="w-full aspect-video object-cover"
        />
        <CardContent class="p-6 py-0">
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

          <NuxtLink
            v-if="!offer.claimed && activeTag !== 'my-offers'"
            href="/dashboard/offers/demo/redeem"
          >
            <Button class="rounded-full gap-1">
              <span>Claim</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </NuxtLink>

          <Button
            v-if="offer.claimed && activeTag !== 'my-offers'"
            disabled
            class="bg-success rounded-full"
          >
            <CheckCircle2 class="w-4 h-4" />
            <span>Claimed</span>
          </Button>

          <NuxtLink
            v-if="!offer.claimed && activeTag === 'my-offers'"
            href="/dashboard/offers/demo/"
          >
            <Button class="rounded-full gap-1">
              <span>View Detail</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>

    <div v-else class="text-center">
      <Card>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <component :is="currentState.icon" class="w-12 h-12" />
            </EmptyMedia>
            <EmptyTitle>{{ currentState.title }}</EmptyTitle>
            <EmptyDescription>{{ currentState.description }}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    </div>
  </AppRow>
</template>
