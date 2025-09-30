<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      formName: z.string({ required_error: "Form name is required" }),
      formDescription: z.string().optional(),
    })
  ),
});

const newFormStore = useNewFormStore();

const onSubmit = handleSubmit((values) => {
  newFormStore.form.formName = values.formName;
  newFormStore.form.formDescription = values.formDescription;
});
</script>

<template>
  <form @submit="onSubmit">
    <Card>
      <CardHeader>
        <AppHeading :level="3">
          🎉 Congratulations! Your form is ready
        </AppHeading>
      </CardHeader>
      <CardContent class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Form Name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter>
        <CardAction>
          <Button>Finish</Button>
        </CardAction>
      </CardFooter>
    </Card>
  </form>
</template>
