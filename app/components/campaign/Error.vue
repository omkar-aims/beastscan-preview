<script setup lang="ts">
import { ServerCrash } from "lucide-vue-next";
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <ServerCrash class="w-12 h-12" />
      </EmptyMedia>
      <EmptyTitle>Unable to Fetch Campaigns</EmptyTitle>
      <EmptyDescription>
        Something went wrong while fetching campaigns. This might be a server
        issue. Please try again later.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
