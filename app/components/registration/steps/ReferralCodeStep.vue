<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-semibold mb-2">Have a referral code?</h2>
      <p class="text-sm text-muted-foreground">
        Enter it here to get special benefits (optional)
      </p>
    </div>

    <FormField v-slot="{ componentField }" name="referralCode">
      <FormItem class="space-y-2">
        <FormLabel>
          Referral Code
          <span class="text-muted-foreground font-normal ml-1">(Optional)</span>
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter referral code"
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