<script setup lang="ts">
import { Gift, MapPin, CalendarDays } from "lucide-vue-next";
definePageMeta({
  layout: "offers-overview",
});

const emptyResource = {
  title: "Launch Your First Pop-Up Form",
  description:
    "Capture attention instantly with eye-catching forms that appear exactly when your visitors are most engaged.",

  image: {
    src: "/popup-form.svg",
    alt: "Popup form illustration",
  },

  link: {
    label: "Create New",
    url: "/dashboard/forms/new",
  },

  items: [
    {
      strong: "Capture more subscribers:",
      normal: " with attention-grabbing forms that engage visitors instantly.",
    },
    {
      strong: "Customize triggers:",
      normal: " — on page load, scroll, or exit intent.",
    },
    {
      strong: "Stay user-friendly:",
      normal: " with mobile-ready layouts and consent options.",
    },
  ],
};

const offers = [
  {
    title: "Free Coffee with Lunch",
    location: "Café Bonjour, Zürich",
    redeemedOn: "July 2, 2025 at 12:43 PM",
    description:
      "You claimed a free coffee with your main dish order. Hope you enjoyed it!",
    cooldown: true,
    icon: Gift,
    gradient: "linear-gradient(to top right, #ec4899, #f43f5e)",
    image: {
      src: "/super-sale.jpg",
      alt: "Cup of coffee with pastry",
    },
  },
  {
    title: "10% Off Haircuts",
    location: "Urban Cut, Cham",
    redeemedOn: "June 22, 2025 at 15:08",
    description: "You saved 10% on your last haircut — well played Guys !",
    showActions: true,
    icon: Gift,
    gradient: "linear-gradient(to top right, #ec4899, #f43f5e)",
    image: {
      src: "/super-sale.jpg",
      alt: "Haircut scene",
    },
  },
];
</script>
<template>
  <div>
    <template v-if="offers.length === 0">
      <EmptyResource v-bind="emptyResource" />
    </template>
    <template v-else>
      <AppRow gap="md">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="offer in offers"
            :key="offer.title"
            class="overflow-hidden pt-0"
          >
            <NuxtImg
              :src="offer.image?.src"
              :alt="offer.image?.alt"
              class="w-full h-40 object-cover"
            />

            <CardContent class="p-5">
              <!-- Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <!-- Icon Circle -->
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                    :style="{ background: offer.gradient }"
                  >
                    <component :is="offer.icon" class="w-5 h-5 text-white" />
                  </div>

                  <!-- Title -->
                  <h3 class="font-semibold text-primary text-base">
                    {{ offer.title }}
                  </h3>
                </div>

                <!-- Badge -->
                <Badge
                  variant="secondary"
                  class="text-xs font-medium px-2 py-1 rounded-md"
                >
                  Redeemed
                </Badge>
              </div>

              <!-- Description -->
              <p class="text-sm text-muted-foreground mb-4 leading-relaxed">
                {{ offer.description }}
              </p>

              <!-- Details -->
              <div class="space-y-2 text-sm text-muted-foreground">
                <!-- Location -->
                <div class="flex items-center gap-2">
                  <MapPin class="w-4 h-4" />
                  <span>{{ offer.location }}</span>
                </div>

                <!-- Redeemed Date -->
                <div class="flex items-center gap-2">
                  <CalendarDays class="w-4 h-4" />
                  <span>{{ offer.redeemedOn }}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter class="justify-between mt-2">
              <!-- Cooldown State -->
              <Button v-if="offer.cooldown" class="w-full">
                Cooldown active
              </Button>

              <!-- Action Buttons -->
              <div
                v-else-if="offer.showActions"
                class="flex w-full justify-between"
              >
                <Button variant="default" class="w-[48%]">Redeem Again</Button>
                <Button variant="outline" class="w-[48%]"
                  >Leave a Review</Button
                >
              </div>
            </CardFooter>
          </Card>
        </div>
      </AppRow>
    </template>
  </div>
</template>
