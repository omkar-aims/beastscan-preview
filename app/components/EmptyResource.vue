<script setup lang="ts">
import { Check } from "lucide-vue-next";
defineProps<{
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };

  link: {
    label: string;
    url: string;
  };

  items: { strong: string; normal: string }[];
}>();
</script>

<template>
  <Card>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-center">
        <div class="flex justify-center md:justify-start max-w-sm h-98">
          <NuxtImg
            :src="image.src"
            class="w-full h-auto md:w-full object-contain"
            :alt="image.alt"
          />
        </div>

        <div class="space-y-4">
          <AppHeading :level="3">{{ title }}</AppHeading>

          <CardDescription
            class="text-muted-foreground text-base leading-relaxed"
          >
            {{ description }}
          </CardDescription>

          <ul class="space-y-2 text-sm text-muted-foreground">
            <li
              v-for="item in items"
              :key="item.strong"
              class="flex items-start gap-2"
            >
              <span class="text-primary"><Check /></span>
              <span
                ><strong>{{ item.strong }}</strong> {{ item.normal }}</span
              >
            </li>
          </ul>

          <NuxtLink :to="link.url">
            <Button class="mt-4 w-full md:w-auto">{{ link.label }}</Button>
          </NuxtLink>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
