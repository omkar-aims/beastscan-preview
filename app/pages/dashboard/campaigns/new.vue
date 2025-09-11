<script setup lang="ts">
const templates = [
  {
    id: 1,
    name: "Personal Link",
    category: "link-page",
    imageUrl: "./templates/template-01.webp",
  },
  {
    id: 2,
    name: "Portfolio",
    category: "link-page",
    imageUrl: "./templates/template-02.webp",
  },
  {
    id: 3,
    name: "Blog Page",
    category: "link-page",
    imageUrl: "./templates/template-03.webp",
  },
  {
    id: 4,
    name: "Event Link",
    category: "link-page",
    imageUrl: "./templates/template-04.webp",
  },
  {
    id: 5,
    name: "Business Contact",
    category: "link-page",
    imageUrl: "./templates/template-05.webp",
  },
  {
    id: 6,
    name: "E-commerce Store",
    category: "store-front",
    imageUrl: "./templates/template-06.webp",
  },
  {
    id: 7,
    name: "Product Showcase",
    category: "store-front",
    imageUrl: "./templates/template-07.webp",
  },
  {
    id: 8,
    name: "Startup Landing",
    category: "landing-page",
    imageUrl: "./templates/template-08.webp",
  },
  {
    id: 9,
    name: "App Landing",
    category: "landing-page",
    imageUrl: "./templates/template-09.webp",
  },
];

const selectedCategory = ref("all");

const filteredTemplates = computed(() => {
  if (selectedCategory.value === "all") return templates;
  return templates.filter((t) => t.category === selectedCategory.value);
});
</script>

<template>
  <AppRow gap="md">
    <AppRow direction="horizontal" class="justify-between">
      <AppHeading :level="3">My Campaigns</AppHeading>
      <Select v-model="selectedCategory">
        <SelectTrigger class="w-48">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="landing-page">Landing Page</SelectItem>
          <SelectItem value="link-page">Link Page</SelectItem>
          <SelectItem value="store-front">Store Front</SelectItem>
          <SelectItem value="forms">Forms</SelectItem>
        </SelectContent>
      </Select>
    </AppRow>
    <CampaignTemplatePicker :templates="filteredTemplates" />
  </AppRow>
</template>
