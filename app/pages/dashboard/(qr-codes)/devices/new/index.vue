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
  <form @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle>Add New Device</CardTitle>
        <CardDescription>
          Fill out the details below to register a new device.
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
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
              <Select v-bind="componentField">
                <SelectTrigger class="w-[240px]">
                  <SelectValue placeholder="Choose a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign1">My Awesome Campaign</SelectItem>
                  <SelectItem value="campaign2"
                    >My Awesome Campaign 2</SelectItem
                  >
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter class="gap-4">
        <Button type="button" variant="outline" @click="resetForm">
          Cancel
        </Button>
        <Button type="submit"> Register Device </Button>
      </CardFooter>
    </Card>
  </form>
</template>
