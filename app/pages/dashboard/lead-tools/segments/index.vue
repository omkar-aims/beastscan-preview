<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NuxtLink } from "#components";

useHead({
  title: "Segments",
});

const segments = [
  {
    name: "Segment A",
    description: "description for segment A",
    leads: 150,
    senderName: "Sender 1",
    senderEmail: "sender1@gmail.com",
    lastuse: "July 1, 2025",
  },
  {
    name: "Segment B",
    description: "description for segment B",
    leads: 200,
    senderName: "Sender 2",
    senderEmail: "sender2@gmail.com",
    lastuse: "Aug 3, 2025",
  },
];

// common navigation links
const actions = [
  { label: "View", href: "/dashboard/lead-tools/segments/show-segment" },
  { label: "Edit", href: "/segments/edit" },
];
</script>

<template>
  <div>
    <div class="md:flex md:justify-between items-center">
      <div class="flex flex-col">
        <div>
          <h1 class="text-2xl font-semibold mb-4">Lead Segments</h1>
        </div>
        <div class="mb-2">
          <span>Total Segment: </span>{{ segments.length }}
        </div>
      </div>

      <!-- Buttons Section -->
      <div class="flex gap-3">
        <NuxtLink to="/dashboard/lead-tools/winner-picker">
          <Button class="cursor-pointer">Winner Picker Tool</Button>
        </NuxtLink>
        <NuxtLink to="/dashboard/lead-tools/segments/newsegment">
          <Button class="cursor-pointer">Create New Segment</Button>
        </NuxtLink>
      </div>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="segment in segments"
        :key="segment.name"
        class="flex flex-col"
      >
        <!-- Header -->
        <CardHeader>
          <CardTitle>{{ segment.name }}</CardTitle>
          <CardDescription>{{ segment.description }}</CardDescription>
        </CardHeader>

        <!-- Content -->
        <CardContent class="space-y-2 text-sm">
          <p><span class="font-medium">Leads:</span> {{ segment.leads }}</p>
          <p class="flex">
            <span class="font-medium items-center">Sender:</span>
            {{ segment.senderName }} {{ " " }}
            <CardDescription> ({{ segment.senderEmail }}) </CardDescription>
          </p>
          <p>
            <span class="font-medium">Last Used:</span> {{ segment.lastuse }}
          </p>
        </CardContent>

        <!-- Footer -->
        <CardFooter class="flex gap-2 mt-auto">
          <NuxtLink
            v-for="action in actions"
            :key="action.label"
            :to="action.href"
            class="flex-1"
          >
            <Button class="w-full" variant="outline">
              {{ action.label }}
            </Button>
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
