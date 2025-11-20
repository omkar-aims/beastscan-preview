<script setup lang="ts">
import { UserCircle2, Camera, Trash2, Plus, ArrowRight } from "lucide-vue-next";

const socialLinks = ref([{ platform: "", url: "" }]);

function addLink() {
  socialLinks.value.push({ platform: "", url: "" });
}

function removeLink(index: number) {
  socialLinks.value.splice(index, 1);
}

const emit = defineEmits(["done"]);
</script>

<template>
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
          <Label for="firstName" class="text-sm font-medium">First Name</Label>
          <Input
            id="firstName"
            class="bg-card w-full"
            placeholder="Enter first name"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="lastName" class="text-sm font-medium">Last Name</Label>
          <Input
            id="lastName"
            class="bg-card w-full"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div class="flex flex-col space-y-2">
        <Label for="note" class="text-sm font-medium">Note</Label>
        <Textarea
          class="bg-card w-full"
          placeholder="Add a note or description..."
        />
      </div>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Company</CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col space-y-2">
          <Label for="organization" class="text-sm font-medium">Name</Label>
          <Input
            id="organization"
            class="bg-card w-full"
            placeholder="Enter company name"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="role" class="text-sm font-medium">Role</Label>
          <Input
            id="role"
            class="bg-card w-full"
            placeholder="Enter job role or position"
          />
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
          <Label for="telephone1" class="text-sm font-medium"
            >Telephone 1</Label
          >
          <Input
            id="telephone1"
            class="bg-card w-full"
            placeholder="Enter phone number"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="telephone2" class="text-sm font-medium"
            >Telephone 2</Label
          >
          <Input
            id="telephone2"
            class="bg-card w-full"
            placeholder="Enter alternate phone number"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="email" class="text-sm font-medium">Email</Label>
          <Input
            id="email"
            class="bg-card w-full"
            placeholder="Enter email address"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="url" class="text-sm font-medium">Website URL</Label>
          <Input
            id="url"
            class="bg-card w-full"
            placeholder="Enter website URL"
          />
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
          <Label for="street" class="text-sm font-medium">Street</Label>
          <Input
            id="street"
            class="bg-card w-full"
            placeholder="Enter street address"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="country" class="text-sm font-medium">Country</Label>
          <Input
            id="country"
            class="bg-card w-full"
            placeholder="Enter your country"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="zip" class="text-sm font-medium">Postal Code</Label>
          <Input
            id="zip"
            class="bg-card w-full"
            placeholder="Enter postal/zip code"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="city" class="text-sm font-medium">City</Label>
          <Input
            id="city"
            class="bg-card w-full"
            placeholder="Enter your city"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <Label for="state" class="text-sm font-medium">State</Label>
          <Input
            id="state"
            class="bg-card w-full"
            placeholder="Enter your state/region"
          />
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
        <Button @click="emit('done')"
          >Continue
          <ArrowRight />
        </Button>
      </CardAction>
    </CardFooter>
  </Card>
</template>
