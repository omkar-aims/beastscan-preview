<script setup lang="ts">
definePageMeta({
  layout: "offers-overview",
});

type ImageType = {
  src: string;
  alt: string;
};

type Offer = {
  id: number;
  title: string;
  description: string;
  status: "active" | "inactive";
  redemption: number;
  valid: { from: string; to: string };
  image?: ImageType;
};

const offers: Offer[] = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get 20% off on all items",
    status: "active",
    redemption: 20,
    valid: { from: "01 June 2024", to: "30 June 2024" },
    image: {
      src: "/big-Sale.jpg",
      alt: "Cup of coffee with pastry",
    },
  },
];

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
</script>
<template>
  <div>
    <template v-if="offers.length === 0">
      <EmptyResource v-bind="emptyResource" />
    </template>
    <template v-if="true">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <Card
          v-for="offer in offers"
          :key="offer.id"
          class="group py-0 cursor-pointer overflow-hidden  shadow-md hover:shadow-lg"
        >
          <CardContent class="p-4 flex flex-col h-full">
            <!-- Image -->
            <div class="w-full h-48 rounded-xl overflow-hidden mb-4">
              <NuxtImg
                :src="offer.image?.src"
                :alt="offer.image?.alt"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Header -->
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-semibold text-primary">
                  {{ offer.title }}
                </h3>
                <Badge
                  :variant="offer.status === 'active' ? 'default' : 'secondary'"
                  class="text-[11px] font-medium px-2 py-0.5 capitalize"
                >
                  {{ offer.status }}
                </Badge>
              </div>
            </div>

            <!-- Description -->
            <div class="flex-1 space-y-2 text-sm mb-4">
              <p>{{ offer.description }}</p>
              <p>
                <span class="font-medium text-primary">Valid:</span>
                {{ offer.valid.from }} – {{ offer.valid.to }}
              </p>
            </div>

            <!-- Redemption Card -->
            <!-- <div class="flex justify-center mb-4">
              <Card
                class="bg-primary/10 rounded-xl shadow-none w-32 text-center"
              >
                <CardContent>
                  <p class="text-3xl font-bold text-primary leading-tight">
                    {{ offer.redemption }}
                  </p>
                  <p class="text-xs tracking-wide">Redemptions</p>
                </CardContent>
              </Card>
            </div> -->

            <!-- Button -->
          </CardContent>
          <CardFooter class="p-4 pt-0">
            <Button class="w-full bg-primary font-medium ">
              <NuxtLink to="/dashboard/offers/stats" class="w-full">
                View Stats
              </NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </template>
  </div>
</template>
