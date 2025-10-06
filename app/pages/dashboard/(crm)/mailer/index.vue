<script setup lang="ts">
import CardContent from "~/components/ui/card/CardContent.vue";

useHead({
  title: "Mailer",
});

const data = [
  { campaignName: "Campaign A", sent: 240, opened: 45, clicked: 12 },
  { campaignName: "Campaign B", sent: 300, opened: 50, clicked: 15 },
  { campaignName: "Campaign C", sent: 200, opened: 40, clicked: 10 },
  { campaignName: "Campaign D", sent: 350, opened: 65, clicked: 22 },
  { campaignName: "Campaign E", sent: 420, opened: 55, clicked: 18 },
  { campaignName: "Campaign F", sent: 280, opened: 48, clicked: 14 },
  { campaignName: "Campaign G", sent: 500, opened: 70, clicked: 30 },
  { campaignName: "Campaign H", sent: 150, opened: 35, clicked: 19 },
  { campaignName: "Campaign I", sent: 600, opened: 62, clicked: 25 },
  { campaignName: "Campaign J", sent: 330, opened: 58, clicked: 20 },
  { campaignName: "Campaign K", sent: 210, opened: 42, clicked: 11 },
];
</script>

<template>
  <div>
    <div>
      <p class="text-3xl text-primary">Mail Information</p>
    </div>
    <div>
      <Card class="mt-4 p-4 w-full">
        <CardHeader class="mt-2">
          <CardTitle class="text-xl">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="w-full">
            <BarChart
              index="campaignName"
              :data="data"
              :categories="['clicked', 'opened', 'sent']"
              :type="'stacked'"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
