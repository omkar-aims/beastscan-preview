<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import {
  UserCircle2,
  Camera,
  Trash2,
  Plus,
  ArrowRight,
  Image,
} from "lucide-vue-next";
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
const { handleFileInput, files } = useFileStorage({ clearOldFiles: false });
const { handleFileInput: handleCoverImage, files: coverFiles } = useFileStorage(
  { clearOldFiles: false }
);

const showProfileError = ref<boolean>(false);
const showCoverError = ref<boolean>(false);

const onSubmit = handleSubmit((values) => {
  const profileImage = files.value[0]?.content || "";
  const coverImage = selectedCover.value;

  if (profileImage) {
    showProfileError.value = false;
  } else {
    showProfileError.value = true;
    return;
  }
  if (coverImage) {
    showCoverError.value = false;
  } else {
    showCoverError.value = true;
    return;
  }

  const template = props.theme;

  const tokenData = {
    TITLE: `${values.firstName} ${values.lastName}`,
    TEXT: values.note,
    PROFILE_IMAGE: profileImage,
    BANNER_IMAGE: coverImage,
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

const showCoverGallery = ref<boolean>(false);
const selectedCover = ref<null | string>(null);

watch(
  () => coverFiles.value.at(0),
  (file) => {
    selectedCover.value = file?.content ?? "";
  }
);

const runtimeConfig = useRuntimeConfig();
function chooseFromGallery(path: string) {
  selectedCover.value = `${runtimeConfig.public.previewBase}${path}`;
  coverFiles.value = [];
}

watch(selectedCover, async (cover) => {
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
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <CardContent class="space-y-6">
        <div class="flex flex-col items-center space-y-4">
          <FileUpload
            v-slot="{ file, handleSelect, isFresh }"
            class="flex flex-col items-center gap-1"
          >
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
            <p
              v-if="showProfileError"
              class="text-sm font-medium text-destructive"
            >
              Please upload profile image
            </p>
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
      <CardHeader>
        <CardTitle>Cover Image</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6 w-full">
        <FileUpload>
          <div class="relative w-full h-48 rounded-md overflow-hidden">
            <label
              for="cover-upload"
              class="cursor-pointer flex items-center justify-center w-full h-full rounded-md border-2 hover:bg-muted transition-all duration-200 border-dashed overflow-hidden relative"
              :class="
                selectedCover
                  ? 'border-transparent'
                  : 'border-muted-foreground/50'
              "
            >
              <NuxtImg
                v-if="selectedCover"
                :key="selectedCover"
                :src="selectedCover"
                class="w-full h-full object-cover absolute inset-0"
                alt="Cover Preview"
              />

              <div
                v-if="!selectedCover"
                class="w-full h-full flex flex-col items-center justify-center text-card-foreground space-y-2"
              >
                <Image class="w-10 h-10 stroke-1" />
                <span class="text-sm">Upload Cover Image</span>
              </div>

              <span
                class="absolute bottom-2 right-2 rounded-full p-1.5 w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center shadow-xs hover:bg-primary/90 transition-colors duration-200"
              >
                <Camera class="w-4 h-4" />
              </span>
            </label>

            <Input
              id="cover-upload"
              type="file"
              accept="image/*"
              class="hidden"
              @change="
                (e: Event) => {
                  handleCoverImage(e);
                }
              "
            />
          </div>

          <p
            v-if="showCoverError"
            class="mt-1 text-center text-sm font-medium text-destructive"
          >
            Please upload cover image
          </p>
        </FileUpload>

        <div class="flex justify-center">
          <Button variant="link" type="button" @click="showCoverGallery = true">
            Choose from gallery
          </Button>
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

    <Teleport v-if="showCoverGallery" to="body">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div
          class="relative bg-background h-[90vh] max-h-[500px] w-3xl rounded-lg overflow-hidden p-6"
        >
          <h2 class="text-lg font-semibold mb-4">
            Choose Cover Image or Gradient
          </h2>

          <div
            class="grid grid-cols-2 gap-4 overflow-y-auto max-h-[360px] px-2 pb-6"
          >
            <div v-for="t in 2" :key="'cover-' + t" class="cursor-pointer">
              <NuxtImg
                :src="`/banners/0${t}.webp`"
                class="w-full h-auto rounded-md hover:opacity-90 transition ring-2"
                :class="
                  selectedCover ===
                  `${runtimeConfig.public.previewBase}banners/0${t}.webp`
                    ? 'ring-primary'
                    : 'ring-transparent'
                "
                @click="chooseFromGallery(`banners/0${t}.webp`)"
              />
            </div>

            <div v-for="t in 3" :key="'gradient-' + t" class="cursor-pointer">
              <NuxtImg
                :src="`/gradients/0${t}.png`"
                class="w-full h-auto rounded-md hover:opacity-90 transition ring-2"
                :class="
                  selectedCover ===
                  `${runtimeConfig.public.previewBase}gradients/0${t}.png`
                    ? 'ring-primary'
                    : 'ring-transparent'
                "
                @click="chooseFromGallery(`gradients/0${t}.png`)"
              />
            </div>
          </div>

          <div class="absolute bottom-4 right-4 flex gap-3">
            <Button variant="outline" @click="showCoverGallery = false"
              >Cancel</Button
            >
            <Button @click="showCoverGallery = false">Confirm</Button>
          </div>
        </div>
      </div>
    </Teleport>
  </form>
</template>
