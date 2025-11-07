<script setup lang="ts">
import { Plus, Megaphone } from "lucide-vue-next";
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Megaphone class="w-12 h-12" />
      </EmptyMedia>
      <EmptyTitle>No Campaigns Yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any campaigns yet. Start one to track scans,
        feedback, and engagement.
      </EmptyDescription>
    </EmptyHeader>

    <EmptyContent>
      <NuxtLink href="/dashboard/campaigns/new">
        <Button> <Plus class="mr-2 h-4 w-4" /> Lunch New Campaign </Button>
      </NuxtLink>
    </EmptyContent>
  </Empty>
</template>
