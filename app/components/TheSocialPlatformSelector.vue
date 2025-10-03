<script setup lang="ts">
const socialNetworks = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Twitter", value: "twitter" },
  { label: "Xing", value: "xing" },
  { label: "Behance", value: "behance" },
  { label: "Snapchat", value: "snapchat" },
  { label: "YouTube", value: "youtube" },
  { label: "Webpage", value: "webpage" },
  { label: "Pinterest", value: "pinterest" },
  { label: "Location", value: "location" },
  { label: "Email", value: "email" },
  { label: "Telegram", value: "telegram" },
  { label: "TikTok", value: "tiktok" },
  { label: "Viber", value: "viber" },
  { label: "WeChat", value: "wechat" },
];
</script>

<template>
  <Select>
    <SelectTrigger class="w-52">
      <SelectValue placeholder="Choose Platform" />
    </SelectTrigger>
    <SelectContent class="h-52">
      <SelectItem
        v-for="network in socialNetworks"
        :key="network.value"
        :value="network.value"
      >
        {{ network.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
