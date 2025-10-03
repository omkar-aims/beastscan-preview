<script setup lang="ts">
import { Plus, Wand2, Layout } from "lucide-vue-next";

type Template = {
  name: string;
  preview: string;
};

defineProps<{
  templates: Template[];
  handleSelect: () => void;
}>();
</script>

<template>
  <div class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
    <Card
      class="group cursor-pointer relative flex flex-col items-center justify-center border border-dashed border-foreground hover:border-primary transition-colors"
      @click="handleSelect"
    >
      <div class="flex flex-col items-center justify-center space-y-2">
        <Plus class="w-8 h-8 text-foreground" />
        <span class="text-foreground font-medium">Start from Scratch</span>
      </div>
    </Card>

    <Card
      v-for="template in templates"
      :key="template.name"
      class="group cursor-pointer relative overflow-hidden"
      @click="handleSelect"
    >
      <CardContent class="w-full h-56">
        <NuxtImg
          :src="template.preview"
          class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>

      <CardFooter
        class="flex-col gap-2 absolute bottom-0 left-0 w-full bg-card-foreground p-4 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Button
          class="w-full flex items-center justify-center gap-2"
          variant="secondary"
          type="button"
        >
          <Wand2 class="w-4 h-4" /> Quick Style
        </Button>
        <Button
          class="w-full flex items-center justify-center gap-2"
          type="button"
        >
          <Layout class="w-4 h-4" /> Open in builder
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
