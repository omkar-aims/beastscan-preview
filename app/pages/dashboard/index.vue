<script setup lang="ts">
useHead({
  title: "Dashboard",
});

const stats = [
  {
    title: "Campaigns",
    value: 14,
    diff: "+3 this week",
    icon: "lucide:megaphone",
    color: "text-green-600",
  },
  {
    title: "Devices",
    value: 21,
    diff: "5 active now",
    icon: "lucide:smartphone",
    color: "text-blue-500",
  },
  {
    title: "Leads",
    value: 312,
    diff: "+12 today",
    icon: "lucide:magnet",
    color: "text-indigo-600",
  },
  {
    title: "Conversion Rate",
    value: 24,
    diff: "Last 7 days",
    icon: "lucide:trending-up",
    color: "text-orange-500",
  },
  {
    title: "Loyalty Members",
    value: 89,
    diff: "+7 this week",
    icon: "lucide:gift",
    color: "text-yellow-500",
  },
  {
    title: "Plan",
    value: 200,
    diff: "Renewal: Jul 30",
    icon: "lucide:briefcase",
    color: "text-gray-700",
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex items-center gap-2">
          <Icon :name="stat.icon" class="w-5 h-5 text-primary" />
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">
            <AnimatedCounter :value="stat.value" />
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
