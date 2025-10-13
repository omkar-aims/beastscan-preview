<script setup lang="ts">
const props = defineProps<{
  nextStep: () => void;
}>();

const builderStore = useBuilderStore();
builderStore.open();
builderStore.setAction(props.nextStep);

onUnmounted(() => {
  builderStore.close();
});

const vCardStore = useNewVCardStore();
</script>

<template>
  <TheBuilder
    :source="`https://bw.aimsinfosoft.com/beast-builder/?template=${vCardStore.vcard.templateName}`"
  />
</template>
