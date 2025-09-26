<script setup lang="ts">
import { ref } from "vue"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

const groupName = ref("")

function saveGroup() {
  if (!groupName.value.trim()) return
  // Here you can call API or emit event
  console.log("New Group:", groupName.value)
  groupName.value = ""
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-lg font-semibold">Create New Group</CardTitle>
      </CardHeader>

      <CardContent>
        <div class="space-y-2">
          <label for="group-name" class="text-sm font-medium">Group Name</label>
          <Input
            id="group-name"
            v-model="groupName"
            type="text"
            placeholder="Enter group name"
            class="w-full"
          />
        </div>
      </CardContent>

      <CardFooter class="flex justify-end">
        <Button @click="saveGroup" :disabled="!groupName.trim()">
          Save
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
