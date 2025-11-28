<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { createCampaignSchema } from "~/schemas";
import { IdCard, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-vue-next";

const emit = defineEmits(["done"]);

const form = useForm({
  validationSchema: toTypedSchema(createCampaignSchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  emit("done", values);
});

const campaignTypes = [
  {
    id: "business-card",
    title: "Digital Business Card",
    description: "Share contact details, social links, and profile info.",
    icon: IdCard,
    gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  },
  {
    id: "product-page",
    title: "Product Page",
    description: "Showcase a product with images, pricing, and CTA.",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
  },
  {
    id: "redirect",
    title: "Redirect",
    description: "Instantly redirect users to any URL or app.",
    icon: ArrowRight,
    gradient: "linear-gradient(135deg, #64748b, #475569)",
  },
];
</script>

<template>
  <div>
    <div class="space-y-6">
      <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="type">
          <FormItem>
            <FormLabel> Choose campaign type </FormLabel>

            <FormControl>
              <RadioGroup
                v-bind="componentField"
                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                <Label
                  v-for="type in campaignTypes"
                  :key="type.id"
                  :for="type.id"
                  class="group relative cursor-pointer"
                >
                  <RadioGroupItem
                    :id="type.id"
                    :value="type.id"
                    class="peer hidden"
                  />

                  <div
                    class="relative flex gap-4 p-6 h-full ring-1 rounded-lg border bg-card shadow-sm border-muted transition-all duration-200"
                    :class="
                      form.values.type === type.id
                        ? 'ring-primary'
                        : 'ring-transparent'
                    "
                  >
                    <div
                      class="shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
                      :style="{ background: type.gradient }"
                    >
                      <component :is="type.icon" class="w-4 h-4 text-white" />
                    </div>
                    <div class="space-y-1">
                      <h3 class="text-sm font-semibold leading-none">
                        {{ type.title }}
                      </h3>
                      <p class="text-sm text-muted-foreground leading-snug">
                        {{ type.description }}
                      </p>
                    </div>
                    <CheckCircle2
                      v-if="form.values.type === type.id"
                      v-motion-pop
                      class="w-6 h-6 absolute top-2 right-2 text-primary peer-data-[state=checked]:hidden"
                    />
                  </div>
                </Label>
              </RadioGroup>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Campaign Title</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Eg. My Product Launch"
                class="bg-card h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end pt-2">
          <Button>
            Continue
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
