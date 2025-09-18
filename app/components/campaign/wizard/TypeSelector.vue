<script setup lang="ts">
import type { CampaignType } from "~/types/campaign";
import { campaignOptions } from "~/config/campaignOptions";
defineProps<{
  handleChange: (type: CampaignType) => void;
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
            <template
              v-for="(option, index) in campaignOptions.filter(
                (option) => option.mode === 'dynamic'
              )"
              :key="index"
            >
              <Card
                class="w-full cursor-pointer"
                @click="() => handleChange(option.type)"
              >
                <CardHeader class="flex items-center gap-4">
                  <Icon :name="option.icon" class="text-3xl text-primary" />
                  <div>
                    <CardTitle class="mb-0.5">{{ option.type }}</CardTitle>
                    <CardDescription>{{ option.description }}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </template>
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
            <template
              v-for="(option, index) in campaignOptions.filter(
                (option) => option.mode === 'static'
              )"
              :key="index"
            >
              <Card
                class="w-full cursor-pointer"
                @click="() => handleChange(option.type)"
              >
                <CardHeader class="flex items-center gap-4">
                  <Icon :name="option.icon" class="text-3xl text-primary" />
                  <div>
                    <CardTitle class="mb-0.5">{{ option.type }}</CardTitle>
                    <CardDescription>{{ option.description }}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </template>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </AppRow>
</template>
