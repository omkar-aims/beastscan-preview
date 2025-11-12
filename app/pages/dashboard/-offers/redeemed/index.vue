<script setup lang="ts">
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

type Offer = {
  title: string;
  location: string;
  redeemedOn: string;
  description: string;
  cooldown?: boolean;
  showActions?: boolean;
  image?: { src: string; alt: string };
};

const offers: Offer[] = [
  {
    title: "Free Coffee with Launch",
    location: "Café Bonjour, Zürich",
    redeemedOn: "July 2, 2025 at 12:43 PM",
    description:
      "You claimed a free coffee with your main dish order. Hope you enjoyed it!",
    cooldown: true,
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="(offer, index) in offers"
          :key="index"
          class="rounded-xl border shadow-sm transition hover:shadow-md"
        >
          <CardHeader class="flex flex-col space-y-3">
            <!-- Image Section -->
            <div class="w-full h-48 overflow-hidden rounded-xl">
              <NuxtImg
                :src="offer.image?.src"
                :alt="offer.image?.alt"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <!-- Title + Badge Row -->
            <div class="flex items-center justify-between w-full mt-1">
              <h3 class="text-base font-semibold text-primary truncate">
                {{ offer.title }}
              </h3>

              <Badge variant="secondary" class="px-2 py-1 rounded-md">
                Redeemed
              </Badge>
            </div>
          </CardHeader>

          <CardContent class="space-y-2">
            <p class="font-medium">{{ offer.location }}</p>
            <p class="">Redeemed on {{ offer.redeemedOn }}</p>
            <p class="mt-2">{{ offer.description }}</p>
          </CardContent>

          <CardFooter class="mt-3">
            <!-- Cooldown State -->
            <div
              v-if="offer.cooldown"
              class="w-full text-center text-sm py-2 border rounded-lg bg-muted"
            >
              Cooldown active
            </div>

            <!-- Action Buttons -->
            <div
              v-else-if="offer.showActions"
              class="flex w-full justify-between"
            >
              <Button variant="default" class="w-[48%]">Redeem Again</Button>
              <Button variant="outline" class="w-[48%]">Leave a Review</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </template>
  </div>
</template>
