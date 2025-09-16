<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const activeTab = ref("segmentDetails");

const tabs = [
  { value: "segmentDetails", label: "Segment Details" },
  { value: "matcingRules", label: "Matching Rules" },
  { value: "preview", label: "Preview of Matching Leads" },
];

type Segment = {
  name: string;
  created: string;
  totalLeads: number;
};

type Rule = {
  text: string;
};

type Lead = {
  name: string;
  email: string;
  opens: number;
  clicks: number;
  tags: string[];
  lastActivity: string;
};

//  Static data, but rendering dynamically
const segment: Segment = {
  name: "Highly Engaged Leads",
  created: "June 24, 2025",
  totalLeads: 128,
};

const rules: Rule[] = [
  { text: "Email Opens greater than 3" },
  { text: "Clicks greater than 1" },
  { text: 'Tag contains "VIP"' },
  { text: "Signup Date within last 30 days" },
];

const leads: Lead[] = [
  {
    name: "Lisa Muller",
    email: "lisa@example.com",
    opens: 7,
    clicks: 2,
    tags: ["VIP"],
    lastActivity: "2 days ago",
  },
  {
    name: "Jonas Schmidt",
    email: "jonas@example.com",
    opens: 5,
    clicks: 3,
    tags: ["Customer", "VIP"],
    lastActivity: "Today",
  },
  {
    name: "Maria Keller",
    email: "maria@example.com",
    opens: 4,
    clicks: 1,
    tags: ["VIP"],
    lastActivity: "5 days ago",
  },
];
</script>

<template>
 <div class="space-y-8 p-6 max-w-7xl mx-auto">
  <Tabs v-model="activeTab" class="w-full">
    <div class="hidden md:block">
      <TabsList class="mb-4">
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="px-4 py-2"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
    </div>

    <div class="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          class="w-full border rounded px-3 py-2 flex items-center justify-between"
        >
          <span>{{ tabs.find((tab) => tab.value === activeTab)?.label }}</span>
          <ChevronDown class="h-4 w-4 opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-full" align="end">
          <DropdownMenuItem
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <TabsContent value="segmentDetails">
      <div v-motion-slide-bottom>
        <Card class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
          <CardContent class="space-y-2">
            <h1 class="text-2xl md:text-3xl font-bold">Segment: {{ segment.name }}</h1>
            <p><span class="font-medium">Created:</span> {{ segment.created }}</p>
            <p><span class="font-medium">Total Leads:</span> <span class="font-bold">{{ segment.totalLeads }} leads</span></p>
          </CardContent>
          <div class="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">Edit Segment</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </Card>
      </div>
    </TabsContent>

    <TabsContent value="matcingRules">
      <div v-motion-slide-bottom>
        <Card class="p-6">
          <h2 class="text-lg font-medium mb-4">Matching Rules</h2>
          <Card class="p-4">
            <p class="font-semibold mb-3">Match ALL of the following:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li v-for="(rule, index) in rules" :key="index">
                <span v-html="rule.text" />
              </li>
            </ul>
          </Card>
        </Card>
      </div>
    </TabsContent>

    <TabsContent value="preview">
      <div v-motion-slide-bottom>
        <Card class="p-6">
          <h2 class="text-lg font-medium mb-4">Preview of Matching Leads</h2>

          <!-- Table for Desktop -->
          <div class="overflow-x-auto hidden md:block">
            <Table class="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Opens</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(lead, index) in leads" :key="index">
                  <TableCell class="py-2">{{ lead.name }}</TableCell>
                  <TableCell class="py-2">{{ lead.email }}</TableCell>
                  <TableCell class="py-2">{{ lead.opens }}</TableCell>
                  <TableCell class="py-2">{{ lead.clicks }}</TableCell>
                  <TableCell class="py-2 space-x-1">
                    <Badge
                      v-for="(tag, i) in lead.tags"
                      :key="i"
                      :variant="tag === 'VIP' ? 'default' : 'secondary'"
                    >
                      {{ tag }}
                    </Badge>
                  </TableCell>
                  <TableCell class="py-2">{{ lead.lastActivity }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Mobile Card List -->
          <div class="space-y-4 md:hidden">
            <Card
              v-for="(lead, index) in leads"
              :key="index"
              class="p-4 space-y-2"
            >
              <p class="font-semibold">{{ lead.name }}</p>
              <p class="text-sm text-muted-foreground">{{ lead.email }}</p>
              <p><span class="font-medium">Opens:</span> {{ lead.opens }}</p>
              <p><span class="font-medium">Clicks:</span> {{ lead.clicks }}</p>
              <div class="flex flex-wrap gap-1">
                <Badge
                  v-for="(tag, i) in lead.tags"
                  :key="i"
                  :variant="tag === 'VIP' ? 'default' : 'secondary'"
                >
                  {{ tag }}
                </Badge>
              </div>
              <p class="text-sm">
                <span class="font-medium">Last Activity:</span> {{ lead.lastActivity }}
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </TabsContent>
  </Tabs>

  <div class="flex justify-center mt-6">
    <NuxtLink to="/dashboard/lead-tools/segments">
      <Button variant="outline">View All Leads in Segment</Button>
    </NuxtLink>
  </div>
</div>

</template>
