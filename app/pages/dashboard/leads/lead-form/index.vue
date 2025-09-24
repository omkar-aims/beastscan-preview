<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---- fixed colors for tags (exact like your screenshots) ----
const tagColors: Record<string, string> = {
  "Signup Form": "bg-gray-600 text-white",
  Embedded: "bg-cyan-400 text-black",
  Popup: "bg-yellow-400 text-black",
  Quiz: "bg-green-600 text-white",
  Interactive: "bg-cyan-400 text-black",
};

// ---- type for form data ----
interface FormData {
  title: string;
  segment: string;
  type: string;
  createdAt: string;
  description: string;
  tags: string[];
  stats: {
    views: number;
    signups: number;
    conversion: string;
  };
}

// ---- example data objects ----
const formDataList: FormData[] = [
  {
    title: "Website Footer Form",
    segment: "All Leads",
    type: "signup",
    createdAt: "May 20, 2025",
    description: "Collects subscribers from the main site footer.",
    tags: ["Signup Form", "Embedded"],
    stats: {
      views: 312,
      signups: 79,
      conversion: "25.3%",
    },
  },
  {
    title: "Popup Form",
    type: "signup",
    segment: "New Customers",
    createdAt: "May 25, 2025",
    description: "Collects subscribers from popup.",
    tags: ["Signup Form", "Popup"],
    stats: {
      views: 420,
      signups: 100,
      conversion: "23.8%",
    },
  },
  {
    title: "Quiz Form",
    type: "quiz",
    segment: "Engaged Users",
    createdAt: "June 1, 2025",
    description: "Interactive quiz form.",
    tags: ["Quiz", "Interactive"],
    stats: {
      views: 210,
      signups: 60,
      conversion: "28.5%",
    },
  },
];

const totalForms = formDataList.length;

const totalSignup = formDataList.filter((f) => f.type === "signup").length;
const totalSurvey = formDataList.filter((f) => f.type === "survey").length;
const totalQuiz = formDataList.filter((f) => f.type === "quiz").length;
</script>

<template>
  <div>
    <div class="flex flex-col p-6">
      <div class="w-full shadow-md rounded-xl">
        <h1 class="text-2xl font-bold">Lead Megnet Overview</h1>
      </div>
      <div class="w-ful shadow-md rounded-xl">
        <div class="flex gap-4 mt-4">
          <p>
            <span>Total Forms: {{ totalForms }}</span>
          </p>
        </div>
        <div class="flex gap-4">
          <p>
            <span>Surveys: {{ totalSurvey }}</span>
          </p>
          <p>
            <span>Signup Forms: {{ totalSignup }}</span>
          </p>
          <p>
            <span>Quizzes: {{ totalQuiz }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 items-center p-6">
      <Card
        v-for="form in formDataList"
        :key="form.title"
        class="w-full shadow-md rounded-xl"
      >
        <!-- Header -->
        <CardHeader class="flex flex-col gap-2">
          <CardTitle
            class="text-lg font-semibold w-full flex justify-between items-center"
          >
            <span class="flex flex-col">
              <span>
                {{ form.title }}
              </span>
              <span class="text-sm text-gray-500 font-normal">
                Segment: {{ form.segment }}
              </span>
            </span>
            <span>
              <Button variant="outline">Edit</Button>
            </span>
          </CardTitle>

          <!-- Tags -->
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="px-3 py-1 rounded-md text-sm font-semibold"
              :class="tagColors[tag]"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Created Date -->
          <p class="text-sm text-gray-500">Created: {{ form.createdAt }}</p>
        </CardHeader>

        <!-- Content -->
        <CardContent class="space-y-4">
          <p class="text-sm">{{ form.description }}</p>

          <!-- Stats -->
          <div class="text-center px-5 flex flex-row justify-between">
            <div>
              <p class="text-lg font-semibold">{{ form.stats.views }}</p>
              <p class="text-xs text-gray-500">Views</p>
            </div>
            <div>
              <p class="text-lg font-semibold">{{ form.stats.signups }}</p>
              <p class="text-xs text-gray-500">Signups</p>
            </div>
            <div>
              <p class="text-lg font-semibold">{{ form.stats.conversion }}</p>
              <p class="text-xs text-gray-500">Conversion</p>
            </div>
          </div>
        </CardContent>

        <!-- Footer -->
        <CardFooter class="flex justify-between">
          <NuxtLink to="/dashboard/leads/lead-form/stats">
         <Button variant="outline">View Stats</Button>
        </NuxtLink>
          
          <Button>Preview</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
