<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { UserCircle2, Camera, Trash2, Plus, ArrowRight } from "lucide-vue-next";
import { useForm } from "vee-validate";
import z from "zod";

const socialLinks = ref([{ platform: "", url: "" }]);

function addLink() {
  socialLinks.value.push({ platform: "", url: "" });
}

function removeLink(index: number) {
  socialLinks.value.splice(index, 1);
}

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

    organization: z.string().optional(),
    role: z.string().optional(),

    telephone1: z
      .string()
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
    telephone2: z
      .string()
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
    email: z.string().optional(),
    url: z.string().optional(),

    street: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })
);

const defaultValues = {
  firstName: "",
  lastName: "",
  note: "",

  organization: "",
  role: "",

  telephone1: "",
  telephone2: "",
  email: "",
  url: "",

  street: "",
  country: "",
  zip: "",
  city: "",
  state: "",

  socialLinks: [{ platform: "", url: "" }],
};

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: defaultValues,
});

const onSubmit = handleSubmit((values) => {
  emit("done", values);
});
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
                @change="handleSelect"
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
        <CardTitle>Company</CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="organization">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter company name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="role">
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter job role or position"
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
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="telephone1">
              <FormItem>
                <FormLabel>Telephone 1</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter phone number"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="telephone2">
              <FormItem>
                <FormLabel>Telephone 2</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter alternate phone number"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter email address"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="url">
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter website URL"
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
        <CardTitle>Address</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2 md:col-span-2">
            <FormField v-slot="{ componentField }" name="street">
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter street address"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="country">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter your country"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="zip">
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter postal/zip code"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="city">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter your city"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col space-y-2">
            <FormField v-slot="{ componentField }" name="state">
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    class="bg-card w-full"
                    placeholder="Enter your state/region"
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
        <CardTitle>Social Links</CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <div class="space-y-4">
          <template v-for="(link, index) in socialLinks" :key="index">
            <div
              class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2"
            >
              <TheSocialPlatformSelector />

              <Input
                v-model="link.url"
                class="flex-1 bg-card w-full"
                placeholder="Paste social profile link"
              />

              <Button
                variant="destructive"
                size="sm"
                type="button"
                @click="removeLink(index)"
              >
                <Trash2 />
              </Button>
            </div>
          </template>

          <Button type="button" @click="addLink">
            <Plus />
            <span>Add New</span>
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
  </form>
</template>
