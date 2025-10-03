<script setup lang="ts">
import { contactSchema } from "~/schemas/contact";
</script>

<template>
  <div>
    <Card>
      <CardHeader>
        <CardTitle> Add New Contact </CardTitle>
        <CardDescription>
          Fill out the details below to create a new contact.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AutoForm :schema="contactSchema" class="space-y-4">
          <div class="flex gap-4">
            <Button type="button" variant="outline"> Cancel </Button>
            <Button type="submit"> Save Contact </Button>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>
