<script setup lang="ts">
import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";

defineProps<{
  handleSubmit: (formData: Record<string, string>) => void;
  formSchema: ZodObjectOrWrapped;
}>();
</script>

<template>
  <div v-motion-slide-bottom>
    <AutoForm
      keep-values
      class="space-y-4"
      :schema="formSchema"
      @submit="handleSubmit"
    >
      <Button type="submit">
        <span>Next</span>
        <Icon name="lucide:chevron-right" />
      </Button>
    </AutoForm>
  </div>
</template>
