<script setup lang="ts">
import {
  Plus,
  X,
  Settings,
  ExternalLink,
  Edit3,
  LayoutDashboard,
  Archive,
  MapPin,
  Building2,
} from "lucide-vue-next";

const topStats = [
  {
    label: "Total Views",
    value: 35400,
    trend: "+6%",
    trendDirection: "up",
  },
  {
    label: "New Views",
    value: 1800,
    trend: "+3%",
    trendDirection: "up",
  },
  {
    label: "Conversions",
    value: 10200,
    trend: "-1%",
    trendDirection: "down",
  },
];

const engagement = [
  { time: "14:00", Conversions: 1200, "New Views": 500, "Total Views": 2200 },
  { time: "15:00", Conversions: 1400, "New Views": 2400, "Total Views": 6800 },
  { time: "16:00", Conversions: 1600, "New Views": 1800, "Total Views": 13200 },
  { time: "17:00", Conversions: 1500, "New Views": 1200, "Total Views": 18400 },
  { time: "18:00", Conversions: 1700, "New Views": 1800, "Total Views": 25400 },
  { time: "19:00", Conversions: 1500, "New Views": 1600, "Total Views": 31400 },
  { time: "20:00", Conversions: 1300, "New Views": 1000, "Total Views": 35400 },
];

const countries = [
  {
    name: "United States",
    code: "US",
    percent: 42,
  },
  {
    name: "India",
    code: "IN",
    percent: 35,
  },
  {
    name: "United Kingdom",
    code: "GB",
    percent: 18,
  },
  {
    name: "Germany",
    code: "DE",
    percent: 12,
  },
];
const geoFilter = ref("country");

const selectedFilter = ref<"device" | "os" | "platform">("device");

const dataset = {
  device: [
    { name: "Mobile", total: 100, predicted: 45 },
    { name: "Tablet", total: 100, predicted: 25 },
    { name: "Desktop", total: 100, predicted: 30 },
  ],
  os: [
    { name: "Windows", total: 100, predicted: 40 },
    { name: "Android", total: 100, predicted: 35 },
    { name: "iOS", total: 100, predicted: 25 },
  ],
  platform: [
    { name: "Instagram", total: 100, predicted: 55 },
    { name: "Direct", total: 100, predicted: 35 },
    { name: "Twitter", total: 100, predicted: 10 },
  ],
};

const regions = [
  { name: "North America", percent: 48 },
  { name: "Asia-Pacific", percent: 37 },
  { name: "Europe", percent: 15 },
];

const cities = [
  { name: "New York", percent: 25 },
  { name: "Mumbai", percent: 22 },
  { name: "Berlin", percent: 18 },
  { name: "Tokyo", percent: 16 },
  { name: "London", percent: 14 },
];

const colors = ["#3B82F6", "#10B981", "#F59E0B"];
const chartData = computed(() => dataset[selectedFilter.value]);

const showQuickEditModal = ref<boolean>(false);
const showArchiveAlert = ref<boolean>(false);
</script>

<template>
  <div class="space-y-6">
    <AppRow gap="md">
      <div class="flex justify-between items-center">
        <AppHeading :level="3">My Awesome Campaign</AppHeading>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-input"
            >
              <Settings class="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              class="group cursor-pointer"
              @click="() => navigateTo('/design?campaign=1')"
            >
              <ExternalLink
                class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
              />
              Visit
            </DropdownMenuItem>
            <DropdownMenuItem
              class="group cursor-pointer"
              @click="showQuickEditModal = true"
            >
              <Edit3 class="w-4 h-4 mr-2 group-hover:text-primary-foreground" />
              Quick Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              class="group cursor-pointer"
              @click="() => navigateTo('/design?campaign=1')"
            >
              <LayoutDashboard
                class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
              />
              Open in Designer
            </DropdownMenuItem>
            <DropdownMenuItem
              class="group cursor-pointer"
              @click="showArchiveAlert = true"
            >
              <Archive
                class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
              />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div class="flex justify-between items-center">
        <TagPicker>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-input"
          >
            <Plus class="w-5 h-5 text-muted-foreground" />
          </button>
        </TagPicker>

        <div class="flex gap-2">
          <DateRangePicker />

          <Button>Apply</Button>
        </div>
      </div>
    </AppRow>

    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          v-for="stat in topStats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :trend="stat.trend"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card class="p-4 pb-16">
        <LineChart
          title="Engagements"
          class="my-4"
          :data="engagement"
          index="time"
          :categories="['Total Views', 'New Views', 'Conversions']"
          :colors="colors"
        />
      </Card>
      <Card class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">Traffic Sources</h2>

          <Select v-model="selectedFilter">
            <SelectTrigger class="w-[130px]">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="device">Device</SelectItem>
              <SelectItem value="os">OS</SelectItem>
              <SelectItem value="platform">Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center justify-center">
          <DonutChart
            index="name"
            :category="'predicted'"
            :data="chartData"
            :colors="colors"
            :type="'pie'"
            class="h-[250px] w-[250px]"
          />
        </div>

        <div
          class="grid grid-cols-3 gap-2 text-center text-sm text-muted-foreground"
        >
          <div
            v-for="(item, i) in chartData"
            :key="item.name"
            class="flex flex-col items-center"
          >
            <div class="flex items-center justify-center gap-1">
              <span
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: colors[i] }"
              />
              {{ item.name }}
            </div>
            <p class="font-medium text-foreground">{{ item.predicted }}%</p>
          </div>
        </div>
      </Card>
    </div>
    <Tabs v-model="geoFilter" class="w-full">
      <Card class="p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">Geo Performance</h2>

          <Select v-model="geoFilter">
            <SelectTrigger class="w-xs">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country"> Country </SelectItem>
              <SelectItem value="region"> Region </SelectItem>
              <SelectItem value="city"> City </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HeatMapChart />

          <div class="flex flex-col">
            <TabsContent value="country">
              <ul class="divide-y divide-border/40">
                <li
                  v-for="(country, index) in countries"
                  :key="country.name"
                  class="flex items-center justify-between py-3 hover:bg-muted/40 rounded-lg transition-colors duration-200 px-3"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-sm font-semibold text-muted-foreground w-5 text-center"
                    >
                      {{ index + 1 }}
                    </span>

                    <NuxtImg
                      :src="`https://flagsapi.com/${country.code}/flat/64.png`"
                      :alt="country.name"
                      class="w-8 h-8 rounded-full ring-1 ring-border/30"
                    />

                    <p class="font-medium leading-tight text-sm">
                      {{ country.name }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <span
                      class="text-xs text-muted-foreground font-medium w-6 text-right"
                    >
                      {{ country.percent }}%
                    </span>
                    <Progress
                      :model-value="country.percent"
                      class="h-2 w-28 rounded-full bg-muted"
                    />
                  </div>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="region">
              <ul class="divide-y divide-border/40">
                <li
                  v-for="(region, index) in regions"
                  :key="region.name"
                  class="flex items-center justify-between py-3 hover:bg-muted/40 rounded-lg transition-colors duration-200 px-3"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-sm font-semibold text-muted-foreground w-5 text-center"
                    >
                      {{ index + 1 }}
                    </span>

                    <MapPin class="w-5 h-5 text-muted-foreground" />

                    <p class="font-medium leading-tight text-sm">
                      {{ region.name }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <span
                      class="text-xs text-muted-foreground font-medium w-6 text-right"
                    >
                      {{ region.percent }}%
                    </span>
                    <Progress
                      :model-value="region.percent"
                      class="h-2 w-28 rounded-full bg-muted"
                    />
                  </div>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="city">
              <ul class="divide-y divide-border/40">
                <li
                  v-for="(city, index) in cities"
                  :key="city.name"
                  class="flex items-center justify-between py-3 hover:bg-muted/40 rounded-lg transition-colors duration-200 px-3"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="text-sm font-semibold text-muted-foreground w-5 text-center"
                    >
                      {{ index + 1 }}
                    </span>

                    <Building2 class="w-5 h-5 text-muted-foreground" />

                    <p class="font-medium leading-tight text-sm">
                      {{ city.name }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <span
                      class="text-xs text-muted-foreground font-medium w-6 text-right"
                    >
                      {{ city.percent }}%
                    </span>
                    <Progress
                      :model-value="city.percent"
                      class="h-2 w-28 rounded-full bg-muted"
                    />
                  </div>
                </li>
              </ul>
            </TabsContent>
          </div>
        </div>
      </Card>
    </Tabs>

    <Dialog v-model:open="showQuickEditModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update campaign</DialogTitle>
          <DialogDescription> Modify campaign details </DialogDescription>
        </DialogHeader>

        <form class="space-y-4 max-w-md">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel class="text-sm font-medium">
                Campaign Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a clear, engaging campaign title"
                  v-bind="componentField"
                  class="bg-card"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="slug">
            <FormItem>
              <FormLabel class="text-sm font-medium"> Campaign Slug </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. summer-sale-2025"
                  v-bind="componentField"
                  class="bg-card"
                />
              </FormControl>
              <FormMessage />
              <p
                v-if="null !== null"
                class="text-destructive-foreground text-sm"
              >
                {{ "x" }}
              </p>
            </FormItem>
          </FormField>

          <DialogFooter class="mt-4">
            <DialogClose as-child>
              <Button type="button" variant="outline"> Cancel </Button>
            </DialogClose>
            <StatefulButton :status="'idle'"> Update </StatefulButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="showArchiveAlert">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive this campaign?</AlertDialogTitle>
          <AlertDialogDescription>
            Once archived, this campaign will be moved out of the active list.
            You can restore it later from the archived campaigns section.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Archive</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
