<script setup lang="ts">
import { contactSchema } from "~/schemas/contact";
</script>

<template>
  <div>
    <AutoForm :schema="contactSchema" class="space-y-4">
      <Button type="submit">Submit</Button>
    </AutoForm>
  </div>
</template>
