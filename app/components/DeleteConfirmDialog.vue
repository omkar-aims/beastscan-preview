<script setup lang="ts">
import type { MutationStatus } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  handler?: () => void;
  status: MutationStatus;
}>();

const emit = defineEmits(["update:modelValue"]);

const open = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    open.value = newVal;
  }
);

watch(open, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the
          selected item(s) from our server.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div class="p-0">
          <StatefulButton
            :status="status"
            variant="destructive"
            @click="handler"
            >Yes, delete</StatefulButton
          >
        </div>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
