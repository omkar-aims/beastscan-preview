<script setup lang="ts">
definePageMeta({
  layout: "form-overview",
});

const sortOption = ref<"7d" | "30d" | "3m" | "6m" | "1y">("3m");

const formData = [
  { date: "2025-09-01", visitors: 500, subscribed: 120, converted: 45 },
  { date: "2025-09-02", visitors: 480, subscribed: 100, converted: 40 },
  { date: "2025-09-03", visitors: 600, subscribed: 150, converted: 55 },
  { date: "2025-09-04", visitors: 650, subscribed: 160, converted: 70 },
  { date: "2025-09-05", visitors: 700, subscribed: 180, converted: 80 },
  { date: "2025-09-06", visitors: 550, subscribed: 140, converted: 60 },
  { date: "2025-09-07", visitors: 800, subscribed: 200, converted: 95 },
];

const deviceData = [
  { device: "iOS", visitors: 1200 },
  { device: "Android", visitors: 900 },
  { device: "Web", visitors: 400 },
];

const timeOfDayData = [
  { hour: "00:00", visitors: 50 },
  { hour: "06:00", visitors: 200 },
  { hour: "12:00", visitors: 450 },
  { hour: "18:00", visitors: 400 },
  { hour: "21:00", visitors: 300 },
];

const locationData = [
  { location: "New York", visitors: 1000 },
  { location: "London", visitors: 750 },
  { location: "Mumbai", visitors: 650 },
  { location: "Tokyo", visitors: 500 },
  { location: "Berlin", visitors: 350 },
];
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <KpiCard
        label="Visitors"
        value="4,000"
        trend="15%"
        trend-direction="up"
      />
      <KpiCard
        label="Subscribers"
        value="1,200"
        trend="9%"
        trend-direction="up"
      />
      <KpiCard
        label="Lead Conversions"
        value="550"
        trend="4%"
        trend-direction="down"
      />
    </div>

    <Tabs default-value="overview">
      <AppRow gap="md">
        <div
          class="flex flex-col md:flex-row justify-between md:items-center gap-2"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="location">Locations</TabsTrigger>
          </TabsList>

          <AppRow direction="horizontal">
            <Select v-model="sortOption">
              <SelectTrigger class="w-38">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last 1 Year</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline">
                  <Icon name="lucide:file-down" />Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>EXCEL</DropdownMenuItem>
                <DropdownMenuItem>JSON</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </AppRow>
        </div>

        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>Form Trends</CardTitle></CardHeader>
            <CardContent>
              <AreaChart
                :data="formData"
                index="date"
                :categories="['visitors', 'subscribed', 'converted']"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader><CardTitle>Visitors by Device</CardTitle></CardHeader>
            <CardContent>
              <BarChart
                :data="deviceData"
                :show-legend="false"
                index="device"
                :categories="['visitors']"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader
              ><CardTitle>Visitors by Time of Day</CardTitle></CardHeader
            >
            <CardContent>
              <BarChart
                :data="timeOfDayData"
                :show-legend="false"
                index="hour"
                :categories="['visitors']"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader><CardTitle>Top Locations</CardTitle></CardHeader>
            <CardContent>
              <BarChart
                :data="locationData"
                :show-legend="false"
                index="location"
                :categories="['visitors']"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </AppRow>
    </Tabs>
  </div>
</template>
