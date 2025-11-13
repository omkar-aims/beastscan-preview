<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { Copy, CopyCheck } from "lucide-vue-next";
const props = defineProps<{
  linkToCopy: string;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const { copy, copied, isSupported } = useClipboard();
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
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md bg-card">
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
        <DialogDescription>
          Share this campaign with your audience
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only"> Link </Label>
          <Input
            id="link"
            :default-value="linkToCopy"
            read-only
            class="bg-card"
          />
        </div>
        <Button :disabled="!isSupported" size="icon" @click="copy(linkToCopy)">
          <span class="sr-only">Copy</span>

          <Copy v-if="!copied" v-motion-pop />
          <CopyCheck v-if="copied" v-motion-pop />
        </Button>
      </div>

      <div
        class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
      >
        <span class="relative z-10 bg-card px-2 text-muted-foreground">
          Or share on
        </span>
      </div>

      <div class="flex flex-row justify-between gap-2">
        <Button
          variant="ghost"
          class="flex-1 gap-2 hover:bg-primary/20 hover:text-card-foreground"
        >
          <Icon name="logos:facebook" class="h-4 w-4" />
          <span class="hidden sm:inline">Facebook</span>
        </Button>
        <Button
          variant="ghost"
          class="flex-1 gap-2 hover:bg-primary/20 hover:text-card-foreground"
        >
          <Icon name="logos:twitter" class="h-4 w-4" />
          <span class="hidden sm:inline">Twitter</span>
        </Button>
        <Button
          variant="ghost"
          class="flex-1 gap-2 hover:bg-primary/20 hover:text-card-foreground"
        >
          <Icon name="logos:linkedin-icon" class="h-4 w-4" />
          <span class="hidden sm:inline">LinkedIn</span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
