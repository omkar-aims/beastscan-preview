<script setup lang="ts">
import {
  Megaphone,
  Zap,
  Sparkles,
  QrCode,
  FileText,
  ArrowRight,
} from "lucide-vue-next";

useHead({ title: "Dashboard" });

const stats = [
  {
    title: "Active Campaigns",
    value: 14,
    icon: Megaphone,
    gradient: "bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-600",
  },
  {
    title: "Active Forms",
    value: 8,
    icon: FileText,
    gradient: "bg-gradient-to-tr from-violet-400 via-indigo-500 to-purple-600",
  },
  {
    title: "Active QR Codes",
    value: 27,
    icon: QrCode,
    gradient: "bg-gradient-to-tr from-amber-300 via-orange-400 to-amber-500",
  },
  {
    title: "Active Devices",
    value: 21,
    icon: Zap,
    gradient: "bg-gradient-to-tr from-sky-400 via-blue-500 to-cyan-600",
  },
];

const activities = [
  {
    icon: Megaphone,
    title: "New Campaign Published",
    description: "“Summer Blast 2025” is now live.",
    time: "2 hours ago",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    icon: FileText,
    title: "Form Responses Received",
    description: "12 new entries in “Feedback Form”.",
    time: "5 hours ago",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: QrCode,
    title: "QR Code Scanned",
    description: "Customer scanned 'Event Promo QR'.",
    time: "1 day ago",
    color: "text-amber-600 bg-amber-100",
  },
  {
    icon: Zap,
    title: "New Device Linked",
    description: "Connected to 'Ad Kiosk #3'.",
    time: "2 days ago",
    color: "text-sky-600 bg-sky-100",
  },
];

const nextSteps = [
  {
    title: "Create New Campaign",
    description: "Start by launching a campaign to engage your audience.",
    icon: Megaphone,
    color: "text-emerald-600 bg-emerald-100",
    action: "Create Campaign",
    href: "/dashboard/campaigns/new",
  },
  {
    title: "Design a Form",
    description: "Collect leads or feedback with a custom form.",
    icon: FileText,
    color: "text-purple-600 bg-purple-100",
    action: "Create Form",
    href: "/dashboard/forms/new",
  },
  {
    title: "Generate QR Code",
    description: "Share your campaign or form via a scannable QR.",
    icon: QrCode,
    color: "text-amber-600 bg-amber-100",
    action: "Generate QR",
    href: "/dashboard/qr/new",
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <AppHeading :level="3">Dashboard</AppHeading>
        <p class="text-muted-foreground">
          Welcome back! Here's what's happening across your campaigns.
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="default" class="flex items-center gap-2">
            <Sparkles class="w-4 h-4" />Launch New
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="w-48">
          <DropdownMenuItem
            class="flex items-center gap-2 cursor-pointer group"
            @click="navigateTo('/dashboard/campaigns/new')"
          >
            <Megaphone class="w-4 h-4 group-hover:text-primary-foreground" />
            <span>Campaign</span>
          </DropdownMenuItem>

          <DropdownMenuItem class="flex items-center gap-2 cursor-pointer">
            <FileText class="w-4 h-4 group-hover:text-primary-foreground" />
            <span>Form</span>
          </DropdownMenuItem>

          <DropdownMenuItem class="flex items-center gap-2 cursor-pointer">
            <QrCode class="w-4 h-4 group-hover:text-primary-foreground" />
            <span>QR Code</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="stat in stats"
        :key="stat.title"
        href="/dashboard/campaigns"
      >
        <Card>
          <CardContent class="flex items-center gap-4">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full"
              :class="stat.gradient"
            >
              <component :is="stat.icon" class="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 class="text-xl font-semibold text-foreground">
                <AnimatedCounter :value="stat.value" />
              </h3>
              <p class="text-muted-foreground text-sm">{{ stat.title }}</p>
            </div>
          </CardContent>
        </Card>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <AppHeading :level="4">Next Step</AppHeading>
          <Button variant="link" class=""> Skip goal </Button>
        </div>

        <div class="space-y-4">
          <Card
            v-for="(step, i) in nextSteps"
            :key="i"
            class="cursor-pointer"
            @click="navigateTo('/dashboard/campaigns/new')"
          >
            <CardContent class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 flex items-center justify-center rounded-full"
                  :class="step.color"
                >
                  <component :is="step.icon" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-medium text-foreground">{{ step.title }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <AppHeading :level="4">Recent Activities</AppHeading>
          <Button variant="link" class=""> View All <ArrowRight /> </Button>
        </div>

        <Card>
          <CardContent class="divide-y">
            <div
              v-for="(activity, index) in activities"
              :key="index"
              class="flex items-center gap-4 py-4"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                :class="activity.color"
              >
                <component :is="activity.icon" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <p class="text-foreground font-medium">
                  {{ activity.title }}
                </p>
                <p class="text-muted-foreground text-sm">
                  {{ activity.description }}
                </p>
              </div>
              <p class="text-xs text-muted-foreground whitespace-nowrap">
                {{ activity.time }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
