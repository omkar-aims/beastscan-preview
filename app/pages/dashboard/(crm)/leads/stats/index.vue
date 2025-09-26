<script setup lang="ts">
import { computed } from "vue";

useHead({
  title: "Stats",
});

definePageMeta({
  layout: "lead",
});

type Stat = { label: string; value: number | string };
type DeviceRow = {
  device: "Mobile" | "Desktop" | "Tablet";
  leads: number;
  percent: number;
};
type ReferrerRow = { referrer: string; leads: number };
type KVRow = { name: string; leads: number };
type RecentLead = {
  email: string;
  device: string;
  page: string;
  timestamp: string;
};


const topStats: Stat[] = [
  { label: "Total Views", value: 123 },
  { label: "Total Leads", value: 356 },
  { label: "Conversion Rate", value: "28.9%" },
  { label: "Last Lead", value: "2 hours ago" },
];

const devices: DeviceRow[] = [
  { device: "Mobile", leads: 219, percent: 61 },
  { device: "Desktop", leads: 98, percent: 28 },
  { device: "Tablet", leads: 39, percent: 11 },
];

const referrers: ReferrerRow[] = [
  { referrer: "/home", leads: 134 },
  { referrer: "/campaign/summer", leads: 78 },
  { referrer: "/blog/5-tips", leads: 56 },
  { referrer: "Other", leads: 88 },
];

const utmCampaigns: KVRow[] = [
  { name: "summer_sale", leads: 152 },
  { name: "launch_promo", leads: 88 },
  { name: "black_friday", leads: 62 },
];
const utmSources: KVRow[] = [
  { name: "facebook", leads: 198 },
  { name: "instagram", leads: 91 },
  { name: "newsletter", leads: 63 },
];
const utmMediums: KVRow[] = [
  { name: "cpc", leads: 120 },
  { name: "email", leads: 103 },
  { name: "social", leads: 82 },
];
const utmTerms: KVRow[] = [
  { name: "opt-in form", leads: 38 },
  { name: "qr campaign", leads: 22 },
];
const utmContent: KVRow[] = [
  { name: "blue_banner", leads: 42 },
  { name: "red_popup", leads: 31 },
];

const recentLeads: RecentLead[] = [
  {
    email: "jane@example.com",
    device: "Mobile",
    page: "/home",
    timestamp: "Today, 10:43",
  },
  {
    email: "mark@domain.com",
    device: "Desktop",
    page: "/campaign/summer",
    timestamp: "Today, 09:17",
  },
  {
    email: "sofia@webmail.com",
    device: "Tablet",
    page: "/blog/5-tips",
    timestamp: "Yesterday, 17:03",
  },
];

// convenience totals (static here; useful if you wire to real data later)
const totalLeads = computed(() => devices.reduce((sum, d) => sum + d.leads, 0));
</script>
<template>
  <div class="space-y-6">
    <!-- Title -->
    <div>
      <h1 class="text-2xl md:text-3xl font-semibold tracking-tight">
        Lead Magnet Stats
      </h1>
    </div>

    <!-- Top Stats -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
    >
      <Card
        v-for="s in topStats"
        :key="s.label"
        class="rounded-xl"
      >
        <CardHeader class="pb-2">
          <CardDescription class="text-base">
            {{ s.label }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-semibold tracking-tight">
            {{ s.value }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Middle: Devices + Referrers -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Device Type -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-xl">Device Type</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col md:flex-row gap-6">
          <div class="w-full md:w-1/2 flex justify-center">
            <DonutChart
              index="device"
              :category="'leads'"
              :data="devices"
              :type="'pie'"
            />
          </div>
          <div class="w-full md:w-1/2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-1/2">Device</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead class="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in devices" :key="row.device">
                  <TableCell class="font-medium">
                    {{ row.device }}
                  </TableCell>
                  <TableCell>{{ row.leads }}</TableCell>
                  <TableCell class="text-right">
                    {{ row.percent }}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-semibold">Total</TableCell>
                  <TableCell class="font-semibold">
                    {{ totalLeads }}
                  </TableCell>
                  <TableCell class="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <!-- Top Referrers -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-xl">Top Referrers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-3/4">Referrer</TableHead>
                <TableHead class="text-right">Leads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in referrers" :key="row.referrer">
                <TableCell class="font-medium">
                  {{ row.referrer }}
                </TableCell>
                <TableCell class="text-right">{{ row.leads }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    <!-- UTM Breakdown -->
    <Card>
      <CardHeader class="pb-2">
        <CardTitle class="text-xl">UTM Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs default-value="topCampaigns">
          <TabsList class="flex flex-wrap">
            <TabsTrigger value="topCampaigns">Top Campaigns</TabsTrigger>
            <TabsTrigger value="topSources">Top Sources</TabsTrigger>
            <TabsTrigger value="topMediums">Top Mediums</TabsTrigger>
            <TabsTrigger value="utmTerms">UTM Terms</TabsTrigger>
            <TabsTrigger value="utmContent">UTM Content</TabsTrigger>
          </TabsList>
          <TabsContent value="topCampaigns">
            <BarChart :data="utmCampaigns" index="name" :categories="['leads']" />
          </TabsContent>
          <TabsContent value="topSources">
            <BarChart :data="utmSources" index="name" :categories="['leads']" />
          </TabsContent>
          <TabsContent value="topMediums">
            <BarChart :data="utmMediums" index="name" :categories="['leads']" />
          </TabsContent>
          <TabsContent value="utmTerms">
            <BarChart :data="utmTerms" index="name" :categories="['leads']" />
          </TabsContent>
          <TabsContent value="utmContent">
            <BarChart :data="utmContent" index="name" :categories="['leads']" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>

    <!-- Recent Leads -->
    <Card>
      <CardHeader class="pb-2">
        <CardTitle class="text-xl">Recent Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea class="w-full">
          <Table class="min-w-[640px] md:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead class="w-2/5">Email</TableHead>
                <TableHead class="w-1/5">Device</TableHead>
                <TableHead class="w-1/5">Page</TableHead>
                <TableHead class="w-1/5">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="lead in recentLeads"
                :key="lead.email + lead.timestamp"
              >
                <TableCell class="font-medium break-all">
                  {{ lead.email }}
                </TableCell>
                <TableCell>{{ lead.device }}</TableCell>
                <TableCell class="break-all">{{ lead.page }}</TableCell>
                <TableCell>{{ lead.timestamp }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
</template>



