<script setup lang="ts">
defineProps<{
  handleSelect: (name: string) => void;
}>();

const templates = [
  {
    id: 1,
    name: "section-lead-1",
    imageUrl: "./templates/forms/form-01.png",
  },

  {
    id: 2,
    name: "section-lead-2",
    imageUrl: "./templates/forms/form-02.png",
  },
];

const selectTemplateType = ref<string>("lead-capture");
</script>

<template>
  <AppRow gap="md">
    <Select v-model="selectTemplateType">
      <SelectTrigger>
        <SelectValue placeholder="Choose a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lead-capture"> Lead Capture </SelectItem>
        <SelectItem value="feedback"> Feedback </SelectItem>
        <SelectItem value="survery"> Survery </SelectItem>
        <SelectItem value="offers"> Offers </SelectItem>
      </SelectContent>
    </Select>
    <CampaignTemplatePicker
      :handle-select-template="handleSelect"
      :templates="templates"
    />
  </AppRow>
</template>
