<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-semibold mb-2">Create a password</h2>
      <p class="text-sm text-muted-foreground">
        Must be at least 8 characters long
      </p>
    </div>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem class="space-y-2">
        <FormLabel>Password</FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>
