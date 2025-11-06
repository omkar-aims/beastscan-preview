<script setup lang="ts">
import { VisSingleContainer, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";

type MapPoint = {
  id: string;
  latitude: number;
  longitude: number;
  color: string;
  count: number;
};

const getColorByCount = (count: number) => {
  if (count > 1000) return "#ef4444";
  if (count > 500) return "#f97316";
  if (count > 100) return "#22c55e";
  return "#3b82f6";
};

const points: MapPoint[] = [
  {
    id: "nyc",
    latitude: 40.7128,
    longitude: -74.006,
    count: 1200,
    color: getColorByCount(1200),
  },
  {
    id: "london",
    latitude: 51.5072,
    longitude: -0.1276,
    count: 520,
    color: getColorByCount(520),
  },
  {
    id: "tokyo",
    latitude: 35.6895,
    longitude: 139.6917,
    count: 220,
    color: getColorByCount(220),
  },
  {
    id: "sydney",
    latitude: -33.8688,
    longitude: 151.2093,
    count: 20,
    color: getColorByCount(20),
  },
];

const data = { points };
</script>

<template>
  <VisSingleContainer>
    <VisTopoJSONMap
      :data="data"
      :topojson="WorldMapTopoJSON"
      :point-color="(d: MapPoint) => d.color"
      :point-radius="() => 6"
      :point-label="(d: MapPoint) => d.count"
      :disable-zoom="true"
    />
  </VisSingleContainer>
</template>
