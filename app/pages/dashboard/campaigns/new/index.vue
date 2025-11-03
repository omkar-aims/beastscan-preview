<script setup lang="ts">
import {
  IdCard,
  UtensilsCrossed,
  Globe,
  Gift,
  TicketPercent,
  Users,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from "lucide-vue-next";

const campaignTypes = [
  {
    title: "Digital Business Card",
    description:
      "Share your contact details, social links, and company info instantly with a modern digital business card.",
    icon: IdCard,
    users: "2.3k",
    gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  },

  {
    title: "Landing Page",
    description:
      "Create a simple promotional page to showcase products, services, or special announcements.",
    icon: Globe,
    users: "3.5k",
    gradient: "linear-gradient(to top right, #38bdf8, #6366f1)",
  },
  {
    title: "Product Page",
    description:
      "Showcase a product with beautiful images, details, pricing, and direct buy or inquiry options.",
    icon: ShoppingBag,
    users: "2.9k",
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
  },
  {
    title: "Restaurant Menu",
    description:
      "Display your full menu with images, prices, and categories. Update items anytime without reprinting.",
    icon: UtensilsCrossed,
    users: "1.8k",
    gradient: "linear-gradient(135deg, #f97316, #facc15)",
  },
  {
    title: "Gift Card",
    description:
      "Let customers buy, send, and redeem digital gift cards easily—perfect for special occasions.",
    icon: Gift,
    users: "1.2k",
    gradient: "linear-gradient(to top right, #f43f5e, #ec4899)",
  },
  {
    title: "Stamp Card",
    description:
      "Reward loyal customers with a digital punch card that tracks visits or purchases automatically.",
    icon: TicketPercent,
    users: "950",
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
  },
  {
    title: "Referral Program",
    description:
      "Encourage customers to refer friends and earn rewards with easy tracking through unique links or QR codes.",
    icon: Users,
    users: "1.7k",
    gradient: "linear-gradient(to top right, #8b5cf6, #a21caf)",
  },
  {
    title: "Giveaway",
    description:
      "Run engaging contests or lucky draws to boost engagement and attract new audiences.",
    icon: Sparkles,
    users: "2.1k",
    gradient: "linear-gradient(to top right, #fb923c, #ef4444)",
  },
];

const route = useRoute();

const selectedType = computed(() => route.query.type);
const showTemplate = ref<boolean>(false);
const showBuilder = ref<boolean>(false);

const builderStore = useBuilderStore();
const router = useRouter();

watch(
  () => selectedType.value,
  (newValue) => {
    if (!newValue) {
      showTemplate.value = false;
      showBuilder.value = false;
      builderStore.close();
    }
  }
);

watch(
  () => showBuilder.value,
  (value) => {
    if (value) {
      builderStore.open();
      builderStore.setAction(() => {
        router.replace("/dashboard/campaigns/");
      });
    } else builderStore.close();
  }
);

onUnmounted(() => {
  builderStore.close();
});

const templates = [
  {
    name: "Classic Lead Capture",
    preview:
      "https://files.jotform.com/jotformapps/lead-capture-form-dde416f59c804b9d693d09e0da962a7c-classic.png",
  },
  {
    name: "Modern Lead Form",
    preview:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgzk6KSI8ROLGzE_7zjUfi8G1VK21qpxOgA&s",
  },
  {
    name: "Marketing Form Example",
    preview:
      "https://cdn.marketing123.123formbuilder.com/wp-content/uploads/2020/12/Lead-Capture-Form-4030148-1.jpg",
  },
];
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
            <NuxtLink
              :href="`/dashboard/campaigns/new?type=${type.title
                .toLowerCase()
                .replaceAll(' ', '-')}`"
            >
              <Button class="rounded-full gap-1">
                <span>Create</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </NuxtLink>
          </CardAction>
        </CardFooter>
      </Card>
    </div>

    <div v-if="selectedType && !showTemplate" class="space-y-4">
      <div>
        <AppHeading :level="2" class="text-xl font-semibold"> Info </AppHeading>
        <p class="text-muted-foreground">Give the details of your campaign.</p>
      </div>

      <form class="space-y-4 max-w-md">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel class="text-sm font-medium"
              >Name your campaign</FormLabel
            >
            <FormControl>
              <Input
                placeholder="People will see this, so give it a nice name!"
                v-bind="componentField"
                class="bg-card"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="gap-2" type="button" @click="showTemplate = true">
          <span>Continue to design</span>
          <ChevronRight class="w-4 h-4" />
        </Button>
      </form>
    </div>

    <div v-if="showTemplate && !showBuilder" class="space-y-4">
      <div>
        <AppHeading :level="2" class="text-xl font-semibold">
          Design
        </AppHeading>
        <p class="text-muted-foreground">
          Choose a template or start from scratch.
        </p>
      </div>

      <TheTemplatePicker
        :templates="templates"
        :handle-select="() => (showBuilder = true)"
      />
    </div>

    <div v-if="showBuilder" class="relative">
      <TheBuilder source="https://beast-builder.netlify.app/" />
    </div>
  </div>
</template>
