<script setup lang="ts">
import {
  Globe,
  MessageSquare,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-vue-next";

const offerType = [
  { icon: Globe, label: "Food & Drink" },
  { icon: MessageSquare, label: "Wellness" },
  { icon: Mail, label: "Retails" },
  { icon: Phone, label: "Services" },
  { icon: MessageCircle, label: "Entertainment" },
];

const OfferCategory = [
  { icon: Globe, label: "FreeBie" },
  { icon: MessageSquare, label: "Percentage Discount" },
  { icon: Mail, label: "Fixed Amount Discount" },
  { icon: Phone, label: "Buy One Get One" },
  { icon: MessageCircle, label: "First Time Deal" },
];

const selectedOfferType = ref<string | null>(null);
const selectedOfferCategory = ref<string | null>(null);
</script>

<template>
  <Card class="p-8 space-y-8 border border-primary/10 shadow-sm rounded-2xl">
    <!-- Header -->
    <CardHeader>
      <h2 class="text-2xl font-semibold text-primary tracking-tight">
        Offer Details
      </h2>
      <p class="text-sm mt-1">Fill in the details below</p>
    </CardHeader>

    <!-- Form Starts -->
    <Form class="space-y-8">
      <CardContent class="space-y-8">
        <!-- Title & Description -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="title">
            <FormItem>
              <FormLabel>Offer Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter offer title" />
              </FormControl>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>

          <FormField name="description">
            <FormItem>
              <FormLabel>Offer Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter offer description" />
              </FormControl>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>
        </div>

        <!-- Valid Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="validFrom">
            <FormItem>
              <FormLabel>Valid From</FormLabel>
              <FormControl>
                <DatePicker
                  class="w-full border-primary/30 focus-visible:ring-primary rounded-lg"
                />
              </FormControl>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>

          <FormField name="validTo">
            <FormItem>
              <FormLabel>Valid To</FormLabel>
              <FormControl>
                <DatePicker
                  class="w-full border-primary/30 focus-visible:ring-primary rounded-lg"
                />
              </FormControl>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>
        </div>

        <!-- Max Redemption -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="maxRedemptions">
            <FormItem>
              <FormLabel>Max Redemptions Per User</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter number" />
              </FormControl>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>
        </div>
        <!-- Offer Type -->
        <div class="pt-6 border-t border-muted-foreground/30">
          <FormField name="offerType">
            <FormItem>
              <FormLabel class="text-primary"
                >Offer Type</FormLabel
              >
              <div class="flex flex-wrap gap-3 mt-2">
                <SelectableButton
                  v-for="item in offerType"
                  :key="item.label"
                  :icon="item.icon"
                  :label="item.label"
                  :selected="selectedOfferType === item.label"
                  class="transition-all hover:scale-105"
                  @click="selectedOfferType = item.label"
                />
              </div>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>
        </div>

        <!-- Offer Category -->
        <div class="pt-6 border-t border-primary/20">
          <FormField name="offerCategory">
            <FormItem>
              <FormLabel class="font-semibold text-primary"
                >Offer Category</FormLabel
              >
              <div class="flex flex-wrap gap-3 mt-2">
                <SelectableButton
                  v-for="item in OfferCategory"
                  :key="item.label"
                  :icon="item.icon"
                  :label="item.label"
                  :selected="selectedOfferCategory === item.label"
                  class="transition-all hover:scale-105"
                  @click="selectedOfferCategory = item.label"
                />
              </div>
              <FormMessage class="text-sm text-secondary" />
            </FormItem>
          </FormField>
        </div>
      </CardContent>

      <CardFooter class="flex justify-end border-t border-primary/20 pt-6">
        <CardAction>
          <slot />
        </CardAction>
      </CardFooter>
    </Form>
    <!-- Form Ends -->
  </Card>
</template>
