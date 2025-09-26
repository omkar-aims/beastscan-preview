<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

useHead({
  title: "Import Leads",
});

const activeTab = ref<"csv" | "manual">("csv")
const transitionName = ref("slide-left")

// File upload validation
const fileError = ref("")
const selectedFile = ref<File | null>(null)

const validateFile = (event: Event) => {
  fileError.value = ""
  selectedFile.value = null

  const target = event.target as HTMLInputElement
  const file: File | undefined = target.files?.[0]   // <-- safe access

  if (!file) {
    fileError.value = "No file selected."
    return
  }

  const maxSize = 2 * 1024 * 1024 // 2MB

  if (!file.name.toLowerCase().endsWith(".csv")) {
    fileError.value = "Only CSV files are allowed."
    return
  }
  if (file.size > maxSize) {
    fileError.value = "File size must be less than 2MB."
    return
  }

  selectedFile.value = file
}

const handleTabChange = (tab: "csv" | "manual") => {
  transitionName.value = tab === "csv" ? "slide-right" : "slide-left"
  activeTab.value = tab
}
</script>
<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Import Leads</h1>

    <!-- Tab Buttons -->
    <div class="flex gap-4 mb-6">
      <Button
        :variant="activeTab === 'csv' ? 'default' : 'outline'"
        class="w-40"
        @click="handleTabChange('csv')"
      >
        Import CSV File
      </Button>
      <Button
        :variant="activeTab === 'manual' ? 'default' : 'outline'"
        class="w-40"
        @click="handleTabChange('manual')"
      >
        Add Manually
      </Button>
    </div>

    <!-- Animated Forms with Dynamic Height -->
    <div class="relative overflow-hidden"> <!-- ✅ hide scrollbars -->
      <transition :name="transitionName" mode="out-in">
        <!-- CSV Upload Form -->
        <Card v-if="activeTab === 'csv'" key="csv" class="transition-card">
          <CardContent class="p-6 space-y-4">
            <div>
              <Label class="mb-2">Choose your CSV file</Label>
              <Input type="file" accept=".csv" class="mb-2" @change="validateFile" />
              <p class="text-sm text-muted-foreground ml-1">
                Make sure your file includes at least name and email columns and is less than 2MB.
              </p>
              <p v-if="fileError" class="text-red-500 text-sm mt-1">
                {{ fileError }}
              </p>
            </div>

            <div>
              <Label class="mb-2">Assign Tags (optional)</Label>
              <Input placeholder="e.g. Summer, Burger, QR" />
            </div>

            <div>
              <Label class="mb-2">Source/Campaign Name (optional)</Label>
              <Input placeholder="e.g. Summer Giveaway" />
            </div>

            <Button class="w-full" :disabled="!!fileError || !selectedFile">
              Upload & Import
            </Button>
          </CardContent>
        </Card>

        <!-- Manual Add Form -->
        <Card v-else key="manual" class="transition-card">
          <CardContent class="p-6 space-y-4">
            <div>
              <Label class="mb-2">Full Name</Label>
              <Input placeholder="Jane Doe" />
            </div>

            <div>
              <Label class="mb-2">Email</Label>
              <Input placeholder="jane@example.com" />
            </div>

            <div>
              <Label class="mb-2">Tags</Label>
              <Input placeholder="e.g. Newsletter, VIP" />
            </div>

            <div>
              <Label class="mb-2">Source</Label>
              <Input placeholder="e.g. Opt-in Form" />
            </div>

            <Button class="w-full bg-primary">
              Add Lead
            </Button>
          </CardContent>
        </Card>
      </transition>
      <div class="mt-4">
        <NuxtLink to="/dashboard/leads">
          <Button>Back To Leads</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure cards don’t trigger scrollbars */
.transition-card {
  width: 100%;
  overflow: hidden;
}

/* Slide left */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
  position: relative;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide right */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
  
