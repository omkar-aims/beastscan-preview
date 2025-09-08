<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { ref } from "vue";

// sample leads
const allLeads = [
  {
    id: 1,
    name: "Anna Smith",
    email: "anna@example.com",
    lastActivity: "2024-01-03",
    emailOpens: 0,
    tags: ["Spring"],
  },
  {
    id: 2,
    name: "John Miller",
    email: "john@example.com",
    lastActivity: "2023-11-12",
    emailOpens: 1,
    tags: ["Campaign A", "VIP"],
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "jane@example.com",
    lastActivity: "2024-06-20",
    emailOpens: 5,
    tags: ["Website"],
  },
];

// filter state
const filters = ref({
  lastActivity: "",
  emailOpens: "",
  tags: "",
});

const leads = ref(allLeads);

// apply filters
function applyFilters() {
  leads.value = allLeads.filter((lead) => {
    let match = true;

    // last activity filter
    if (filters.value.lastActivity) {
      match =
        match &&
        new Date(lead.lastActivity) <= new Date(filters.value.lastActivity);
    }

    // email opens filter
    if (filters.value.emailOpens) {
      match =
        match &&
        lead.emailOpens < parseInt(filters.value.emailOpens as string, 10);
    }

    // tags filter
    if (filters.value.tags) {
      const tagsArray = filters.value.tags
        .split(",")
        .map((t) => t.trim().toLowerCase());
      match =
        match &&
        tagsArray.every((tag) =>
          lead.tags.some((leadTag) => leadTag.toLowerCase().includes(tag))
        );
    }

    return match;
  });
}
</script>

<template>
  <div class="space-y-6 p-4">
    <p class="text-3xl font-bold">Cleanup Inactive Leads</p>

    <!-- Filter Form -->
    <Card>
      <CardContent>
        <Form>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <!-- Date Input -->
            <FormField name="lastActivity">
              <FormItem>
                <FormLabel>No activity since</FormLabel>
                <FormControl>
                  <Input
                  v-model="filters.lastActivity"
                    type="date"
                    class="w-full"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <!-- Select Dropdown -->
            <FormField name="emailOpens">
              <FormItem>
                <FormLabel>Email opened less than</FormLabel>
                <FormControl>
                  <Select v-model="filters.emailOpens">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="2 times" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="2">2 times</SelectItem>
                        <SelectItem value="3">3 times</SelectItem>
                        <SelectItem value="5">5 times</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>

            <!-- Tags Input -->
            <FormField name="tags">
              <FormItem>
                <FormLabel>Tags (optional)</FormLabel>
                <FormControl>
                  <Input
                  v-model="filters.tags"
                    type="text"
                    placeholder="e.g. Summer, QR"
                    class="w-full"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </Form>
      </CardContent>

      <CardFooter class="flex justify-end">
        <Button class="cursor-pointer" @click.prevent="applyFilters">
          Find Inactive Leads
        </Button>
      </CardFooter>
    </Card>

    <!-- Results -->
    <Card>
      <CardHeader>
        <CardTitle>
          Found {{ leads.length }}
          Inactive Lead{{ leads.length !== 1 ? "s" : "" }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="leads.length > 0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Email Opens</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="lead in leads" :key="lead.id">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell class="font-medium">{{ lead.name }}</TableCell>
                <TableCell>{{ lead.email }}</TableCell>
                <TableCell>{{ lead.lastActivity }}</TableCell>
                <TableCell>{{ lead.emailOpens }}</TableCell>
                <TableCell>
                  <div class="flex gap-2">
                    <span
                      v-for="tag in lead.tags"
                      :key="tag"
                      class="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- No matches -->
        <div v-else class="text-center text-gray-500 py-6">
          No matches found
        </div>
      </CardContent>
      <CardFooter
      v-if="leads.length > 0"
        class="flex justify-between"
      >
        <Button variant="destructive" class="cursor-pointer">
          Delete Selected
        </Button>
        <Button
          variant="outline"
          class="border-yellow-500 text-yellow-600 cursor-pointer"
        >
          Export Selected
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
