<script setup lang="ts">
import { ref } from "vue"
import { useHead } from "#imports"
import type { DateValue } from "@internationalized/date"
import { parseDate } from "@internationalized/date"

// shadcn components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

// page metadata
useHead({ title: "Clean-up" })
definePageMeta({ layout: "lead" })

// sample leads
const allLeads = [
  { id: 1, name: "Anna Smith", email: "anna@example.com", lastActivity: "2024-01-03", emailOpens: 0, tags: ["Spring"] },
  { id: 2, name: "John Miller", email: "john@example.com", lastActivity: "2023-11-12", emailOpens: 1, tags: ["Campaign A", "VIP"] },
]

// date picker state
const lastActivity = ref<DateValue | undefined>(undefined)

// filters state
const filters = ref<{ emailOpens: string; tags: string }>({
  emailOpens: "",
  tags: "",
})

const leads = ref([...allLeads])

// filter function
function applyFilters() {
  leads.value = allLeads.filter((lead) => {
    let match = true

    // last activity filter
    if (lastActivity.value) {
      const cutoff = lastActivity.value
      const leadDate = parseDate(lead.lastActivity)
      match = match && leadDate.compare(cutoff) <= 0
    }

    // email opens filter
    if (filters.value.emailOpens) {
      match = match && lead.emailOpens < parseInt(filters.value.emailOpens, 10)
    }

    // tags filter
    if (filters.value.tags) {
      const tagsArray = filters.value.tags.split(",").map((t) => t.trim().toLowerCase())
      match =
        match &&
        tagsArray.every((tag) =>
          lead.tags.some((leadTag) => leadTag.toLowerCase().includes(tag))
        )
    }

    return match
  })
}
</script>

<template>
  <div class="space-y-6">

    <!-- Filters -->
    <Card>
      <CardContent class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <!-- Date Picker -->
        <div class="space-y-2">
          <label class="text-sm font-medium">No activity since</label>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-full justify-start text-left font-normal">
                {{ lastActivity ? lastActivity.toString() : "Pick a date" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Calendar v-model="lastActivity" />
            </PopoverContent>
          </Popover>
        </div>

        <!-- Email Opens Select -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Email opened less than</label>
          <Select v-model="filters.emailOpens">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Never</SelectItem>
              <SelectItem value="2">2 times</SelectItem>
              <SelectItem value="3">3 times</SelectItem>
              <SelectItem value="5">5 times</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Tags Input -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Tags (optional)</label>
          <Input v-model="filters.tags" type="text" placeholder="e.g. Summer" />
        </div>
      </CardContent>

      <CardFooter class="flex justify-end p-4">
        <Button @click="applyFilters">Find Inactive Leads</Button>
      </CardFooter>
    </Card>

    <!-- Results -->
    <Card>
      <CardHeader>
        <CardTitle>
          Found {{ leads.length }} Inactive Lead{{ leads.length !== 1 ? "s" : "" }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="leads.length > 0">
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[40px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Email Opens</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="lead in leads" :key="lead.id">
                <TableCell><Checkbox /></TableCell>
                <TableCell class="font-medium">{{ lead.name }}</TableCell>
                <TableCell>{{ lead.email }}</TableCell>
                <TableCell>{{ lead.lastActivity }}</TableCell>
                <TableCell>{{ lead.emailOpens }}</TableCell>
                <TableCell>
                  <div class="flex gap-2 flex-wrap">
                    <span
                      v-for="tag in lead.tags"
                      :key="tag"
                      class="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div v-else class="text-center text-gray-500 py-6">
          No matches found
        </div>
      </CardContent>
      <CardFooter v-if="leads.length > 0" class="flex justify-between p-4">
        <Button variant="destructive">Delete Selected</Button>
        <Button variant="outline">Export Selected</Button>
      </CardFooter>
    </Card>
  </div>
</template>
