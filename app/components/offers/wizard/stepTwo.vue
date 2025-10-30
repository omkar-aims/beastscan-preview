<script setup lang="ts">
import { CloudUpload } from 'lucide-vue-next';

</script>
<template>
  <Card class="p-6 space-y-8">
    <!-- Image Upload Section -->
    <div>
      <h2 class="text-lg font-semibold text-primary mb-4">Images</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Cover Image Upload -->
        <div>
          <h3 class="text-sm font-medium  mb-2">Cover Image</h3>
          <FileUpload v-slot="{ file, handleSelect, isFresh }">
            <div class="flex flex-col gap-4">
              <div
                class="relative w-full h-40 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="handleSelect"
                />
                <div
                  class="flex flex-col items-center justify-center pointer-events-none"
                >
                  <CloudUpload
                    class="w-8 h-8 mb-2 "
                  />
                  <p class="text-sm text-muted-foreground">
                    Click or drag and drop to upload
                  </p>
                </div>
                <div v-if="file" class="absolute inset-0">
                  <img
                    :src="file"
                    alt="Uploaded Image"
                    class="object-cover w-full h-full rounded-md"
                    :class="{ 'border-4 border-primary': isFresh }"
                  />
                </div>
              </div>
              <p class="text-xs text-muted-foreground">
                Supported: JPG, PNG, GIF • Max size: 5MB
              </p>
            </div>
          </FileUpload>
        </div>

        <!-- Gallery Images Upload -->
        <div>
          <h3 class="text-sm font-medium  mb-2">
            Gallery Images (Optional)
          </h3>
          <FileUpload v-slot="{ file, handleSelect, isFresh }">
            <div class="flex flex-col gap-4">
              <div
                class="relative w-full h-40 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="handleSelect"
                />
                <div
                  class="flex flex-col items-center justify-center pointer-events-none"
                >
                  <CloudUpload 
                    class="w-8 h-8 mb-2 "
                  />
                  <p class="text-sm text-muted-foreground">
                    Upload multiple images
                  </p>
                </div>
                <div v-if="file" class="absolute inset-0">
                  <img
                    :src="file"
                    alt="Uploaded Image"
                    class="object-cover w-full h-full rounded-md"
                    :class="{ 'border-4 border-primary': isFresh }"
                  />
                </div>
              </div>
              <p class="text-xs text-muted-foreground">
                You can upload multiple images.
              </p>
            </div>
          </FileUpload>
        </div>
      </div>
    </div>

    <!-- Social Media Section -->
    <div>
      <h2 class="text-lg font-semibold text-primary mb-4">
        Social Media Links
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-1.5">
          <Label>Twitter</Label>
          <Input placeholder="Enter Twitter URL" />
        </div>

        <div class="flex flex-col gap-1.5">
          <Label>Facebook</Label>
          <Input placeholder="Enter Facebook URL" />
        </div>

        <div class="flex flex-col gap-1.5">
          <Label>Instagram</Label>
          <Input placeholder="Enter Instagram URL" />
        </div>

        <div class="flex flex-col gap-1.5">
          <Label>LinkedIn</Label>
          <Input placeholder="Enter LinkedIn URL" />
        </div>
      </div>

      <div class="mt-6">
        <Button class="bg-primary text-white hover:bg-primary/90">
          Finish
        </Button>
      </div>
    </div>
  </Card>
</template>
