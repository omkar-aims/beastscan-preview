<script setup lang="ts">
interface Props {
  label: string;
  value: number | string;
  trend?: string;
  trendDirection?: "up" | "down";
}

const props = defineProps<Props>();
</script>

<template>
  <Card>
    <CardContent>
      <AppRow direction="horizontal" class="items-center justify-between">
        <div>
          <p class="text-sm text-muted-foreground">
            {{ props.label }}
          </p>
          <p class="text-2xl font-bold">{{ props.value }}</p>
        </div>

        <div
          v-if="props.trend"
          :class="[
            'flex items-center gap-2',
            props.trendDirection === 'up'
              ? 'text-success-foreground'
              : 'text-destructive-foreground',
          ]"
        >
          <Icon
            v-if="props.trendDirection === 'up'"
            name="lucide:trending-up"
            class="text-xl"
          />
          <Icon v-else name="lucide:trending-down" class="text-xl" />
          <span class="text-lg font-semibold">{{ props.trend }}</span>
        </div>
      </AppRow>
    </CardContent>
  </Card>
</template>
