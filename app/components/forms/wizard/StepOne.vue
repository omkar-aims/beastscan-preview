<script setup lang="ts">
import { Wand2, Layout } from "lucide-vue-next";

defineProps<{
  nextStep: () => void;
}>();

const templates = [
  {
    name: "Classic Lead Capture",
    preview:
      "https://files.jotform.com/jotformapps/lead-capture-form-dde416f59c804b9d693d09e0da962a7c-classic.png",
  },
  {
    name: "Modern Lead Form",
    preview:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgzk6KSI8ROLGzE_7zjUfi8G1VK21qpxOgA&s",
  },
  {
    name: "Marketing Form Example",
    preview:
      "https://cdn.marketing123.123formbuilder.com/wp-content/uploads/2020/12/Lead-Capture-Form-4030148-1.jpg",
  },
];

const newFormStore = useNewFormStore();
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
  >
    <Card
      v-for="template in templates"
      :key="template.name"
      class="group cursor-pointer relative overflow-hidden"
      @click="
        () => {
          newFormStore.form.templateName = template.name;
          nextStep();
        }
      "
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
        >
          <Wand2 class="w-4 h-4" /> Quick Style
        </Button>
        <Button class="w-full flex items-center justify-center gap-2">
          <Layout class="w-4 h-4" /> Open in builder
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
