<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const deviceSchema = z.object({
  registration_code: z.string({
    required_error: "Registration Code is required",
  }),
  name: z.string({ required_error: "Name is required" }),
  assignTo: z.string({ required_error: "Assign To is required" }),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(deviceSchema),
});

const onSubmit = handleSubmit(async (values) => {
  console.log("Final form values:", values);
  resetForm();
});
</script>

<template>
  <form class="grid gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="registration_code">
      <FormItem class="grid gap-2">
        <FormLabel>Registration Code</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="grid gap-2">
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="assignTo">
      <FormItem class="grid gap-2">
        <FormLabel>Assign To</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
