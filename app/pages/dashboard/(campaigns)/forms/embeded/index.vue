<script setup lang="ts">
import { Check } from "lucide-vue-next";

definePageMeta({
  layout: "forms-overview",
});
</script>

<template>
  <div>
    <template v-if="true">
      <Card>
        <CardContent class="md:p-16">
          <div
            class="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-center"
          >
            <div class="flex justify-center md:justify-start">
              <NuxtImg
                src="/embed-form.svg"
                class="w-48 h-auto md:w-full"
                alt="Embedded form illustration"
              />
            </div>

            <div class="space-y-4">
              <AppHeading :level="3">Build Your First Embedded Form</AppHeading>

              <CardDescription
                class="text-muted-foreground text-base leading-relaxed"
              >
                Turn visitors into subscribers with sleek, customizable forms
                added directly to your website.
              </CardDescription>

              <ul class="space-y-2 text-sm text-muted-foreground">
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Match your brand</strong> with designs that blend
                    seamlessly into your site.</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Place forms anywhere</strong> — in content,
                    sidebars, or footers.</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary"><Check /></span>
                  <span
                    ><strong>Stay compliant</strong> with built-in privacy and
                    consent options.</span
                  >
                </li>
              </ul>

              <NuxtLink to="/dashboard/forms/new">
                <Button class="mt-4 w-full md:w-auto">Create New</Button>
              </NuxtLink>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>

    <template v-if="false">
      <h1>Hello</h1>
    </template>
  </div>
</template>
