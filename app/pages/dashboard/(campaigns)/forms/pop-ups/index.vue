<script setup lang="ts">
import { Check, Users, Calendar, ChevronRight } from "lucide-vue-next";

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
    preview: "/preview.png",
  },
  {
    id: 2,
    title: "Customer Feedback",
    description: "Collect feedback from your users quickly and easily.",
    createdAt: "05 August 2025",
    subscribers: 42,
    preview: "/preview.png",
  },
  {
    id: 3,
    title: "Event Registration",
    description: "Manage your event signups efficiently with this form.",
    createdAt: "20 June 2025",
    subscribers: 18,
    preview: "/preview.png",
  },
  {
    id: 4,
    title: "Newsletter Signup",
    description: "Grow your mailing list with a simple signup form.",
    createdAt: "01 September 2025",
    subscribers: 56,
    preview: "/preview.png",
  },
  {
    id: 5,
    title: "Survey Form",
    description: "Get valuable insights from your audience through surveys.",
    createdAt: "15 July 2025",
    subscribers: 33,
    preview: "/preview.png",
  },
];

definePageMeta({
  layout: "forms-overview",
});
</script>

<template>
  <div>
    <template v-if="false">
      <Card>
        <CardContent>
          <div
            class="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-center"
          >
            <div class="flex justify-center md:justify-start">
              <NuxtImg
                src="/popup-form.svg"
                class="w-48 h-auto md:w-full"
                alt="Popup form illustration"
              />
            </div>

            <div class="space-y-4">
              <AppHeading :level="3">Launch Your First Pop-Up Form</AppHeading>

              <CardDescription
                class="text-muted-foreground text-base leading-relaxed"
              >
                Capture attention instantly with eye-catching forms that appear
                exactly when your visitors are most engaged.
              </CardDescription>

              <ul class="space-y-2 text-sm text-muted-foreground">
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Capture more subscribers</strong> with
                    attention-grabbing forms that engage visitors
                    instantly.</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Customize triggers</strong> — on page load, scroll,
                    or exit intent.</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Stay user-friendly</strong> with mobile-ready
                    layouts and consent options.</span
                  >
                </li>
              </ul>

              <NuxtLink to="/dashboard/forms/new">
                <Button class="mt-4 w-full md:w-auto">Create New</Button>
              </NuxtLink>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <template v-if="true">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="form in forms" :key="form.id" class="p-0 overflow-hidden">
          <div class="relative w-full h-40">
            <NuxtImg
              :src="form.preview"
              alt="Form preview"
              class="w-full h-full object-cover"
            />
          </div>

          <CardContent class="p-4 space-y-2">
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
          </CardContent>
        </Card>
      </div>
    </template>
  </div>
</template>
