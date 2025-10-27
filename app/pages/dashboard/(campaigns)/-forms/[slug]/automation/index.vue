<script setup lang="ts">
definePageMeta({
  layout: "form-overview",
});
</script>

<template>
  <Card>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-center">
        <div class="flex justify-center md:justify-start">
          <NuxtImg
            src="/automation.svg"
            class="w-48 h-auto md:w-full"
            alt="Automation illustration"
          />
        </div>

        <div class="space-y-4">
          <AppHeading :level="3">Automate Your Workflow</AppHeading>

          <CardDescription
            class="text-muted-foreground text-base leading-relaxed"
          >
            Save time and boost efficiency with smart automations that trigger
            the right actions based on your audience's behavior.
          </CardDescription>

          <NuxtLink to="/dashboard/automation/new">
            <Button class="mt-4 w-full md:w-auto">Create Automation</Button>
          </NuxtLink>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
