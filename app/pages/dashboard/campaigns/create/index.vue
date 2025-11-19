<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useCreateCampaign } from "~/composables/campaign/useCreateCampaign";
import { createCampaignSchema } from "~/schemas";
import { slugify } from "@vueuse/motion";

const form = useForm({
  validationSchema: toTypedSchema(createCampaignSchema),
});

const { mutateAsync, status } = useCreateCampaign();
const error = ref<string | null>(null);
const onSubmit = form.handleSubmit(async (values) => {
  try {
    await mutateAsync(values, {
      onSuccess(data) {
        const campaign = data;
        nextTick(() => {
          navigateTo(
            `/dashboard/campaigns/choose-template?campaign=${campaign.id}`,
            { replace: true }
          );
        });
      },
    });
    form.resetForm();
  } catch (err: any) {
    error.value = err.message ?? "Something went wrong";
  }
});
</script>

<template>
  <section>
    <AppHeading :level="3" class="mb-4">New Campaign</AppHeading>

    <Card>
      <CardHeader>
        <CardTitle>Campaign details </CardTitle>
        <CardDescription
          >Create a new campaign by entering a title and slug.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel class="text-sm font-medium">
                Campaign Title
              </FormLabel>
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
                  @focus="error = null"
                />
              </FormControl>
              <FormMessage />
              <p
                v-if="error !== null"
                class="text-destructive-foreground text-sm"
              >
                {{ error }}
              </p>
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
                  @focus="error = null"
                />
              </FormControl>
              <FormMessage />
              <p
                v-if="error !== null"
                class="text-destructive-foreground text-sm"
              >
                {{ error }}
              </p>
            </FormItem>
          </FormField>

          <StatefulButton :status="status"> Create Campaign </StatefulButton>
        </form>
      </CardContent>
    </Card>
  </section>
</template>
