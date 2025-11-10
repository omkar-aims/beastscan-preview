<script setup lang="ts">
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Share2,
} from "lucide-vue-next";

const data = {
  offerTitle: "Free Clogs",
  offerDescription: "Get free clogs on shopping above ₹5000.",
  offerProvider: "Paras Shoes",
  valid: "July 31, 2025",
  category: "Retail",
  mainImageUrl: "/offerImage.png",
  extraImages: ["/firstOffer.jpg", "secondOffer.jpg", "thirdOffer.jpg"], // Example image URLs
};

const openingHours = [
  { day: "Monday", time: "8:00 AM - 10:00 PM" },
  { day: "Tuesday", time: "8:00 AM - 10:00 PM" },
  { day: "Wednesday", time: "8:00 AM - 10:00 PM" },
  { day: "Thursday", time: "8:00 AM - 10:00 PM" },
  { day: "Friday", time: "8:00 AM - 10:00 PM" },
  { day: "Saturday", time: "8:00 AM - 10:00 PM" },
  { day: "Sunday", time: "Holiday" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];
</script>

<template>
  <div class="w-full mx-auto p-4 sm:p-6 lg:p-8">
    <h1
      class="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-8"
    >
      Redeem Your Offer
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <Card
          class="border-2 border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden"
        >
          <div v-if="data.mainImageUrl" class="w-full h-64 p-4 rounded">
            <NuxtImg
              :src="data.mainImageUrl"
              alt="Offer Image"
              class="w-full h-full object-cover m-"
            />
          </div>

          <CardHeader class="pb-4">
            <Badge
              variant="secondary"
              class="font-semibold text-xs px-2 py-1 mb-3 w-fit"
            >
              {{ data.category }}
            </Badge>
            <CardTitle
              class="text-3xl font-extrabold tracking-tight text-primary"
            >
              {{ data.offerTitle }}
            </CardTitle>
            <CardDescription class="text-lg text-muted-foreground pt-1">
              {{ data.offerDescription }}
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-3 pt-2">
            <div class="flex items-center text-sm">
              <span class="font-semibold text-secondary-foreground w-28"
                >Offered by</span
              >
              <span class="text-muted-foreground font-medium">{{
                data.offerProvider
              }}</span>
            </div>
            <div class="flex items-center text-sm">
              <span class="font-semibold text-secondary-foreground w-28"
                >Valid Till</span
              >
              <span class="text-muted-foreground font-medium">{{
                data.valid
              }}</span>
            </div>
          </CardContent>

          <CardFooter class="flex flex-col gap-3 pt-6">
            <Button class="w-full font-bold py-3 text-base tracking-wide">
              Redeem Offer
            </Button>
            <Card class="border-none bg-secondary/30 rounded-lg w-full">
              <CardContent
                class="p-3 text-center text-sm text-muted-foreground leading-snug"
              >
                You’ve already redeemed this offer. Use it again on
                <span class="font-semibold text-primary">August 1</span>.
              </CardContent>
            </Card>
          </CardFooter>
        </Card>

        <Card class="rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle class="text-xl"
              >More from {{ data.offerProvider }}</CardTitle
            >
          </CardHeader>
          <CardContent
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div
              v-for="(imgSrc, index) in data.extraImages"
              :key="index"
              class="w-full h-40 bg-secondary/20 rounded-lg overflow-hidden"
            >
              <NuxtImg
                :src="imgSrc"
                :alt="`Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="space-y-8">
        <Card class="rounded-2xl">
          <CardHeader>
            <CardTitle class="text-xl">Share & Follow</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col gap-4">
            <Button size="lg" class="w-full font-bold gap-2">
              <Share2 class="h-5 w-5" />
              Share this Offer
            </Button>
            <div class="flex gap-3 justify-center pt-2">
              <Button
                v-for="social in socialLinks"
                :key="social.label"
                variant="outline"
                size="icon"
              >
                <component :is="social.icon" class="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card class="rounded-2xl">
          <CardHeader>
            <CardTitle class="text-xl">Location</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-start gap-3">
              <MapPin class="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p class="text-muted-foreground">
                123 Market Street, New Delhi, India
              </p>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="h-5 w-5 text-primary flex-shrink-0" />
              <p class="text-muted-foreground">+91 98765 43210</p>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="h-5 w-5 text-primary flex-shrink-0" />
              <p class="text-muted-foreground">support@parasshoes.com</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" class="w-full">Get Directions</Button>
          </CardFooter>
        </Card>

        <Card class="rounded-2xl">
          <CardHeader>
            <CardTitle class="text-xl flex items-center gap-2">
              <Clock class="h-5 w-5" /> Opening Hours
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-2 text-sm">
            <div
              v-for="item in openingHours"
              :key="item.day"
              class="flex justify-between"
            >
              <p class="font-medium text-secondary-foreground">
                {{ item.day }}
              </p>
              <p
                :class="
                  item.time === 'Holiday'
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                "
              >
                {{ item.time }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
