  <script setup lang="ts">
  useHead({
    title: "Campaigns",
  });

  interface Campaign {
    id: number;
    name: string;
    qrData: string;
    createdAt: string;
    mode: "dynamic" | "static";
    scan?: number;
    link?: string;
    type?: string;
  }

  const campaigns = ref<Campaign[]>([
    { id: 1, name: "Google QR", qrData: "https://www.google.com", createdAt: "2025-01-01", mode: "dynamic",type:"Website",scan: 150, link:"https://www.google.com" },
    { id: 2, name: "YouTube QR", qrData: "https://www.youtube.com", createdAt: "2025-02-15", mode: "static",type:"Website",scan:75,link:"https://www.youtube.com" },
    { id: 3, name: "Vue QR", qrData: "https://vuejs.org", createdAt: "2025-03-10", mode: "dynamic",type:"Website",scan : 50,link:"https://vue.com" },
  ]);

  const layout = ref<"grid" | "list">("grid");
  const sortOption = ref<"name" | "date">("name");
  const filterType = ref<"all" | "dynamic" | "static">("all");
  const search = ref("");

  const displayedCampaigns = computed(() => {
    let filtered = campaigns.value;

    if (filterType.value !== "all") {
      filtered = filtered.filter((c) => c.mode === filterType.value);
    }

    if (search.value) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.value.toLowerCase())
      );
    }

    if (sortOption.value === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption.value === "date") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  });
  </script>

  <template>
    <div class="space-y-8">
      <div >
          
      </div>
      <div class="space-y-4">
        <h1 class="text-2xl font-bold">Active QR codes</h1>

        <!-- Filters + Search + Layout Controls -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div class="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <Tabs v-model="filterType" class="w-full sm:w-auto">
              <TabsList class="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="dynamic">Dynamic</TabsTrigger>
                <TabsTrigger value="static">Static</TabsTrigger>
              </TabsList>
            </Tabs>
            <Input v-model="search" placeholder="Search campaigns..." class="w-full sm:w-64" />
          </div>

          <Tabs v-model="layout" class="self-end sm:self-auto">
            <TabsList>
              <TabsTrigger value="grid"><Icon name="lucide:layout-grid" /></TabsTrigger>
              <TabsTrigger value="list"><Icon name="lucide:layout-list" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <!-- Campaigns Rendering -->
        <div v-if="layout === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          <CampaignCard v-for="c in displayedCampaigns" :key="c.id" :campaign="c" layout="grid" />
        </div>

        <div v-else class="grid grid-cols-1 gap-4 mt-4">
          <CampaignCard v-for="c in displayedCampaigns" :key="c.id" :campaign="c" layout="list" />
          
        </div>
      </div>
    </div>
  </template>
