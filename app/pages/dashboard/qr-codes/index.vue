<script setup lang="ts">
interface Campaign {
  id: number;
  name: string;
  qrData: string;
  createdAt: string;
  type: "dynamic" | "static";
}

const campaigns = ref<Campaign[]>([
  {
    id: 1,
    name: "Google QR",
    qrData: "https://www.google.com",
    createdAt: "2025-01-01",
    type: "dynamic",
  },
  {
    id: 2,
    name: "YouTube QR",
    qrData: "https://www.youtube.com",
    createdAt: "2025-02-15",
    type: "static",
  },
  {
    id: 3,
    name: "Vue QR",
    qrData: "https://vuejs.org",
    createdAt: "2025-03-10",
    type: "dynamic",
  },
]);

const layout = ref<"grid" | "list">("list");
const sortOption = ref<"name" | "date">("name");
const filterType = ref<"all" | "dynamic" | "static">("all");
const search = ref("");

const displayedCampaigns = computed(() => {
  let filtered = campaigns.value;

  if (filterType.value !== "all") {
    filtered = filtered.filter((c) => c.type === filterType.value);
  }

  if (search.value) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (sortOption.value === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === "date") {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return filtered;
});
</script>

<template>
  <div class="space-y-4">
    <AppHeading :level="3">Your QR codes</AppHeading>

    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
    >
      <AppRow
        direction="horizontal"
        class="flex-wrap gap-4 items-center w-full sm:w-auto"
      >
        <Tabs v-model="filterType">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
            <TabsTrigger value="static">Static</TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          v-model="search"
          placeholder="Search campaigns..."
          class="w-full sm:w-64"
        />
      </AppRow>

      <Tabs v-model="layout" class="self-end sm:self-auto">
        <TabsList>
          <TabsTrigger value="grid">
            <Icon name="lucide:layout-grid" />
          </TabsTrigger>
          <TabsTrigger value="list">
            <Icon name="lucide:layout-list" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div
      v-if="layout === 'grid'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4"
    >
      <Card
        v-for="campaign in displayedCampaigns"
        :key="campaign.id"
        class="flex flex-col"
      >
        <CardHeader class="flex flex-col items-center gap-3">
          <NuxtImg
            src="https://upload.wikimedia.org/wikipedia/commons/3/31/MM_QRcode.png?20120720164609"
            alt="QR Code"
            class="w-32 h-32 object-contain"
          />
          <CardTitle class="text-center text-lg font-semibold">
            {{ campaign.name }}
          </CardTitle>
          <AppRow direction="horizontal" class="mx-auto gap-2 flex-wrap">
            <Badge class="uppercase">Website</Badge>
            <Badge class="uppercase" variant="destructive">
              {{
                campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)
              }}
            </Badge>
          </AppRow>
        </CardHeader>
        <Separator />

        <CardContent class="flex flex-col flex-1 justify-between gap-4">
          <div class="grid gap-2">
            <AppRow direction="horizontal" class="justify-between text-sm">
              <AppRow direction="horizontal" class="items-center gap-1">
                <Icon name="lucide:scan" /> Scan
              </AppRow>
              <span>12</span>
            </AppRow>

            <AppRow direction="horizontal" class="justify-between text-sm">
              <AppRow direction="horizontal" class="items-center gap-1">
                <Icon name="lucide:calendar" /> Created
              </AppRow>
              <span>{{
                new Date(campaign.createdAt).toLocaleDateString()
              }}</span>
            </AppRow>
          </div>

          <AppRow direction="horizontal" class="justify-center gap-2 mt-auto">
            <AppShareDialog link-to-copy="https://www.google.com">
              <Button variant="outline">
                <Icon name="lucide:share-2" />
              </Button>
            </AppShareDialog>

            <QRDownloadButton>
              <Button variant="outline">
                <Icon name="lucide:download" />
              </Button>
            </QRDownloadButton>

            <NuxtLink to="./qr-codes/overview">
              <Button variant="outline">
                <Icon name="lucide:bar-chart-2" />
              </Button>
            </NuxtLink>

            <QREditDialog>
              <Button variant="outline">
                <Icon name="lucide:pencil" />
              </Button>
            </QREditDialog>
          </AppRow>
        </CardContent>
      </Card>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 mt-4">
      <Card
        v-for="campaign in displayedCampaigns"
        :key="campaign.id"
        class="flex flex-row items-center gap-6 p-4"
      >
        <NuxtImg
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/MM_QRcode.png?20120720164609"
          alt="QR Code"
          class="w-24 h-24 object-contain flex-shrink-0"
        />

        <div class="flex flex-1 flex-col lg:flex-row lg:justify-between gap-2">
          <div class="flex-1 grid gap-2">
            <div>
              <h3 class="text-lg font-semibold">{{ campaign.name }}</h3>
              <AppRow direction="horizontal" class="gap-2 mt-1 flex-wrap">
                <Badge>Website</Badge>
                <Badge variant="destructive">
                  {{
                    campaign.type.charAt(0).toUpperCase() +
                    campaign.type.slice(1)
                  }}
                </Badge>
              </AppRow>
            </div>

            <AppRow class="text-sm">
              <AppRow direction="horizontal" class="items-center gap-1">
                <Icon name="lucide:calendar" /> Created
                <span class="ml-1">
                  {{ new Date(campaign.createdAt).toLocaleDateString() }}
                </span>
              </AppRow>
              <AppRow direction="horizontal" class="items-center gap-1">
                <Icon name="lucide:scan" /> Scan
                <span class="ml-1">12</span>
              </AppRow>
            </AppRow>
          </div>

          <div
            class="grid grid-cols-4 lg:grid-cols-2 gap-2 lg:items-center lg:content-center"
          >
            <AppShareDialog link-to-copy="https://www.google.com">
              <Button variant="outline" class="w-full">
                <Icon name="lucide:share-2" />
                <span class="hidden lg:inline">Share</span>
              </Button>
            </AppShareDialog>

            <QRDownloadButton>
              <Button variant="outline" class="w-full">
                <Icon name="lucide:download" />
                <span class="hidden lg:inline">Download</span>
              </Button>
            </QRDownloadButton>

            <NuxtLink to="./qr-codes/overview">
              <Button variant="outline" class="w-full">
                <Icon name="lucide:bar-chart-2" />
                <span class="hidden lg:inline">Analytics</span>
              </Button>
            </NuxtLink>

            <QREditDialog>
              <Button variant="outline" class="w-full">
                <Icon name="lucide:pencil" />
                <span class="hidden lg:inline">Edit</span>
              </Button>
            </QREditDialog>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
