<script setup lang="ts">
import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import type { CampaignType } from "~/types/campaign";

const props = defineProps<{
  handleSubmit: (formData: Record<string, string>) => void;
  formSchema: ZodObjectOrWrapped;
  type: CampaignType;
}>();

const showPreview = computed(() => {
  return props.type === "Form" || props.type === "Digital Business Card";
});
</script>

<template>
  <div
    :class="[showPreview ? 'grid grid-cols-[1fr_25%] gap-6 items-start' : '']"
  >
    <Card>
      <CardContent>
        <AutoForm
          keep-values
          class="space-y-6"
          :schema="formSchema"
          @submit="handleSubmit"
        >
          <Button type="submit" class="flex items-center gap-2">
            <span>Continue</span>
            <Icon name="lucide:chevron-right" />
          </Button>

          <template v-if="type === 'Form'">
            <div class="mt-4 text-sm text-muted-foreground">
              Don't see the form you're looking for?
              <AppLink to="/dashboard/forms/new"> Create a new form </AppLink>
            </div>
          </template>

          <template v-if="type === 'Digital Business Card'">
            <div class="mt-4 text-sm text-muted-foreground">
              Want a new digital business card?
              <AppLink to="/dashboard/pages/vcard/new">
                Create one now
              </AppLink>
            </div>
          </template>
        </AutoForm>
      </CardContent>
    </Card>

    <PhonePreview
      v-if="showPreview"
      src="https://files.jotform.com/jotformapps/lead-capture-form-dde416f59c804b9d693d09e0da962a7c-classic.png"
    />
  </div>
</template>
