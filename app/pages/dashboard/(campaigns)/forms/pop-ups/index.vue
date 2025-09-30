<script setup lang="ts">
import { Users, Calendar, ChevronRight } from "lucide-vue-next";

type Form = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  subscribers: number;
  preview: string;
};

const forms: Form[] = [
  {
    id: 1,
    title: "My Awesome Form",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, dolorum!",
    createdAt: "12 July 2025",
    subscribers: 24,
    preview:
      "https://files.jotform.com/jotformapps/lead-capture-form-dde416f59c804b9d693d09e0da962a7c-classic.png",
  },
  {
    id: 2,
    title: "Customer Feedback",
    description: "Collect feedback from your users quickly and easily.",
    createdAt: "05 August 2025",
    subscribers: 42,
    preview:
      "https://cdn.marketing123.123formbuilder.com/wp-content/uploads/2020/12/Lead-Capture-Form-4030148-1.jpg",
  },
  {
    id: 3,
    title: "Event Registration",
    description: "Manage your event signups efficiently with this form.",
    createdAt: "20 June 2025",
    subscribers: 18,
    preview:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgzk6KSI8ROLGzE_7zjUfi8G1VK21qpxOgA&s",
  },
];

definePageMeta({
  layout: "forms-overview",
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
</script>

<template>
  <div>
    <template v-if="false">
      <EmptyResource v-bind="emptyResource" />
    </template>

    <template v-if="true">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        <Card
          v-for="form in forms"
          :key="form.title"
          class="group cursor-pointer relative overflow-hidden"
        >
          <CardContent>
            <div class="w-full h-56">
              <NuxtImg
                :src="form.preview"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div class="mt-4">
              <h3 class="font-semibold text-lg">{{ form.title }}</h3>
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ form.description }}
              </p>

              <div
                class="flex justify-between items-center text-xs text-muted-foreground my-4"
              >
                <span class="flex items-center gap-1">
                  <Calendar class="w-3 h-3" />
                  {{ form.createdAt }}
                </span>
                <span class="flex items-center gap-1">
                  <Users class="w-3 h-3" />
                  {{ form.subscribers }} subscribers
                </span>
              </div>

              <NuxtLink class="block" :to="`/dashboard/forms/${form.id}`">
                <Button class="w-full">
                  <span>View Form</span>
                  <ChevronRight />
                </Button>
              </NuxtLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>
  </div>
</template>
