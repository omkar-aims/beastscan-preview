<script setup lang="ts">
useHead({
  title: "Lead Tools",
});

const stats = [
  { 
    title: "Total Leads", 
    value: 124, 
    icon: "lucide:bar-chart-2", 
    button: "View All Leads", 
    link: "/dashboard/lead-tools/all-leads" 
  },
  { 
    title: "Total Segments", 
    value: 5, 
    icon: "lucide:scan", 
    button: "View All Segments", 
    link: "/dashboard/lead-tools/segments" 
  },
  { 
    title: "Total Forms", 
    value: 3, 
    icon: "lucide:user-check", 
    button: "View Total Form", 
    link: "/dashboard/lead-tools/lead-form" 
  },
  { 
    title: "Total Lead Magnets", 
    value: 4, 
    icon: "lucide:file-text", 
    button: "Create Lead Magnet", 
    link: "/dashboard/lead-tools/lead-magnet-builder" 
  },
  { 
    title: "Total Winner Picks", 
    value: 2, 
    icon: "lucide:gift", 
    button: "Use Winner Picker", 
    link: "/dashboard/lead-tools/winner-picker" 
  },
];
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-6 mb-4">
      <p class="text-3xl font-bold">Lead Tools</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="stat in stats" :key="stat.title" class="flex justify-center">
        <CardHeader class="flex items-center gap-2">
          <Icon :name="stat.icon" class="w-5 h-5 text-primary" />
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
        </CardHeader>

        <CardContent>
          <p class="text-2xl font-bold">
            <AnimatedCounter :value="stat.value" />
          </p>

          <div class="w-full flex justify-center">
            <!-- ✅ Use NuxtLink -->
            <NuxtLink :to="stat.link">
              <Button class="w-fit mt-4 cursor-pointer border-2 rounded-lg px-4 py-2 hover:border-2 hover:border-blue-500">
                {{ stat.button }}
              </Button>
            </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
