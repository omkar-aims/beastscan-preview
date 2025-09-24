<script setup lang="ts">
import { ref } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-vue-next";

const activeTab = ref("userInfo");

const tabs = [
  { value: "userInfo", label: "Lead Information" },
  { value: "optIn", label: "Opt-In Details" },
  { value: "touchAttribution", label: "Touch Attribution" },
  { value: "emailInteraction", label: "Email Interaction" },
  { value: "activity", label: "Activity Log" },
  { value: "response", label: "Submitted Response" },
];

useHead({
  title: "Lead Details",
});

const leadDetails = {
  name: "Anna Keller",
  email: "anna@gmail.com",
  joinDate: "Jan 5, 2024",
  status: "Active",
  source: ["Summer Giveaway", "Website"],
};

const optIn = {
  optInType: "Double Opt-In",
  confirmedAt: "2024-01-05 14:22",
  source: "Popup Magnet on",
  sourceLink: "https://yourdomain.com/promo",
  optInIP: "185.12.101.45",
  location: "Zurich, Switzerland",
  browser: "Safari on iPhone 14",
};

const leadAttribution = {
  firstTouch: {
    Source: "Google",
    Medium: "CPC",
    Campaign: "Summer2025",
    "Landing Page": "/promo/summer-sale",
    Timestamp: "2025-06-01 14:32",
    Referrer: "https://www.instagram.com/ad/xyz",
  },
  lastTouch: {
    Source: "Instagram",
    Medium: "Social",
    Campaign: "Remarketing-June",
    "Landing Page": "/giveaway",
    Timestamp: "2025-07-03 10:14",
    Referrer: "https://www.instagram.com/ad/xyz",
  },
};

const stats = [
  {
    title: "Emails Sent",
    value: "9",
    description: "3 opened, 1 clicked",
  },
  {
    title: "Spam Complaints",
    value: "Yes",
    valueClass: "text-red-600 font-bold",
  },
  {
    title: "Last Device",
    value: "iPhone 14 (Safari)",
  },
  {
    title: "Tags",
    type: "tags",
    tags: ["Early Adopter", "Promo A"],
  },
];

const tagColorMap: Record<string, string> = {
  "Early Adopter": "bg-cyan-400 text-black",
  "Promo A": "bg-yellow-400 text-black",
  VIP: "bg-purple-400 text-white",
};

const emailInteractionHistory = [
  {
    email: "Welcome Email",
    opened: true,
    clicked: false,
    device: "Chrome on Windows",
    location: "Zurich, CH",
    ip: "185.12.100.23",
    response: "250 OK",
  },
  {
    email: "Promo Offer",
    opened: true,
    clicked: true,
    device: "iPhone Safari",
    location: "Bern, CH",
    ip: "185.44.101.92",
    response: "250 OK",
  },
  {
    email: "Survey Reminder",
    opened: false,
    clicked: false,
    device: "-",
    location: "-",
    ip: "--",
    response: "250 OK",
  },
];

const activityLogs = [
  { message: 'Clicked link in: "Promo Offer"', time: "2 days ago" },
  { message: 'Opened email: "Welcome to the Program"', time: "3 days ago" },
  { message: 'Scanned campaign "Summer Giveaway"', time: "Jun 22, 2025" },
  { message: "Signed up via popup magnet", time: "Jan 5, 2024" },
];

type SubmissionField = {
  label: string;
  value: string;
};

type Submission = {
  title: string;
  fields: SubmissionField[];
};

const submissions: Submission[] = [
  {
    title: "Customer Satisfaction Survey (Q2 2025)",
    fields: [
      { label: "Overall Satisfaction", value: "5/5" },
      { label: "Would Recommend", value: "Yes" },
      { label: "Favorite Feature", value: "Fast delivery" },
      {
        label: "Additional Comments",
        value: "Love the packaging and presentation. Will buy again.",
      },
    ],
  },
  {
    title: 'Product Personality Quiz – "Find Your Skincare Type"',
    fields: [
      { label: "Result", value: "Gentle Hydrator" },
      {
        label: "Recommended Products",
        value: "Aloe Cleanser, Day Moisturizer SPF30",
      },
      { label: "Email Capture", value: "Yes – used for follow-up campaign" },
      { label: "Date Taken", value: "July 2, 2025" },
    ],
  },
  {
    title: 'Feedback Poll – "New Store Layout"',
    fields: [
      { label: "Preferred Aisle Style", value: "Open Grid" },
      { label: "Navigation Clarity", value: "4/5" },
      { label: "Would Return", value: "Absolutely" },
    ],
  },
];
</script>

<template>
  <div class="space-y-6 flex flex-col">
    <div class="w-full lg:flex flex-1 justify-between">
      <div>
        <p class="text-3xl text-primary">Lead Details</p>
      </div>

      <div class="flex gap-2 md:justify-end">
        <div>
          <Button variant="outline" class="cursor-pointer">Edit Tags</Button>
        </div>
        <div>
          <Button variant="destructive" class="cursor-pointer"
            >Delete Lead</Button
          >
        </div>
      </div>
    </div>
    <Tabs v-model="activeTab" class="w-full mx-auto">
      <!-- Desktop Tabs -->
      <div class="hidden md:block">
        <TabsList>
          <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
      </div>

      <!-- Mobile/Tablet Dropdown -->
      <div class="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            class="w-full border rounded px-3 py-2 flex items-center justify-between"
          >
            <span>{{
              tabs.find((tab) => tab.value === activeTab)?.label
            }}</span>
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

      <!-- Shared Tab Contents -->
      <TabsContent value="userInfo">
        <div v-motion-slide-bottom>
          <Card class="w-full mx-auto rounded-lg shadow-sm mb-2">
            <CardContent class="flex items-center justify-between px-4 py-2">
              <!-- Left Section -->
              <div class="space-y-2">
                <p class="text-2xl font-semibold">{{ leadDetails.name }}</p>
                <p>{{ leadDetails.email }}</p>
                <p>
                  <span>Joined : {{ leadDetails.joinDate }}</span>
                </p>
              </div>

              <!-- Right Section (Status) -->
              <div class="flex flex-col items-end gap-2">
                <Badge
                  class="text-white px-3 py-1 rounded-full text-sm"
                  :class="{
                    'bg-green-600 hover:bg-green-700':
                      leadDetails.status === 'Active',
                    'bg-gray-500 hover:bg-gray-600':
                      leadDetails.status === 'Inactive',
                    'bg-red-600 hover:bg-red-700':
                      leadDetails.status === 'Bounced',
                  }"
                >
                  {{ leadDetails.status }}
                </Badge>
                <div class="flex gap-2 flex-wrap">
                  <Badge
                    v-for="(src, i) in leadDetails.source"
                    :key="i"
                    variant="secondary"
                    class="bg-primary text-white"
                  >
                    {{ src }}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div v-motion-slide-bottom>
          <Card class="w-full shadow-sm rounded-lg">
            <CardContent>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Stat Item -->
                <Card
                  v-for="(item, index) in stats"
                  :key="index"
                  class="p-4 text-center shadow-sm rounded-md"
                >
                  <CardTitle class="text-sm font-semibold mb-2">
                    {{ item.title }}
                  </CardTitle>

                  <!-- Tags -->
                  <div
                    v-if="item.type === 'tags'"
                    class="flex flex-wrap justify-center gap-2"
                  >
                    <Badge
                      v-for="tag in item.tags"
                      :key="tag"
                      :class="tagColorMap[tag] || 'bg-gray-300 text-black'"
                      class="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {{ tag }}
                    </Badge>
                  </div>

                  <!-- Normal Value -->
                  <div v-else class="flex flex-col items-center">
                    <p class="text-lg font-bold" :class="item.valueClass">
                      {{ item.value }}
                    </p>
                    <p v-if="item.description" class="text-sm">
                      {{ item.description }}
                    </p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div></TabsContent
      >
      <TabsContent value="optIn"
        ><div v-motion-slide-bottom>
          <Card class="w-full mx-auto rounded-lg shadow-sm">
            <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-2 text-sm">
                <p
                  v-for="(value, key) in {
                    'Opt-In Type': optIn.optInType,
                    'Confirmed At': optIn.confirmedAt,
                    Source: optIn.source,
                  }"
                  :key="key"
                  class="ml-1 flex flex-wrap items-center"
                >
                  <Label class="font-semibold">{{ key }}:</Label>
                  <span v-if="key !== 'Source'" class="ml-1">{{ value }}</span>
                  <span v-else class="ml-1 flex flex-wrap items-center">
                    {{ value }}
                    <a
                      :href="optIn.sourceLink"
                      target="_blank"
                      class="ml-1 text-blue-600 underline"
                    >
                      {{ optIn.sourceLink }}
                    </a>
                  </span>
                </p>
              </div>

              <!-- Right Column -->
              <div class="space-y-2 text-sm">
                <p
                  v-for="(value, key) in {
                    'Opt-In IP': optIn.optInIP,
                    Location: optIn.location,
                    Browser: optIn.browser,
                  }"
                  :key="key"
                  class="flex flex-wrap items-center"
                >
                  <Label class="font-semibold">{{ key }}:</Label>
                  <span class="ml-1">{{ value }}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div></TabsContent
      >
      <TabsContent value="touchAttribution"
        ><div v-motion-slide-bottom>
          <!-- Touch Attribution -->
          <Card class="w-full mx-auto rounded-lg shadow-sm">
            <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Touch -->
              <div class="space-y-2">
                <h3 class="font-semibold">First Touch</h3>
                <Separator />
                <ul class="space-y-1">
                  <li
                    v-for="(value, key) in leadAttribution.firstTouch"
                    :key="key"
                    class="flex gap-2"
                  >
                    <Label class="font-semibold">{{ key }}:</Label>
                    <span v-if="key === 'Referrer'">
                      <a
                        :href="value"
                        target="_blank"
                        class="text-blue-600 underline"
                      >
                        {{ value }}
                      </a>
                    </span>
                    <span v-else>{{ value }}</span>
                  </li>
                </ul>
              </div>

              <!-- Last Touch -->
              <div class="space-y-2">
                <h3 class="font-semibold">Last Touch</h3>
                <Separator />
                <ul class="space-y-1">
                  <li
                    v-for="(value, key) in leadAttribution.lastTouch"
                    :key="key"
                    class="flex gap-2"
                  >
                    <Label class="font-semibold">{{ key }}:</Label>
                    <span v-if="key === 'Referrer'">
                      <a
                        :href="value"
                        target="_blank"
                        class="text-blue-600 underline"
                      >
                        {{ value }}
                      </a>
                    </span>
                    <span v-else>{{ value }}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div></TabsContent
      >
      <TabsContent value="emailInteraction"
        ><div v-motion-slide-bottom>
          <Card>
            <CardContent>
              <CardDescription>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Opened</TableHead>
                      <TableHead>Clicked</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Response</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <TableRow
                      v-for="(interaction, index) in emailInteractionHistory"
                      :key="index"
                    >
                      <TableCell>{{ interaction.email }}</TableCell>
                      <TableCell>
                        <span
                          :class="
                            interaction.opened
                              ? 'text-green-600'
                              : 'text-red-600'
                          "
                        >
                          {{ interaction.opened ? "Yes" : "No" }}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          :class="
                            interaction.clicked
                              ? 'text-green-600'
                              : 'text-red-600'
                          "
                        >
                          {{ interaction.clicked ? "Yes" : "No" }}
                        </span>
                      </TableCell>
                      <TableCell>{{ interaction.device }}</TableCell>
                      <TableCell>{{ interaction.location }}</TableCell>
                      <TableCell>{{ interaction.ip }}</TableCell>
                      <TableCell>{{ interaction.response }}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardDescription>
            </CardContent>
          </Card>
        </div></TabsContent
      >
      <TabsContent value="activity"
        ><div v-motion-slide-bottom>
          <Card class="w-full mx-auto">
            <CardContent>
              <ul>
                <li
                  v-for="(log, index) in activityLogs"
                  :key="index"
                  class="flex flex-col sm:flex-row sm:justify-between py-3 text-sm"
                >
                  <span>{{ log.message }}</span>
                  <span
                    class="text-gray-500 sm:ml-4 mt-1 sm:mt-0 whitespace-nowrap"
                  >
                    {{ log.time }}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div></TabsContent
      >
      <TabsContent value="response"
        ><div v-motion-slide-bottom>
          <Card class="w-full mx-auto">
            <CardHeader>
              <CardTitle>Submitted Surveys & Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                v-if="submissions.length === 0"
                class="text-center text-muted-foreground py-6"
              >
                No submissions
              </div>
              <div v-else>
                <ul class="space-y-8">
                  <li
                    v-for="(submission, index) in submissions"
                    :key="index"
                    class="space-y-4"
                  >
                    <!-- Submission Title -->
                    <h3 class="text-xl font-semibold text-primary">
                      {{ submission.title }}
                    </h3>

                    <!-- Submission Fields -->
                    <ul class="space-y-3">
                      <li
                        v-for="(field, idx) in submission.fields"
                        :key="idx"
                        class="flex flex-col sm:flex-row sm:items-baseline sm:gap-3"
                      >
                        <Label
                          class="font-medium text-sm text-muted-foreground"
                        >
                          {{ field.label }} {{ "  " }}:
                        </Label>
                        <span class="text-base text-foreground">
                          {{ field.value }}
                        </span>
                      </li>
                    </ul>

                    <!-- Separator between submissions -->
                    <Separator
                      v-if="index < submissions.length - 1"
                      class="mt-6"
                    />
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card></div
      ></TabsContent>
    </Tabs>
    <div class="mt-4 w-full flex flex-row justify-between">
      <div>
        <NuxtLink to="/dashboard/leads">
          <Button
            v-motion-slide-bottom
            class="cursor-pointer rounded-lg px-4 py-2"
            >Back to All Leads</Button
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
