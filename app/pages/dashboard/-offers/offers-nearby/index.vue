<script setup lang="ts">

definePageMeta({
  layout: "offers-overview",
});

type ImageType = {
  src: string;
  alt: string;
};

type DataType = {
  id: number;
  offerType: string;
  title: string;
  address: string;
  distance: number;
  cooldown: string;
  time: string;
  valid: { from: string; to: string };
  image?: ImageType;
  category?: string;
};

const data = ref<DataType[]>([
  {
    id: 1,
    offerType: "Freebie",
    title: "Free Espresso with Any Pastry",
    address: "Café Aroma – Main Street 42, Zürich",
    distance: 1.4,
    cooldown: "1 month",
    time: "08:00–18:00",
    valid: { from: "Aug 1", to: "Aug 30" },
    image: { src: "/bogo.png", alt: "Cup of coffee with pastry" },
    category: "Food & Drink",
  },
  {
    id: 2,
    offerType: "Discount",
    title: "25% Off All Haircuts",
    address: "StyleBarber – Bahnhofstrasse 12, Zürich",
    distance: 2.1,
    cooldown: "1 month",
    time: "10:00–19:00",
    valid: { from: "July 1", to: "Sept 30" },
    image: { src: "/big-Sale.jpg", alt: "Haircut discount poster" },
    category: "Wellness",
  },
  {
    id: 3,
    offerType: "Discount",
    title: "Buy 1 Get 1 Free Shampoo",
    address: "StyleBarber – Bahnhofstrasse 12, Zürich",
    distance: 4.8,
    cooldown: "1 month",
    time: "10:00–19:00",
    valid: { from: "July 1", to: "Sept 30" },
    image: { src: "/super-sale.jpg", alt: "Haircut discount poster" },
    category: "Retails",
  },
  {
    id: 4,
    offerType: "Cashback",
    title: "10% Cashback on Electronics",
    address: "TechHub – Central Plaza 5, Zürich",
    distance: 8.2,
    cooldown: "2 weeks",
    time: "09:00–21:00",
    valid: { from: "Sept 1", to: "Oct 31" },
    image: { src: "/fixed-discount.webp", alt: "Cashback promotion" },
    category: "Services",
  },
]);

const filters = ref({
  search: "",
  distance: "",
  offerType: "",
  category: "",
});

const filteredData = computed(() => {
  return data.value.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(filters.value.search.toLowerCase());

    const matchesDistance =
      !filters.value.distance ||
      (filters.value.distance === "1" && item.distance <= 1) ||
      (filters.value.distance === "5" && item.distance <= 5) ||
      (filters.value.distance === "10" && item.distance <= 10);

    const matchesOfferType =
      !filters.value.offerType || item.offerType === filters.value.offerType;

    const matchesCategory =
      !filters.value.category || item.category === filters.value.category;

    return (
      matchesSearch &&
      matchesDistance &&
      matchesOfferType &&
      matchesCategory
    );
  });
});

const clearFilters = () => {
  filters.value = { search: "", distance: "", offerType: "", category: "" };
};

const offerTypes = computed(() =>
  Array.from(
    new Set(data.value.map((d) => d.offerType).filter((t): t is string => !!t))
  )
);
const categories = computed(() =>
  Array.from(
    new Set(data.value.map((d) => d.category).filter((c): c is string => !!c))
  )
);

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
    <!-- Smart Filters always visible -->
    <div class="flex w-full justify-end items-center mb-4">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline">Smart Filters</Button>
        </SheetTrigger>

        <SheetContent side="right" class="w-full sm:w-96 p-4 flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle class="text-lg font-semibold">Filters</SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-4 mt-2">
            <!-- Search -->
            <div>
              <label class="text-sm font-medium mb-1 block">Search by Name</label>
              <Input v-model="filters.search" placeholder="Search offers..." />
            </div>

            <!-- Distance -->
            <div>
              <label class="text-sm font-medium mb-1 block">Distance</label>
              <Select v-model="filters.distance">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent class="w-full">
                  <SelectItem value="1">Within 1 KM</SelectItem>
                  <SelectItem value="5">Within 5 KM</SelectItem>
                  <SelectItem value="10">Within 10 KM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Offer Type -->
            <div>
              <label class="text-sm font-medium mb-1 block">Offer Type</label>
              <Select v-model="filters.offerType">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select offer type" />
                </SelectTrigger>
                <SelectContent class="w-full">
                  <SelectItem v-for="type in offerTypes" :key="type" :value="type">
                    {{ type }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Category -->
            <div>
              <label class="text-sm font-medium mb-1 block">Category</label>
              <Select v-model="filters.category">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent class="w-full">
                  <SelectItem v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Buttons -->
            <div class="flex justify-between mt-4 gap-2">
              <Button variant="outline" @click="clearFilters" class="w-1/2">
                Clear
              </Button>
              <Button class="w-1/2">Apply</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <div v-if="data.length === 0">
      <EmptyResource v-bind="emptyResource" />
    </div>

    <div v-else-if="filteredData.length === 0" class="text-center py-10">
      No offers found matching your filters.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="offer in filteredData"
        :key="offer.id"
        class="group cursor-pointer relative overflow-hidden"
      >
        <CardContent>
          <div class="flex flex-col justify-between h-full">
            <div class="w-full h-48 rounded-xl overflow-hidden mb-4">
              <NuxtImg
                :src="offer.image?.src"
                :alt="offer.image?.alt"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <!-- Content Section -->
            <div class="flex flex-col gap-2 py-4 flex-1">
              <div class="flex items-center justify-between">
                <Badge class="text-xs font-medium px-2 py-1">
                  {{ offer.offerType }}
                </Badge>
              </div>

              <h3 class="font-semibold text-lg leading-tight">
                {{ offer.title }}
              </h3>

              <p class="text-sm text-muted-foreground">{{ offer.address }}</p>

              <div class="mt-1 space-y-1 text-sm">
                <p>
                  <span class="font-medium">Valid:</span>
                  {{ offer.valid.from }} – {{ offer.valid.to }}
                </p>
                <p>
                  <span class="font-medium">Today:</span>
                  {{ offer.time }}
                </p>
              </div>
            </div>

            <Button class="w-full py-2 mt-auto">
              <NuxtLink to="/dashboard/offers/redeem" class="w-full">
                View & Redeem
              </NuxtLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

