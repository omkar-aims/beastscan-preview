<script setup lang="ts">
import { slugify } from "@vueuse/motion";
import { IdCard, ShoppingBag, ArrowRight } from "lucide-vue-next";

const campaignTypes = [
  {
    id: "business-card",
    title: "Digital Business Card",
    description:
      "Share your contact details, social links, and company info instantly with a modern digital business card.",
    icon: IdCard,
    users: "2.3k",
    gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  },
  {
    id: "product-page",
    title: "Product Page",
    description:
      "Showcase a product with images, pricing, and a clear call-to-action for purchase or enquiry.",
    icon: ShoppingBag,
    users: "2.9k",
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
  },
  {
    id: "redirect",
    title: "Redirect",
    description:
      "Instantly redirect users to any website, app, or deep link using a QR code or short link without any page setup.",
    icon: ArrowRight,
    users: "5.4k",
    gradient: "linear-gradient(135deg, #64748b, #475569)",
  },
];

const emit = defineEmits(["done"]);
const route = useRoute();
const selectedType = computed(() => route.query.type);
</script>

<template>
  <div>
    <div
      v-if="!selectedType"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <Card v-for="type in campaignTypes" :key="type.title">
        <CardContent>
          <div class="flex items-center gap-3 mb-2">
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full"
              :style="{ background: type.gradient }"
            >
              <component :is="type.icon" class="w-4 h-4 text-white" />
            </div>

            <h3 class="font-semibold">{{ type.title }}</h3>
          </div>
          <p class="text-sm text-muted-foreground">{{ type.description }}</p>
        </CardContent>

        <CardFooter class="justify-between mt-4">
          <div class="text-xs text-muted-foreground">
            Used by
            <span class="font-medium text-foreground">{{ type.users }}</span>
            people
          </div>

          <CardAction>
            <Button
              class="rounded-full gap-1"
              @click="() => emit('done', slugify(type.title))"
            >
              <span>Create</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
