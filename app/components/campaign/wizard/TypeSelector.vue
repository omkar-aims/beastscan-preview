<script setup lang="ts">
import { campaignOptions } from "~/config/campaignOptions";
defineProps<{
  handleTypeSelect: (value: string) => void;
}>();
</script>

<template>
  <AppRow>
    <Accordion type="single" collapsible default-value="static">
      <AccordionItem value="dynamic">
        <AccordionTrigger>
          <div>
            <AppRow direction="horizontal" class="items-center">
              <AppHeading :level="4">Dynamic</AppHeading>
              <Badge variant="success">
                <Icon name="lucide:bar-chart-4" class="text-xs" />
                <span class="uppercase text-xs font-medium">Trackable</span>
              </Badge>
            </AppRow>
            <p class="text-muted-foreground">
              Modify content anytime, even after printing
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AppHoverCard
              v-for="qr in campaignOptions.filter(
                (qr) => qr.type === 'dynamic'
              )"
              :key="qr.title"
              :title="qr.title"
              :desc="qr.desc"
              :icon="qr.icon"
              :preview="`campaign-previews/campaign-previews-website.png`"
              @update:model-value="handleTypeSelect"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="static">
        <AccordionTrigger>
          <div>
            <AppRow direction="horizontal" class="items-center">
              <AppHeading :level="4">Static</AppHeading>
              <Badge variant="destructive">
                <Icon name="lucide:circle-minus" class="text-xs" />
                <span class="uppercase text-xs font-medium">Non-Trackable</span>
              </Badge>
            </AppRow>
            <p class="text-muted-foreground">
              Fixed content that cannot be changed after printing
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AppHoverCard
              v-for="qr in campaignOptions.filter((qr) => qr.type === 'static')"
              :key="qr.title"
              :title="qr.title"
              :desc="qr.desc"
              :icon="qr.icon"
              :preview="`campaign-previews/campaign-previews-website.png`"
              @update:model-value="handleTypeSelect"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </AppRow>
</template>
