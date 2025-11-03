<script setup lang="ts">
import { slugify } from "@vueuse/motion";
import { toTypedSchema } from "@vee-validate/zod";
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
} from "lucide-vue-next";
import { useForm } from "vee-validate";
import FormMessage from "~/components/ui/form/FormMessage.vue";
import { useCreateCampaign } from "~/composables/campaign/useCreateCampaign";
import { createCampaignSchema } from "~/schemas";

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
const open = ref(false);

const selectedType = computed(() => route.query.type);

const form = useForm({
  validationSchema: toTypedSchema(createCampaignSchema),
});

const { mutateAsync, status } = useCreateCampaign();
const error = ref<string | null>(null);
const builderStore = useBuilderStore();
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await mutateAsync(values, {
      onSuccess(data) {
        open.value = false;
        const campaign = data.data;
        builderStore.setCampaign(campaign);
        nextTick(() => {
          navigateTo(`/design?campaign=${campaign.attributes.slug}`);
        });
      },
    });
    form.resetForm();
  } catch (err: any) {
    error.value = err.message ?? "Something went wrong";
  }
});
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
            <Button class="rounded-full gap-1" @click="open = true">
              <span>Create</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>

    <Dialog v-model:open="open">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create campaign</DialogTitle>
          <DialogDescription>
            Give the details of your campaign.
          </DialogDescription>
        </DialogHeader>

        <form class="space-y-4 max-w-md" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel class="text-sm font-medium">
                Campaign Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a clear, engaging campaign title"
                  v-bind="componentField"
                  class="bg-card"
                  @change="
                (e: Event) => {
                  const target = e.target as HTMLInputElement
                  form.setFieldValue('slug', slugify(target.value))
                }
              "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="slug">
            <FormItem>
              <FormLabel class="text-sm font-medium"> Campaign Slug </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. summer-sale-2025"
                  v-bind="componentField"
                  class="bg-card"
                  @focus="error = null"
                />
              </FormControl>
              <FormMessage />
              <p
                v-if="error !== null"
                class="text-destructive-foreground text-sm"
              >
                {{ error }}
              </p>
            </FormItem>
          </FormField>

          <DialogFooter class="mt-4">
            <DialogClose as-child>
              <Button type="button" variant="outline"> Cancel </Button>
            </DialogClose>
            <StatefulButton :status="status"> Create Campaign </StatefulButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
