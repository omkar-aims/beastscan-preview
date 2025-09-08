<script setup lang="ts">
import { ref } from "vue";

useHead({
  title: "Segments",
});

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const segmentData = ref([
  {
    name: "Segment A",
    description: "description for segment A",
    leads: 150,
    senderName: "Sender 1",
    senderEmail: "sender1@gmail.com",
    lastuse: "July 1, 2025",
    action: ["View", "Edit"],
  },
  {
    name: "Segment B",
    description: "description for segment B",
    leads: 200,
    senderName: "Sender 2",
    senderEmail: "sender2@gmail.com",
    lastuse: "July 2, 2025",
    action: ["View", "Edit"],
  },
  {
    name: "Segment C",
    description: "description for segment C",
    leads: 180,
    senderName: "Sender 3",
    senderEmail: "sender3@gmail.com",
    lastuse: "July 3, 2025",
    action: ["View", "Edit"],
  },
]);

const getActionLink = (act: string) => {
  if (act === "View") return "/dashboard/lead-tools/segments/show-segment";
  if (act === "Edit") return "/dashboard/lead-tools/segments/edit-segment";
  return "#";
};
</script>

<template>
  <div class="p-6">
    <div>
      <h1 class="text-2xl font-semibold mb-4">Lead Segments</h1>
    </div>
    <div class="flex justify-end">
      <NuxtLink to="/dashboard/lead-tools/segments/newsegment">
        <Button class="mb-4 cursor-pointer">Create New Segment</Button>
      </NuxtLink>
    </div>
    <div>
      <Table>
        <TableHeader>
          <TableRow class="bg-secondary font-bold">
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Leads</TableHead>
            <TableHead>Sender Name</TableHead>
            <TableHead>Sender Email</TableHead>
            <TableHead>Last Use</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <!-- Dynamic Rows -->
        <TableBody>
          <TableRow v-for="(row, rowIndex) in segmentData" :key="rowIndex">
            <TableCell class="whitespace-normal break-words max-w-[200px]">
              {{ row.name }}
            </TableCell>
            <TableCell class="whitespace-normal break-words max-w-[300px]">
              {{ row.description }}
            </TableCell>
            <TableCell>{{ row.leads }}</TableCell>
            <TableCell class="whitespace-normal break-words max-w-[200px]">
              {{ row.senderName }}
            </TableCell>
            <TableCell class="whitespace-normal break-words max-w-[250px]">
              {{ row.senderEmail }}
            </TableCell>
            <TableCell>{{ row.lastuse }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end space-x-2">
                <NuxtLink
                  v-for="(act, i) in row.action"
                  :key="i"
                  :to="getActionLink(act)"
                >
                  <Button size="sm" variant="outline" class="cursor-pointer">
                    {{ act }}
                  </Button>
                </NuxtLink>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
