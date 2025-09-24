<script setup lang="ts">
import { ref, computed } from "vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

useHead({
  title: "Lead Magnet Builder",
});

type FormType = "embedded" | "popup";
type Form = {
  id: number;
  type: FormType;
  title: string;
  segment: string;
  description: string;
  views: number;
  leads: number;
  conversion: string;
  createdAt: string;
};

const activeTab = ref<FormType>("embedded");

const forms = ref<Form[]>([
  {
    id: 1,
    type: "embedded",
    title: "Footer Newsletter",
    segment: "All Visitors",
    description: "Collects subscribers directly from the website footer.",
    views: 314,
    leads: 67,
    conversion: "21.3%",
    createdAt: "Jun 1, 2025",
  },
  {
    id: 2,
    type: "popup",
    title: "Exit Intent Coupon",
    segment: "Coupon Seekers",
    description: "Triggers a popup with a 10% discount before the user leaves.",
    views: 802,
    leads: 114,
    conversion: "14.2%",
    createdAt: "Jul 2, 2025",
  },
  {
    id: 3,
    type: "embedded",
    title: "Sidebar Form",
    segment: "Blog Readers",
    description: "Appears on blog sidebar to capture engaged users.",
    views: 126,
    leads: 34,
    conversion: "27%",
    createdAt: "Aug 21, 2025",
  },
]);

const embeddedForms = computed(() =>
  forms.value.filter((f) => f.type === "embedded")
);
const popupForms = computed(() =>
  forms.value.filter((f) => f.type === "popup")
);

const currentForms = computed(() =>
  activeTab.value === "embedded" ? embeddedForms.value : popupForms.value
);
</script>

<template>
  <div >
    <section class="w-full space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-primary">Lead Magnet Builder</h1>
        <NuxtLink to="/dashboard/leads/lead-magnet-builder/new-magnet">
          <Button>+ Create New Form</Button>
        </NuxtLink>
      </div>

      <!-- Tabs -->
      <div
        class="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
      >
        <Tabs v-model="activeTab" class="w-full max-w-md">
          <TabsList class="w-full">
            <TabsTrigger value="embedded" @click="activeTab = 'embedded'">
              Embedded Forms
            </TabsTrigger>
            <TabsTrigger value="popup" @click="activeTab = 'popup'">
              Popup Forms
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <!-- Content -->
      <Transition name="content-slide" mode="out-in">
  <div :key="activeTab" class="mt-4">
    <!-- Empty state -->
    <div
      v-if="currentForms.length === 0"
      class="rounded-lg border p-8 text-center text-muted-foreground"
    >
      No {{ activeTab === "embedded" ? "embedded" : "popup" }} forms yet.
    </div>

    <!-- Forms Grid -->
    <TransitionGroup
      name="card-fade"
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Card
        v-for="form in currentForms"
        :key="form.id"
        class="border shadow-sm"
      >
        <!-- Header -->
        <CardHeader class="flex flex-row justify-between items-start">
          <div>
            <div class="flex items-center gap-2">
              <CardTitle class="!text-base text-primary">
                {{ form.title }}
              </CardTitle>
              <Badge variant="default">
                {{ form.type === "embedded" ? "Embedded" : "Popup" }}
              </Badge>
            </div>
            <CardDescription class="text-muted-foreground">
              Segment: {{ form.segment }}
            </CardDescription>
          </div>

          <div class="text-sm text-muted-foreground text-right space-y-2">
            <p>Created: {{ form.createdAt }}</p>
            <div class="flex gap-2 justify-end">
              <Button variant="secondary" size="sm">Edit</Button>
            </div>
          </div>
        </CardHeader>

        <!-- Stats -->
        <CardContent class="space-y-4">
          <p>{{ form.description }}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent class="p-4 text-center">
                <p class="font-semibold text-primary">{{ form.views }}</p>
                <p class="text-sm text-muted-foreground">Views</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent class="p-4 text-center">
                <p class="font-semibold text-primary">{{ form.leads }}</p>
                <p class="text-sm text-muted-foreground">Leads</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent class="p-4 text-center">
                <p class="font-semibold text-primary">{{ form.conversion }}</p>
                <p class="text-sm text-muted-foreground">Conversion</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        <!-- Footer -->
        <CardFooter class="flex justify-between">
          <Button variant="outline" size="sm" class="text-primary">
            Preview
          </Button>
          <Button variant="outline" size="sm" class="text-primary">
            {{
              form.type === "embedded"
                ? "Copy Embed Code"
                : "Copy Embed Script"
            }}
          </Button>
        </CardFooter>
      </Card>
    </TransitionGroup>
  </div>
</Transition>

    </section>
  </div>
</template>

<style scoped>
/* animate the content container when switching tabs */
.content-slide-enter-active,
.content-slide-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}
.content-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.content-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* animate cards individually */
.card-fade-enter-active,
.card-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.995);
}
.card-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.995);
}

/* Prevent scrollbar flicker */
:global(html) {
  scrollbar-gutter: stable;
}
</style>
  