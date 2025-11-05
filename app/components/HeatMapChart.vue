<script setup lang="ts">
import { VisSingleContainer, VisTopoJSONMap } from "@unovis/vue";
import { WorldMapTopoJSON } from "@unovis/ts/maps";

const countryCodes = [
  "AU",
  "BR",
  "CN",
  "EG",
  "FR",
  "IN",
  "JP",
  "MX",
  "NO",
  "PE",
  "PH",
  "RU",
  "TZ",
  "US",
];
const areaData = countryCodes.map((id) => ({ id }));
const data = { areas: areaData };
</script>

<template>
  <VisSingleContainer>
    <VisTopoJSONMap
      :data="data"
      :topojson="WorldMapTopoJSON"
      area-color="#adb5bd"
    />
  </VisSingleContainer>
</template>
