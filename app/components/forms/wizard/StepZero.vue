<script setup lang="ts">
import {
  Users,
  CalendarCheck2,
  Gift,
  BookOpen,
  Tag,
  MessageSquare,
  Clock,
  Briefcase,
} from "lucide-vue-next";

defineProps<{
  nextStep: () => void;
}>();

const formGoals = [
  {
    id: "capture_leads",
    title: "Capture Leads",
    description: "Collect emails and grow your subscriber or customer list.",
    icon: Users,
  },
  {
    id: "event_signup",
    title: "Event Sign-up",
    description:
      "Get attendees registered for your events, webinars or workshops.",
    icon: CalendarCheck2,
  },
  {
    id: "giveaway",
    title: "Giveaway",
    description: "Run contests and sweepstakes to boost engagement and reach.",
    icon: Gift,
  },
  {
    id: "resource_sharing",
    title: "Resource Sharing",
    description:
      "Offer e-books, guides or downloads in exchange for contact details.",
    icon: BookOpen,
  },
  {
    id: "offers_discounts",
    title: "Offers & Discounts",
    description:
      "Promote sales, coupons, or limited-time deals to drive conversions.",
    icon: Tag,
  },
  {
    id: "feedback_survey",
    title: "Feedback & Surveys",
    description:
      "Collect feedback, opinions, and ratings to improve your services.",
    icon: MessageSquare,
  },
  {
    id: "appointment_booking",
    title: "Appointment Booking",
    description:
      "Allow customers to book consultations, demos, or appointments.",
    icon: Clock,
  },
  {
    id: "job_application",
    title: "Job Applications",
    description:
      "Create forms to accept and organize applicant details with ease.",
    icon: Briefcase,
  },
];

const newFormStore = useNewFormStore();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card
      v-for="goal in formGoals"
      :key="goal.id"
      :class="['cursor-pointer transition-all duration-200 group']"
      @click="
        () => {
          newFormStore.form.goal = goal.id;
          nextStep();
        }
      "
    >
      <CardContent
        class="flex flex-col items-center text-center space-y-4 py-8 relative"
      >
        <component
          :is="goal.icon"
          class="w-12 h-12 text-primary group-hover:scale-110 transition-all duration-200"
        />

        <h2 class="text-lg font-semibold">{{ goal.title }}</h2>
        <p class="text-gray-500 text-sm">{{ goal.description }}</p>
      </CardContent>
    </Card>
  </div>
</template>
