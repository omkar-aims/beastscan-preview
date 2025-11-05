<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-semibold mb-2">What's your project name?</h2>
      <p class="text-sm text-muted-foreground">
        This is optional - you can skip if you want
      </p>
    </div>

    <FormField v-slot="{ componentField }" name="projectName">
      <FormItem class="space-y-2">
        <FormLabel>
          Project Name
          <span class="text-muted-foreground font-normal ml-1">(Optional)</span>
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Your project name"
            v-bind="componentField"
            :disabled="disabled"
            class="h-11"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>