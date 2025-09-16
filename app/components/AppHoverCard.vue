<script setup lang="ts">
defineProps<{
  title: string;
  desc?: string;
  icon?: string;
  preview?: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Card class="cursor-pointer" @click="$emit('update:modelValue', title)">
        <CardHeader class="flex items-center gap-4">
          <Icon v-if="icon" :name="icon" class="text-3xl text-primary" />
          <div>
            <CardTitle class="mb-0.5">{{ title }}</CardTitle>
            <CardDescription v-if="desc">{{ desc }}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </HoverCardTrigger>

    <HoverCardContent>
      <NuxtImg :src="preview" class="rounded-lg shadow-md" />
    </HoverCardContent>
  </HoverCard>
</template>
