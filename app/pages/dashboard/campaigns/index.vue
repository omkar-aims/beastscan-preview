<script setup lang="ts">
useHead({
  title: "Campaigns",
});

const stats = [
  { title: "Total Campaigns", value: 124, icon: "lucide:bar-chart-2" },
  { title: "Total Scans", value: 18209, icon: "lucide:scan" },
  { title: "Lead Conversions", value: 4567, icon: "lucide:user-check" },
  { title: "Active Devices", value: 345, icon: "lucide:cpu" },
];

const campaigns = [
  { title: "Restaurant Promo", scans: "5,342", icon: "lucide:coffee" },
  { title: "Business Card", scans: "3,118", icon: "lucide:credit-card" },
  { title: "Event RSVP", scans: "2,765", icon: "lucide:calendar" },
];

const devices = [
  { title: "Key Hangers", scans: "139", icon: "lucide:key" },
  { title: "Wood Cubes", scans: "97", icon: "lucide:cuboid" },
  { title: "Stickers", scans: "184", icon: "lucide:sticky-note" },
];

const qrCodes = [
  {
    type: "Website",
    url: "https://www.hollo.dk",
    scans: 0,
    tags: ["Website"],
    date: "Jul 1, 2025",
    icon: "lucide:globe",
  },
  {
    type: "Dynamic Page",
    url: "Grottino77 QR Menu",
    scans: 124,
    tags: ["Dynamic", "Restaurant"],
    date: "Jun 15, 2025",
    icon: "lucide:file-text",
  },
  {
    type: "vCard",
    url: "Michae's Contact",
    scans: 44,
    tags: ["Static", "vCard"],
    date: "May 2, 2025",
    icon: "lucide:user",
  },
  {
    type: "Event",
    url: "Summer Festival Invite",
    scans: 322,
    tags: ["Event"],
    date: "May 28, 2025",
    icon: "lucide:ferris-wheel",
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3">
            <li
              v-for="item in campaigns"
              :key="item.title"
              class="flex justify-between items-center"
            >
              <div class="flex items-center gap-2">
                <Icon :name="item.icon" class="w-5 h-5 text-primary" />
                <span>{{ item.title }}</span>
              </div>
              <Badge variant="secondary">{{ item.scans }}</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3">
            <li
              v-for="item in devices"
              :key="item.title"
              class="flex justify-between items-center"
            >
              <div class="flex items-center gap-2">
                <Icon :name="item.icon" class="w-5 h-5 text-primary" />
                <span>{{ item.title }}</span>
              </div>
              <Badge>{{ item.scans }}</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Active QR Codes</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="qr in qrCodes"
            :key="qr.url"
            class="flex items-center justify-between border rounded-lg p-4"
          >
            <ColorModeImage
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              alt="QR Code"
              class="w-20 h-20 rounded-md object-cover mr-4"
            />

            <div class="flex-1">
              <div class="flex items-center gap-2">
                <Icon :name="qr.icon" class="w-5 h-5 text-primary" />
                <h3 class="font-medium">{{ qr.url }}</h3>
              </div>
              <p class="text-sm text-muted-foreground">{{ qr.date }}</p>
              <div class="flex gap-2 mt-2">
                <Badge v-for="tag in qr.tags" :key="tag">{{ tag }}</Badge>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-sm text-muted-foreground"
                >{{ qr.scans }} scans</span
              >
              <Button size="sm" variant="outline">Download</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
