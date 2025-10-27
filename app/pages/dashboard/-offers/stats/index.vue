<script setup lang="ts">
import { FilePenLine, CirclePause, CirclePlay } from "lucide-vue-next";

const offerStatus = ref<"active" | "paused">("active");

function toggleOffer() {
  offerStatus.value = offerStatus.value === "active" ? "paused" : "active";
}

interface Stat {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down";
}

const topStats: Stat[] = [
  {
    label: "Total Redemptions",
    value: 1200,
    trend: "+5%",
    trendDirection: "up",
  },
  { label: "Active Users", value: 350, trend: "-2%", trendDirection: "down" },
  { label: "CTR", value: "18%", trend: "+1%", trendDirection: "up" },
];

const data = [
  { name: "Jan", total: 200 },
  { name: "Feb", total: 300 },
  { name: "Mar", total: 250 },
  { name: "Apr", total: 400 },
];
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold tracking-tight text-foreground">
        Offer Overview
      </h2>
      <div class="flex items-center gap-3">
        <Button variant="outline" class="flex items-center gap-2">
          <FilePenLine class="w-4 h-4" />
          Edit Offer
        </Button>

        <Button
          :variant="offerStatus === 'active' ? 'destructive' : 'default'"
          class="flex items-center gap-2"
          @click="toggleOffer"
        >
          <component
            :is="offerStatus === 'active' ? CirclePause : CirclePlay"
            class="w-4 h-4"
          />
          {{ offerStatus === "active" ? "Pause Offer" : "Activate Offer" }}
        </Button>
      </div>
    </div>

    <!-- Offer Stats -->
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          v-for="stat in topStats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :trend="stat.trend"
          :trend-direction="stat.trendDirection"
        />
      </div>
    </div>

    <!-- Chart Section -->
    <Card class="border rounded-2xl shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base font-semibold text-foreground">
          Redemption Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart :data="data" index="name" :categories="['total']" />
      </CardContent>
    </Card>
  </div>
</template>
