<script setup lang="ts">
import { Megaphone, Gift, ArrowRight, Zap, UserCheck2 } from "lucide-vue-next";

useHead({ title: "Dashboard" });

const stats = [
  {
    title: "Active Campaigns",
    value: 14,
    icon: Megaphone,
    gradient: "bg-gradient-to-tr from-green-400 to-green-600",
  },
  {
    title: "Active Devices",
    value: 21,
    icon: Zap,
    gradient: "bg-gradient-to-tr from-blue-400 to-blue-600",
  },
  {
    title: "Leads",
    value: 312,
    icon: UserCheck2,
    gradient: "bg-gradient-to-tr from-indigo-400 to-indigo-600",
  },
  {
    title: "Loyalty Members",
    value: 89,
    icon: Gift,
    gradient: "bg-gradient-to-tr from-yellow-400 to-yellow-500",
  },
];
</script>

<template>
  <div class="space-y-4">
    <div>
      <AppHeading :level="3">Dashboard</AppHeading>
      <p class="text-muted-foreground">
        Welcome back! Here's what's happening today.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="stat in stats"
        :key="stat.title"
        class="border border-border bg-card shadow-sm"
      >
        <CardContent class="flex items-center gap-4">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-xl"
            :class="stat.gradient"
          >
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>

          <div>
            <h3 class="text-xl font-semibold text-foreground">
              <AnimatedCounter :value="stat.value" />
            </h3>
            <p class="text-muted-foreground text-sm">{{ stat.title }}</p>
          </div>
        </CardContent>
        <CardFooter
          class="border-t border-border w-full"
          style="padding-top: 12px !important"
        >
          <NuxtLink
            href="/dashboard"
            class="flex justify-between items-center w-full"
          >
            <span class="text-sm">View Detail</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
