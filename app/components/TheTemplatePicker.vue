<script setup lang="ts">
import { Plus, Eye, Layout } from "lucide-vue-next";

type Template = {
  name: string;
  preview: string;
};

defineProps<{
  templates: Template[];
  handleSelect: (template: string) => void;
}>();
</script>

<template>
  <div class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
    <Card
      class="group cursor-pointer relative flex flex-col items-center justify-center border border-dashed border-border hover:border-primary transition-colors"
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
    >
      <CardContent class="w-full h-56">
        <NuxtImg
          :src="template.preview"
          class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>

      <CardFooter
        class="flex-col gap-2 absolute bottom-0 left-0 w-full bg-muted-foreground/50 p-4 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Dialog>
          <DialogTrigger as-child>
            <Button class="w-full" variant="secondary" type="button">
              <Eye class="w-4 h-4" /> Preview
            </Button>
          </DialogTrigger>

          <DialogScrollContent>
            <NuxtImg
              :src="template.preview"
              class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </DialogScrollContent>
        </Dialog>

        <Button
          class="w-full"
          type="button"
          @click="() => handleSelect(template.name)"
        >
          <Layout class="w-4 h-4" /> Select Template
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
