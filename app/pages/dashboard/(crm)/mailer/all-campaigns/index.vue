<script setup lang="ts">
type CampaignAction = "view" | "duplicate" | "edit" | "delete";

interface Campaign {
  id: number;
  name: string;
  audience: string;
  status: "draft" | "scheduled" | "sent";
  sent: number;
  openRate: string;
  clickRate: string;
  created: string;
  actions: CampaignAction[];
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Newsletter Campaign",
    audience: "All Subscribers",
    status: "sent",
    sent: 5000,
    openRate: "48.5%",
    clickRate: "12.7%",
    created: "2025-09-01T10:30:00Z",
    actions: ["view", "duplicate", "edit", "delete"],
  },
  {
    id: 2,
    name: "Promo Offer",
    audience: "College Student",
    status: "scheduled",
    sent: 0,
    openRate: "0",
    clickRate: "0",
    created: "2025-09-07T08:15:00Z",
    actions: ["view", "duplicate", "edit", "delete"],
  },
  {
    id: 3,
    name: "Campaign 3",
    audience: "High Student",
    status: "scheduled",
    sent: 0,
    openRate: "0",
    clickRate: "0",
    created: "2025-09-07T08:15:00Z",
    actions: ["view", "duplicate", "edit", "delete"],
  },
  {
    id: 4,
    name: "Campaign for aimrs",
    audience: "College Student",
    status: "scheduled",
    sent: 1200,
    openRate: "50%",
    clickRate: "10%",
    created: "2025-09-07T08:15:00Z",
    actions: ["view", "duplicate", "edit", "delete"],
  },
];
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="w-full flex flex-raw justify-between">
      <div class="flex flex-col gap-2">
        <p class="text-3xl font-semibold text-primary">Newsletter Campaigns</p>
        <p class="flex flex-wrap w-3/4">
          Create and manage your newsletter campaigns. Stay connected with your
          leads and contacts by sending curated updates, promotions, or news.
        </p>
      </div>
      <div>
        <Button> Create New Campaign </Button>
      </div>
    </div>
    <div
      class="grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6"
    >
      <Card
        v-for="data in campaigns"
        :key="data.id"
        class="flex flex-col gap-4 p-4"
      >
        <CardHeader>
          <CardTitle class="text-lg font-semibold">
            <span>Campaign Name: </span>
            <span>{{ data.name }}</span>
          </CardTitle>
          <CardDescription>
            <span>Audience: </span>
            <span>{{ data.audience }}</span>
          </CardDescription>
        </CardHeader>

        <CardContent class="flex flex-col gap-4">
          <!-- Status -->
          <div class="w-full text-right">
            <span>Status: </span>
            <span>
              <Badge>{{ data.status }}</Badge>
            </span>
          </div>

          <!-- Metrics Row -->
          <div class="w-full flex justify-between gap-3">
            <Card
              class="flex-1 flex items-center justify-center p-3 text-center"
            >
              <CardDescription class="flex flex-col items-center gap-1">
                <span>Sent</span>
                <span class="bg-secondary px-2 py-1 rounded-md">
                  {{ data.sent }}
                </span>
              </CardDescription>
            </Card>
            <Card
              class="flex-1 flex items-center justify-center p-3 text-center"
            >
              <CardDescription class="flex flex-col items-center gap-1">
                <span>Open Rate</span>
                <span class="bg-secondary px-2 py-1 rounded-md">
                  {{ data.openRate }}
                </span>
              </CardDescription>
            </Card>
            <Card
              class="flex-1 flex items-center justify-center p-3 text-center"
            >
              <CardDescription class="flex flex-col items-center gap-1">
                <span>Click Rate</span>
                <span class="bg-secondary px-2 py-1 rounded-md">
                  {{ data.clickRate }}
                </span>
              </CardDescription>
            </Card>
          </div>

          <!-- Created At -->
          <div class="my-2 text-center">
            <span>Created At: </span>
            <span>{{ data.created }}</span>
          </div>

          <!-- Actions -->
          <div class="grid grid-cols-2 gap-2">
            <Button v-for="btn in data.actions" :key="btn">{{ btn }}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
