<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { UserCircle2, Camera, Trash2, Plus, ArrowRight } from "lucide-vue-next";
import { useFieldArray, useForm } from "vee-validate";
import z from "zod";

const emit = defineEmits(["done"]);

const socialLinkSchema = z.object({
  platform: z.string().nonempty("Please select a platform"),
  url: z
    .string()
    .nonempty("URL is required")
    .url("Please enter a valid URL (include https://)"),
});

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().optional(),
    note: z.string().optional(),

    socialLinks: z
      .array(socialLinkSchema)
      .min(1, "At least one social link is required"),

    primaryButton: z.string().nonempty("Primary button is required"),
    secondaryButton: z.string().nonempty("Secondary button is required"),
  })
);

const defaultValues = {
  firstName: "",
  lastName: "",
  note: "",

  socialLinks: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/yourpage",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/yourpage",
    },
    {
      platform: "x",
      url: "https://www.x.com/yourpage",
    },
  ],
};

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: defaultValues,
});

const { fields, remove, push } = useFieldArray("socialLinks");
const { handleFileInput, files } = useFileStorage({ clearOldFiles: false });

const onSubmit = handleSubmit((values) => {
  emit("done", {
    ...values,
    profileImage: files.value[0]?.content,
  });
});

const socialNetworks = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Twitter", value: "twitter" },
  { label: "Xing", value: "xing" },
  { label: "Behance", value: "behance" },
  { label: "Snapchat", value: "snapchat" },
  { label: "YouTube", value: "youtube" },
  { label: "Webpage", value: "webpage" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Location", value: "location" },
  { label: "Email", value: "email" },
  { label: "Telegram", value: "telegram" },
  { label: "TikTok", value: "tiktok" },
  { label: "Viber", value: "viber" },
  { label: "WeChat", value: "wechat" },
  { label: "X", value: "x" },
];
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <CardContent class="space-y-6">
        <div class="flex flex-col items-center space-y-4">
          <FileUpload v-slot="{ file, handleSelect, isFresh }">
            <div class="relative inline-block">
              <label
                for="profile-upload"
                class="cursor-pointer flex items-center justify-center w-32 h-32 rounded-full transition-colors transform border-2 border-dashed border-card-foreground"
              >
                <Avatar class="w-32 h-32 relative overflow-hidden">
                  <AvatarImage
                    v-if="file"
                    :key="file"
                    :src="file"
                    alt="Profile Preview"
                    class="w-full h-full object-cover absolute top-0 left-0"
                  />

                  <AvatarFallback
                    v-if="!file"
                    class="flex items-center justify-center text-card-foreground w-full h-full absolute top-0 left-0"
                  >
                    <UserCircle2 class="w-12 h-12 stroke-1" />
                  </AvatarFallback>
                </Avatar>

                <span
                  class="absolute bottom-1 right-1 rounded-full p-1.5 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center shadow-xs hover:bg-primary/90 transition-colors duration-200"
                >
                  <Camera />
                </span>

                <div
                  v-if="isFresh"
                  class="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-border pointer-events-none"
                />
              </label>

              <Input
                id="profile-upload"
                type="file"
                accept="image/*"
                class="hidden"
                @change="(e : Event) => {
                  handleFileInput(e)
                  handleSelect(e)
                }"
              />
            </div>
          </FileUpload>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter first name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter last name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <FormField v-slot="{ componentField }" name="note">
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  class="bg-card w-full"
                  placeholder="Add a note or description..."
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </CardContent>

      <Separator />

      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <div class="space-y-4">
          <template v-for="(field, index) in fields" :key="field.key">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <FormField
                v-slot="{ componentField }"
                :name="`socialLinks.${index}.platform`"
              >
                <FormItem class="w-full md:w-xs">
                  <FormControl>
                    <Select v-bind="componentField">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Choose Platform" />
                      </SelectTrigger>
                      <SelectContent class="h-52">
                        <SelectItem
                          v-for="network in socialNetworks"
                          :key="network.value"
                          :value="network.value"
                        >
                          {{ network.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ componentField }"
                :name="`socialLinks.${index}.url`"
              >
                <FormItem class="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Paste social profile link"
                      v-bind="componentField"
                      class="bg-card"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <Button
                variant="destructive"
                size="sm"
                type="button"
                class="shrink-0"
                @click="remove(index)"
              >
                <Trash2 />
              </Button>
            </div>
          </template>

          <Button
            type="button"
            @click="
              push({
                platform: '',
                url: '',
              })
            "
          >
            <Plus />
            <span>Add New</span>
          </Button>
        </div>
      </CardContent>

      <Separator />

      <CardHeader>
        <CardTitle>Action Buttons</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="primaryButton">
              <FormItem>
                <FormLabel>Primary Button</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Label for primary button"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="secondaryButton">
              <FormItem>
                <FormLabel>Secondary Button</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Label for secondary button"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
      </CardContent>
      <Separator />

      <CardFooter class="flex justify-end">
        <CardAction>
          <Button type="submit"
            >Continue
            <ArrowRight />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  </form>
</template>
