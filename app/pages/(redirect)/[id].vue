<script setup lang="ts">
import type { Campaign } from "~/types/campaign";

const apiRoutes = useApiRoutes();
const route = useRoute();

const uniqueKey = route.params.id as string;

definePageMeta({
  layout: false,
});

const { data: campaigns } = await useFetch<Campaign[]>(apiRoutes.campaigns);

const campaign = campaigns.value?.find((c) => c.url.includes(uniqueKey));

if (!campaign)
  throw createError({
    statusCode: 404,
    statusMessage: "Campaign Not Found",
  });

onMounted(() => {
  if (campaign) {
    switch (campaign.type.toLowerCase()) {
      case "website":
        navigateTo(campaign.config.url, {
          external: true,
        });
        break;

      case "email":
        navigateTo(
          `mailto:${campaign.config.email}?subject=${encodeURIComponent(
            campaign.config.subject || ""
          )}&body=${encodeURIComponent(campaign.config.body || "")}`,
          {
            external: true,
          }
        );
        break;

      case "sms":
        navigateTo(
          `sms:${campaign.config.phone}?body=${encodeURIComponent(
            campaign.config.message || ""
          )}`,
          {
            external: true,
          }
        );
        break;
      case "call":
        navigateTo(`tel:${campaign.config.phone}`, {
          external: true,
        });
        break;
    }
  }
});
</script>

<template>
  <div class="w-dvw min-h-dvh flex justify-center items-center">
    <div class="max-w-sm">
      <div class="flex flex-col items-center">
        <div class="loader my-6" />
        <AppHeading :level="3">Hang On!</AppHeading>
        <p class="text-muted-foreground">
          You are being redirected to another page.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  position: relative;
  --c: no-repeat linear-gradient(var(--color-primary));
  background: var(--c) center/100% 10px, var(--c) center/10px 100%;
}
.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--c) 0 0, var(--c) 100% 0, var(--c) 0 100%, var(--c) 100% 100%;
  background-size: 15.5px 15.5px;
  animation: l16 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}
@keyframes l16 {
  33% {
    inset: -10px;
    transform: rotate(0deg);
  }
  66% {
    inset: -10px;
    transform: rotate(90deg);
  }
  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}
</style>
