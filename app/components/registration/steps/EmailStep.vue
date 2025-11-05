<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-semibold mb-2">What's your email?</h2>
      <p class="text-sm text-muted-foreground">
        We'll use this to create your account
      </p>
    </div>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem class="space-y-2">
        <FormLabel>Email Address</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="name@example.com"
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