<script setup lang="ts">
import {
  FileText,
  Calendar,
  FilePlus,
  MessageCircle,
  ClipboardCheck,
  Edit3,
  Clock,
  Briefcase,
  ArrowRight,
} from "lucide-vue-next";

const formTypes = [
  {
    title: "Lead Capture",
    description:
      "Collect leads with custom fields and integrate directly with your CRM.",
    icon: FileText,
    users: "4.2k",
    gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  },
  {
    title: "Event Signup",
    description:
      "Let attendees register for your events quickly and easily online.",
    icon: Calendar,
    users: "3.8k",
    gradient: "linear-gradient(to top right, #38bdf8, #6366f1)",
  },
  {
    title: "Resource Sharing",
    description:
      "Provide downloads or resources after form submission automatically.",
    icon: FilePlus,
    users: "2.5k",
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
  },
  {
    title: "Feedback",
    description:
      "Collect feedback from customers, employees, or partners efficiently.",
    icon: MessageCircle,
    users: "3.1k",
    gradient: "linear-gradient(135deg, #f97316, #facc15)",
  },
  {
    title: "Survey",
    description:
      "Run surveys with multiple question types and analyze responses easily.",
    icon: ClipboardCheck,
    users: "2.9k",
    gradient: "linear-gradient(to top right, #f43f5e, #ec4899)",
  },
  {
    title: "Quiz",
    description:
      "Engage your audience with interactive quizzes and instant results.",
    icon: Edit3,
    users: "1.8k",
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
  },
  {
    title: "Appointment",
    description:
      "Allow users to book appointments and manage schedules seamlessly.",
    icon: Clock,
    users: "2.0k",
    gradient: "linear-gradient(to top right, #8b5cf6, #a21caf)",
  },
  {
    title: "Job Application",
    description:
      "Accept applications online with custom fields and resume uploads.",
    icon: Briefcase,
    users: "1.5k",
    gradient: "linear-gradient(to top right, #fb923c, #ef4444)",
  },
];
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card v-for="form in formTypes" :key="form.title">
      <CardContent>
        <div class="flex items-center gap-3 mb-2">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full"
            :style="{ background: form.gradient }"
          >
            <component :is="form.icon" class="w-4 h-4 text-white" />
          </div>

          <h3 class="font-semibold">{{ form.title }}</h3>
        </div>
        <p class="text-sm text-muted-foreground">{{ form.description }}</p>
      </CardContent>

      <CardFooter class="justify-between mt-4">
        <div class="text-xs text-muted-foreground">
          Used by
          <span class="font-medium text-foreground">{{ form.users }}</span>
          people
        </div>

        <CardAction>
          <Button class="rounded-full gap-1">
            <span>Create</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  </div>
</template>
