<script setup lang="ts">
import { TrendingUp, TrendingDown } from "lucide-vue-next";

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
          <p class="text-2xl font-bold">
            <AnimatedCounter :value="Number(value)" />
          </p>
        </div>

        <div
          v-if="props.trend"
          :class="[
            'flex items-center gap-2',
            props.trendDirection === 'up' ? 'text-success' : 'text-destructive',
          ]"
        >
          <TrendingUp v-if="props.trendDirection === 'up'" class="text-xl" />
          <TrendingDown v-else class="text-xl" />
          <span class="text-lg font-semibold">{{ props.trend }}</span>
        </div>
      </AppRow>
    </CardContent>
  </Card>
</template>
