<script setup lang="ts">
import {
  UserCircle2,
  Camera,
  Trash2,
  Plus,
  ExternalLink,
} from "lucide-vue-next";

const socialLinks = ref([{ platform: "", url: "" }]);

function addLink() {
  socialLinks.value.push({ platform: "", url: "" });
}

function removeLink(index: number) {
  socialLinks.value.splice(index, 1);
}
</script>

<template>
  <div>
    <Tabs default-value="info">
      <TabsList>
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
      </TabsList>

      <div class="grid grid-cols-[1fr_25%] gap-6">
        <TabsContent value="info">
          <Card>
            <CardContent class="space-y-6">
              <div class="flex flex-col items-center space-y-4">
                <FileUpload v-slot="{ file, handleSelect, isFresh }">
                  <div class="relative inline-block">
                    <label
                      for="profile-upload"
                      :class="[
                        'cursor-pointer flex items-center justify-center w-32 h-32 rounded-full transition-colors transform border-2 border-dashed border-card-foreground',
                      ]"
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
                  <Label for="firstName">First Name</Label>
                  <Input id="firstName" />
                </div>
                <div class="flex flex-col space-y-2">
                  <Label for="lastName">Last Name</Label>
                  <Input id="lastName" />
                </div>
              </div>

              <div class="flex flex-col space-y-2">
                <Label for="note">Note</Label>
                <Textarea />
              </div>
            </CardContent>

            <Separator />

            <CardHeader>
              <CardTitle>Company</CardTitle>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col space-y-2">
                  <Label for="organization">Name</Label>
                  <Input id="organization" />
                </div>
                <div class="flex flex-col space-y-2">
                  <Label for="role">Role</Label>
                  <Input id="role" />
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
                  <Label for="telephone1">Telephone 1</Label>
                  <Input id="telephone1" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="telephone2">Telephone 2</Label>
                  <Input id="telephone2" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="url">Website URL</Label>
                  <Input id="url" />
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
                  <Label for="street">Street</Label>
                  <Input id="street" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="country">Country</Label>
                  <Input id="country" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="zip">Postal Code</Label>
                  <Input id="zip" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="city">City</Label>
                  <Input id="city" />
                </div>

                <div class="flex flex-col space-y-2">
                  <Label for="state">State </Label>
                  <Input id="state" />
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
                    class="flex flex-col md:flex-row md:items-center md:col-span-2 space-y-2 md:space-y-0 md:space-x-2"
                  >
                    <TheSocialPlatformSelector />
                    <Input v-model="link.url" class="flex-1" />
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
                <slot />
              </CardAction>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="style">
          <Card>
            <CardHeader>
              <CardTitle>Quick Style</CardTitle>
              <CardDescription>
                Quickly adjust the primary colors and fonts of your form.
              </CardDescription>
            </CardHeader>

            <CardContent class="space-y-6">
              <div class="space-y-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col space-y-2">
                    <span class="text-sm font-medium">Primary Color</span>
                    <AppColorPicker />
                  </div>
                  <div class="flex flex-col space-y-2">
                    <span class="text-sm font-medium">Secondary Color</span>
                    <AppColorPicker />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardContent class="space-y-6">
              <div class="space-y-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col space-y-2">
                    <span class="text-sm font-medium">Primary Font</span>
                    <FontPicker />
                  </div>
                  <div class="flex flex-col space-y-2">
                    <span class="text-sm font-medium">
                      Secondary Font
                      <span class="text-muted-foreground">(optional)</span>
                    </span>
                    <FontPicker />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter class="flex gap-4 items-center">
              <Button type="button" variant="outline">
                <ExternalLink class="w-4 h-4" />
                Open the Builder
              </Button>

              <slot />
            </CardFooter>
          </Card>
        </TabsContent>

        <PhonePreview
          src="https://media.slidesgo.com/storage/27591492/conversions/5-abstract-design-vcard-thumb.jpg"
        />
      </div>
    </Tabs>
  </div>
</template>
