<script setup lang="ts">
import { computed } from "vue";

// shadcn/ui (Vue) components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// ---------- Static Data (mock) ----------
type Stat = { label: string; value: any };
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

const leadMagnetName = "Newsletter Popup - Home";

const topStats: Stat[] = [
  { label: "Total Views", value: 123 },
  { label: "Total Leads", value: 356 },
  { label: "Conversion Rate", value: '28.9%' },
  { label: "Last Lead", value: '2 hours ago' },
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
  <!-- Whole dashboard wrapped in a shadcn Card -->
  <Card class="w-full border-0 shadow-none">
    <CardHeader class="px-0 pb-4">
      <CardTitle class="text-2xl md:text-3xl">
        Lead Magnet Stats: "<span class="font-semibold">{{
          leadMagnetName
        }}</span
        >"
      </CardTitle>
    </CardHeader>

    <CardContent class="px-0">
      <!-- Top Stats -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
      >
        <Card v-for="s in topStats" :key="s.label" class="rounded-xl">
          <CardHeader class="pb-2">
            <CardDescription class="text-base">{{ s.label }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-semibold tracking-tight">
              {{ s.value }}
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Middle: Devices + Referrers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
        <!-- Device Type -->
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-xl">Device Type</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <TableCell class="font-medium">{{ row.device }}</TableCell>
                  <TableCell>{{ row.leads }}</TableCell>
                  <TableCell class="text-right">{{ row.percent }}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell class="font-semibold">Total</TableCell>
                  <TableCell class="font-semibold">{{ totalLeads }}</TableCell>
                  <TableCell class="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                  <TableCell class="font-medium">{{ row.referrer }}</TableCell>
                  <TableCell class="text-right">{{ row.leads }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- UTM Breakdown -->
      <Card class="mt-6">
        <CardHeader class="pb-2">
          <CardTitle class="text-xl">UTM Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Top Campaigns -->
            <div>
              <div class="font-medium mb-2">Top Campaigns</div>
              <Table>
                <TableBody>
                  <TableRow v-for="c in utmCampaigns" :key="c.name">
                    <TableCell class="w-2/3">{{ c.name }}</TableCell>
                    <TableCell class="text-right"
                      >{{ c.leads }} leads</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <!-- Top Sources -->
            <div>
              <div class="font-medium mb-2">Top Sources</div>
              <Table>
                <TableBody>
                  <TableRow v-for="s in utmSources" :key="s.name">
                    <TableCell class="w-2/3">{{ s.name }}</TableCell>
                    <TableCell class="text-right"
                      >{{ s.leads }} leads</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <!-- Top Mediums -->
            <div>
              <div class="font-medium mb-2">Top Mediums</div>
              <Table>
                <TableBody>
                  <TableRow v-for="m in utmMediums" :key="m.name">
                    <TableCell class="w-2/3">{{ m.name }}</TableCell>
                    <TableCell class="text-right"
                      >{{ m.leads }} leads</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator class="my-4" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- UTM Terms -->
            <div>
              <div class="font-medium mb-2">UTM Terms (Keywords)</div>
              <Table>
                <TableBody>
                  <TableRow v-for="t in utmTerms" :key="t.name">
                    <TableCell class="w-2/3">{{ t.name }}</TableCell>
                    <TableCell class="text-right"
                      >{{ t.leads }} leads</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <!-- UTM Content -->
            <div>
              <div class="font-medium mb-2">UTM Content (A/B)</div>
              <Table>
                <TableBody>
                  <TableRow v-for="c in utmContent" :key="c.name">
                    <TableCell class="w-2/3">{{ c.name }}</TableCell>
                    <TableCell class="text-right"
                      >{{ c.leads }} leads</TableCell
                    >
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Leads -->
      <Card class="mt-6">
        <CardHeader class="pb-2">
          <CardTitle class="text-xl">Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <!-- Scroll on small screens to keep layout tidy -->
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
                  <TableCell class="font-medium break-all">{{
                    lead.email
                  }}</TableCell>
                  <TableCell>{{ lead.device }}</TableCell>
                  <TableCell class="break-all">{{ lead.page }}</TableCell>
                  <TableCell>{{ lead.timestamp }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
</template>

<style scoped>
/* Optional: tighter card radii/spacing to match the screenshots closely */
</style>
