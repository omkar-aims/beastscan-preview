<script setup lang="ts">
const sortOption = ref<"7d" | "30d" | "3m" | "6m" | "1y">("3m");

const scanData = [
  { date: "2025-09-01", scans: 120, newScans: 45 },
  { date: "2025-09-02", scans: 98, newScans: 30 },
  { date: "2025-09-03", scans: 135, newScans: 50 },
  { date: "2025-09-04", scans: 160, newScans: 70 },
  { date: "2025-09-05", scans: 180, newScans: 80 },
  { date: "2025-09-06", scans: 140, newScans: 55 },
  { date: "2025-09-07", scans: 200, newScans: 95 },
];

const deviceData = [
  { device: "iOS", scans: 1200 },
  { device: "Android", scans: 900 },
  { device: "Web", scans: 400 },
];

const timeOfDayData = [
  { hour: "00:00", scans: 20 },
  { hour: "06:00", scans: 150 },
  { hour: "12:00", scans: 300 },
  { hour: "18:00", scans: 250 },
  { hour: "21:00", scans: 180 },
];

const locationData = [
  { location: "New York", scans: 800 },
  { location: "London", scans: 650 },
  { location: "Mumbai", scans: 500 },
  { location: "Tokyo", scans: 400 },
  { location: "Berlin", scans: 300 },
];

definePageMeta({
  layout: "qr-code-overview",
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <KpiCard
        label="Total Scans"
        value="3,000"
        trend="12%"
        trend-direction="up"
      />
      <KpiCard
        label="Unique Scanners"
        value="1,000"
        trend="7%"
        trend-direction="up"
      />
      <KpiCard
        label="Lead Conversions"
        value="500"
        trend="3%"
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
            <CardHeader><CardTitle>Scan Trends</CardTitle></CardHeader>
            <CardContent>
              <AreaChart
                :data="scanData"
                index="date"
                :categories="['scans', 'newScans']"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader><CardTitle>Scans by Device</CardTitle></CardHeader>
            <CardContent>
              <BarChart
                :data="deviceData"
                :show-legend="false"
                index="device"
                :categories="['scans']"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader><CardTitle>Scans by Time of Day</CardTitle></CardHeader>
            <CardContent>
              <BarChart
                :data="timeOfDayData"
                :show-legend="false"
                index="hour"
                :categories="['scans']"
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
                :categories="['scans']"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </AppRow>
    </Tabs>
  </div>
</template>
