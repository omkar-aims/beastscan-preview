<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { createCampaignSchema } from "~/schemas";
import { slugify } from "@vueuse/motion";
import { ArrowRight } from "lucide-vue-next";

const emit = defineEmits(["done"]);

const form = useForm({
  validationSchema: toTypedSchema(createCampaignSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  emit("done", values);
});
</script>

<template>
  <Card>
    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel class="text-sm font-medium"> Campaign Title </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter a clear, engaging campaign title"
                v-bind="componentField"
                class="bg-card w-full"
                @change="
                (e: Event) => {
                  const target = e.target as HTMLInputElement
                  form.setFieldValue('slug', slugify(target.value))
                }
              "
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="slug">
          <FormItem>
            <FormLabel class="text-sm font-medium"> Campaign Slug </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. summer-sale-2025"
                v-bind="componentField"
                class="bg-card"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="alias">
          <FormItem>
            <FormLabel class="text-sm font-medium">
              Alias (Optional)
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Alias for your campaign"
                v-bind="componentField"
                class="bg-card"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button>Continue <ArrowRight /></Button>
      </form>
    </CardContent>
  </Card>
</template>
