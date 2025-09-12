<script setup lang="ts">
const layout = ref<"grid" | "list">("list");

const mailerData = [
  {
    id: 1,
    heading: "Newsletter Campaigns",
    description: "Create, manage, and analyze your email campaigns with ease.",
    total_count: 5,
    button: [
      { label: "View All Campaigns", link: "/dashboard/mailer/all-campaigns" },
      { label: "Create New Campaign", link: "/dashboard/mailer/new-campaign" },
    ],
  },
  {
    id: 2,
    heading: "Automations",
    description:
      "Set up automated email sequences to nurture your leads and customers.",
    total_count: 3,
    button: [
      { label: "Create New Automation", link: "/" },
      { label: "View All Automations", link: "/dashboard/mailer/automation" },
    ],
  },
];

const mailerAnalytics = [
  {
    id: 1,
    heading: "Mailer Analytics",
    description:
      "Track open rates, click-through rates, and overall performance of your email campaigns.",
    total_count: 1200,
    button: ["View Detailed Analytics", "Export Data"],
  },
];
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-3xl font-semibold text-primary">All About Mailer</h1>
      <p>
        Handle All Your Newsletter Campaign, Automations and Mailer Analytics
        Here
      </p>
    </div>
    <div>
      <Tabs v-model="layout" class="self-end sm:self-auto left-0">
        <TabsList class="bg-primary/20">
          <TabsTrigger value="grid">
            <Icon name="lucide:layout-grid" />
          </TabsTrigger>
          <TabsTrigger value="list">
            <Icon name="lucide:layout-list" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <div>
      <Card>
        <CardContent v-for="data in mailerData" :key="data.id">
          <Card
            class="hover:bg-primary/5 transition-shadow duration-300 p-4 rounded-lg"
          >
            <div class="grid md:grid-cols-2 gap-4">
              <CardHeader>
                <CardTitle
                  class="text-lg font-semibold text-primary flex items-center gap-2"
                >
                  {{ data.heading }}
                </CardTitle>
                <CardDescription class="text-sm">
                  {{ data.description }}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div class="flex flex-col gap-4">
                  <Card>
                    <CardDescription>
                      <span class="font-medium">Total:</span>
                      <p class="text-3xl">
                        <AnimatedCounter :value="data.total_count" />
                      </p>
                    </CardDescription>
                  </Card>

                  <div class="flex gap-4">
                    <NuxtLink
                      v-for="btn in data.button"
                      :key="btn.label"
                      :to="btn.link"
                    >
                      <Button variant="outline">
                        {{ btn.label }}
                      </Button>
                    </NuxtLink>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
    <div>
      <Card>
        <CardContent v-for="analytics in mailerAnalytics" :key="analytics.id">
          <card
            class="hover:bg-primary/5 transition-shadow duration-300 grid md:grid-cols-2 gap-4 p-4 rounded-lg"
          >
            <CardHeader>
              <CardTitle
                class="text-lg font-semibold text-primary flex items-center gap-2"
              >
                {{ analytics.heading }}
              </CardTitle>
              <CardDescription class="text-sm">
                {{ analytics.description }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-4">
                <Card>
                  <card-description>
                    <span class="font-medium">Total Emails Sent:</span>
                    <p class="text-3xl">
                      <AnimatedCounter :value="analytics.total_count" />
                    </p>
                  </card-description>
                </Card>
                <div class="flex gap-4">
                  <Button
                    v-for="btn in analytics.button"
                    :key="btn"
                    variant="outline"
                    >{{ btn }}</Button
                  >
                </div>
              </div>
            </CardContent>
          </card>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
