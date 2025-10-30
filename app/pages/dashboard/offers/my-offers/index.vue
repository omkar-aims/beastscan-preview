<script setup lang="ts">
import { ArrowRight, Gift } from "lucide-vue-next";

definePageMeta({
  layout: "offers-overview",
});

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get 20% off on all items",
    status: "active",
    redemption: 20,
    icon: Gift,
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
      <AppRow gap="md">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="offer in offers"
            :key="offer.id"
            class="overflow-hidden pt-0"
          >
            <NuxtImg
              :src="offer.image?.src"
              :alt="offer.image?.alt"
              class="w-full h-40 object-cover"
            />
            <CardContent class="p-5">
              <!-- Header -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <!-- Icon -->
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
                  >
                    <component
                      :is="offer.icon"
                      class="w-5 h-5 text-muted-foreground"
                    />
                  </div>

                  <!-- Title + Badge -->
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-primary">
                      {{ offer.title }}
                    </h3>
                    <Badge
                      :variant="
                        offer.status === 'active' ? 'default' : 'secondary'
                      "
                      class="text-[11px] font-medium px-2 py-0.5 capitalize"
                    >
                      {{ offer.status }}
                    </Badge>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div
                class="text-sm text-muted-foreground space-y-2 mb-5 leading-relaxed"
              >
                <p>{{ offer.description }}</p>
                <p>
                  <span class="font-medium text-primary">Valid:</span>
                  {{ offer.valid.from }} – {{ offer.valid.to }}
                </p>
              </div>
            </CardContent>

            <!-- Footer -->
            <CardFooter class="pt-0">
              <Button
                class="w-full bg-primary text-white font-medium rounded-md"
              >
                <NuxtLink
                  to="/dashboard/offers/stats"
                  class="w-full text-center block text-white"
                >
                  View Stats
                  <ArrowRight class="w-4 h-4 inline-block ml-1" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppRow>
    </template>
  </div>
</template>
