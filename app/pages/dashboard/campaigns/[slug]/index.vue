<script setup lang="ts">
import { CirclePause, ExternalLink, Pencil } from "lucide-vue-next";

const topStats = [
  {
    label: "Unique Views",
    value: 1200,
    trend: "+5%",
    trendDirection: "up",
  },
  { label: "Views", value: 3500, trend: "-2%", trendDirection: "down" },
  {
    label: "Conversions Rate",
    value: "18%",
    trend: "+1%",
    trendDirection: "up",
  },
];

const campaignAnalytics = {
  campaign_id: "cmp_001",
  campaign_name: "Holiday Giveaway 2025",

  // prettier-ignore
  engagement: [
    { time: "14:00", "Views": 2200, "Conversions": 1200 },
    { time: "15:00", "Views": 4600, "Conversions": 1400 },
    { time: "16:00", "Views": 6400, "Conversions": 1600 },
    { time: "17:00", "Views": 5200, "Conversions": 1500 },
    { time: "18:00", "Views": 7000, "Conversions": 1700 },
    { time: "19:00", "Views": 6000, "Conversions": 1500 },
    { time: "20:00", "Views": 4000, "Conversions": 1300 },
  ],

  traffic_sources: {
    platform: [
      { name: "Instagram", value: 44 },
      { name: "Facebook", value: 22 },
      { name: "Direct", value: 18 },
      { name: "Search", value: 12 },
      { name: "Twitter", value: 3 },
      { name: "Other", value: 1 },
    ],
    os: [
      { name: "Android", value: 48 },
      { name: "iOS", value: 32 },
      { name: "Windows", value: 12 },
      { name: "macOS", value: 6 },
      { name: "Linux", value: 2 },
    ],
    device: [
      { name: "Mobile", value: 68 },
      { name: "Desktop", value: 24 },
      { name: "Tablet", value: 8 },
    ],
  },

  by_country: [
    { country: "United States", code: "US", percentage: 40.3 },
    { country: "United Kingdom", code: "GB", percentage: 16.8 },
    { country: "France", code: "FR", percentage: 12.6 },
    { country: "Singapore", code: "SG", percentage: 9.0 },
    { country: "Spain", code: "ES", percentage: 7.2 },
    { country: "Australia", code: "AU", percentage: 5.6 },
    { country: "Other", code: "OTH", percentage: 8.5 },
  ],
};

const countries = [
  {
    name: "United States",
    code: "US",
    percent: 42,
  },
  {
    name: "India",
    code: "IN",
    percent: 35,
  },
  {
    name: "United Kingdom",
    code: "GB",
    percent: 18,
  },
  {
    name: "Germany",
    code: "DE",
    percent: 12,
  },
];
const geoFilter = ref("country");

const data = [
  {
    name: "Jan",
    total: 100,
    predicted: 30,
  },
  {
    name: "Feb",
    total: 100,
    predicted: 50,
  },
  {
    name: "Mar",
    total: 100,
    predicted: 20,
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <AppHeading :level="3">My Awesome Campaign</AppHeading>
        <p class="text-sm text-muted-foreground flex items-center gap-2">
          <a
            :href="`https://beastscan.io/test`"
            target="_blank"
            class="text-primary font-medium hover:underline flex items-center gap-1"
          >
            beastscan.io/test
            <ExternalLink class="w-3.5 h-3.5 opacity-70" />
          </a>
        </p>
        <AppRow direction="horizontal" class="mt-2">
          <Badge>Tag 1</Badge>
          <Badge>Tag 2</Badge>
        </AppRow>
      </div>
      <AppRow direction="horizontal" class="mt-2">
        <Button variant="destructive">
          <CirclePause />
          <span>Suspend</span>
        </Button>
        <Button>
          <Pencil class="w-4 h-4" />
          <span>Edit</span>
        </Button>
      </AppRow>
    </div>

    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          v-for="stat in topStats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :trend="stat.trend"
          :trend-direction="'up'"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card class="p-4">
        <LineChart
          title="Engagements"
          class="my-4"
          :data="campaignAnalytics.engagement"
          index="time"
          :categories="['Views', 'Conversions']"
        />
      </Card>
      <Card class="p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">Traffic Sources</h2>

          <Select default-value="device">
            <SelectTrigger class="w-[120px]">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="device"> Device </SelectItem>
              <SelectItem value="os"> OS </SelectItem>
              <SelectItem value="platform"> Platform </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DonutChart
          index="name"
          :category="'predicted'"
          :data="data"
          :type="'pie'"
        />
      </Card>
    </div>
    <Tabs v-model="geoFilter" class="w-full">
      <Card class="p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">Geo Performance</h2>

          <Select v-model="geoFilter">
            <SelectTrigger class="w-xs">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country"> Country </SelectItem>
              <SelectItem value="region"> Region </SelectItem>
              <SelectItem value="city"> City </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HeatMapChart />

          <div class="flex flex-col">
            <TabsContent value="country">
              <ul class="divide-y divide-border/40">
                <li
                  v-for="(country, index) in countries"
                  :key="country.name"
                  class="flex items-center justify-between py-3 hover:bg-muted/40 rounded-lg transition-colors duration-200 px-3"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-sm font-semibold text-muted-foreground w-5 text-center"
                    >
                      {{ index + 1 }}
                    </span>

                    <NuxtImg
                      :src="`https://flagsapi.com/${country.code}/flat/64.png`"
                      :alt="country.name"
                      class="w-8 h-8 rounded-full ring-1 ring-border/30"
                    />

                    <p class="font-medium leading-tight text-sm">
                      {{ country.name }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <span
                      class="text-xs text-muted-foreground font-medium w-6 text-right"
                    >
                      {{ country.percent }}%
                    </span>
                    <Progress
                      :model-value="country.percent"
                      class="h-2 w-28 rounded-full bg-muted"
                    />
                  </div>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="region">
              <p class="text-sm text-muted-foreground text-center py-6">
                📍 Regional analytics coming soon.
              </p>
            </TabsContent>

            <TabsContent value="city">
              <p class="text-sm text-muted-foreground text-center py-6">
                🏙️ City-level data not available yet.
              </p>
            </TabsContent>
          </div>
        </div>
      </Card>
    </Tabs>
  </div>
</template>
