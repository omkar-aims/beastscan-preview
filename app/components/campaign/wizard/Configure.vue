<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { UserCircle2, Trash2, Plus, ArrowRight } from "lucide-vue-next";
import { useFieldArray, useForm } from "vee-validate";
import { applyTokens } from "@/utils";
import { Vibrant } from "node-vibrant/browser";

import z from "zod";
const emit = defineEmits(["done", "extract-color"]);

const props = defineProps<{
  theme: string;
}>();

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
    lastName: z.string().nonempty("First name is required"),
    note: z.string().nonempty("Note is required"),

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

const profileImage = ref<null | string>(null);

const showProfileError = ref<boolean>(false);
const showCoverError = ref<boolean>(false);

const onSubmit = handleSubmit((values) => {
  if (profileImage.value) {
    showProfileError.value = false;
  } else {
    showProfileError.value = true;
    return;
  }
  if (coverImage.value) {
    showCoverError.value = false;
  } else {
    showCoverError.value = true;
    return;
  }

  const template = props.theme;

  const tokenData = {
    TITLE: `${values.firstName} ${values.lastName}`,
    TEXT: values.note,
    PROFILE_IMAGE: profileImage.value,
    BANNER_IMAGE: coverImage.value,
    PRIMARY_BUTTON: values.primaryButton,
    SECONDARY_BUTTON: values.secondaryButton,
    SOCIAL_LINKS: JSON.stringify(values.socialLinks || []),
  };

  const finalTemplate = applyTokens(template, tokenData);

  emit("done", finalTemplate);
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

const coverImage = ref<null | string>(null);

watch(coverImage, async (cover) => {
  if (!cover) return;

  const imageSrc = cover.startsWith("data:image")
    ? URL.createObjectURL(await (await fetch(cover)).blob())
    : cover;

  const p = await Vibrant.from(imageSrc).getPalette();

  const pick = (...keys) => {
    for (const key of keys) if (p[key]?.hex) return p[key].hex;
    return "#000";
  };

  const pairsRaw = [
    [pick("Vibrant"), pick("LightVibrant", "Muted")],
    [pick("DarkVibrant"), pick("Vibrant")],
    [pick("Muted"), pick("DarkMuted", "Muted")],
    [pick("LightMuted", "Muted"), pick("Muted", "Vibrant")],
  ];

  const finalPalettes = pairsRaw.map(([primary, secondary], i) => ({
    name: `Auto ${i + 1}`,
    colors: [primary, secondary],
  }));

  emit("extract-color", finalPalettes);
});

const profileRef = useTemplateRef("profileRef");
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <CardContent class="space-y-6">
        <div class="space-y-4">
          <div v-if="profileImage" class="flex justify-center">
            <div
              class="relative flex h-40 w-40 items-center justify-center rounded-full border border-border bg-background shadow-sm"
            >
              <Avatar class="h-full w-full">
                <AvatarImage :src="profileImage" class="object-cover" />
                <AvatarFallback class="flex items-center justify-center">
                  <UserCircle2 class="h-16 w-16 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div class="space-y-2">
            <ImageUpload
              ref="profileRef"
              @select="(image) => (profileImage = image)"
            >
              <span class="block text-sm font-medium text-foreground">
                Profile Image
              </span>
            </ImageUpload>

            <p
              v-if="showProfileError"
              class="mt-1 text-center text-sm font-medium text-destructive"
            >
              Profile image is required
            </p>
          </div>
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
      <CardHeader>
        <CardTitle>Cover Image</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6 w-full">
        <div class="space-y-4">
          <div v-if="coverImage" class="w-full">
            <div
              class="relative h-48 w-full overflow-hidden rounded-md border border-border bg-muted shadow-sm"
            >
              <NuxtImg
                :src="coverImage"
                class="h-full w-full object-cover"
                alt="Cover Image"
              />
            </div>
          </div>

          <div class="space-y-2">
            <span class="block text-sm font-medium text-foreground">
              Cover Image
            </span>

            <ImageUpload
              :aspect-ratio="3 / 1"
              @select="(image) => (coverImage = image)"
            />

            <p
              v-if="showCoverError"
              class="mt-1 text-center text-sm font-medium text-destructive"
            >
              Cover image is required
            </p>
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
