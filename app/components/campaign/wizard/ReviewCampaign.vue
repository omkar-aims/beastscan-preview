<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { useCreateCampaign } from "~/composables/campaign/useCreateCampaign";
import type { Campaign } from "~/types/campaign";

const props = defineProps<{
  modelValue: Campaign;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Campaign): void;
}>();

const campaign = reactive({ ...props.modelValue });

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      campaignName: z.string({ required_error: "Campaign name is required" }),
    })
  ),
});

const { mutate: createCampaign, status } = useCreateCampaign();

const onSubmit = handleSubmit((value) => {
  emit("update:modelValue", { ...campaign, name: value.campaignName });
  createCampaign({ ...campaign, name: value.campaignName });
});
</script>

<template>
  <div v-motion-slide-bottom class="grid md:grid-cols-[1fr_30%] gap-8">
    <div class="space-y-4">
      <AppHeading :level="3">
        🎉 Congratulations! Your campaign is ready
      </AppHeading>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="campaignName">
          <FormItem class="grid gap-2">
            <FormLabel>Enter a name for your campaign</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="My Awesome Campaign"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <StatefulButton :status="status"> Finish </StatefulButton>
      </form>
    </div>

    <AppRow>
      <Card class="self-baseline w-full gap-2">
        <CardContent class="p-0 mx-auto">
          <QRCodeCanvas :options="modelValue.qrOption" />
        </CardContent>
      </Card>

      <AppRow direction="horizontal">
        <QRDownloadButton
          :title="campaign.name"
          :qr-options="campaign.qrOption"
        >
          <Button variant="outline" class="flex-1">
            <Icon name="lucide:download" />
            <span class="hidden lg:inline">Download</span>
          </Button>
        </QRDownloadButton>
      </AppRow>
    </AppRow>
  </div>
</template>
