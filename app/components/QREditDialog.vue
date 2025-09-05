<script lang="ts" setup>
import { createReusableTemplate } from "@vueuse/core";

const [UseTemplate, QrForm] = createReusableTemplate();
const isOpen = ref(false);
</script>

<template>
  <UseTemplate>
    <form class="grid items-start gap-4 px-4">
      <div class="grid gap-2">
        <Label html-for="qr-name">QR Name</Label>
        <Input id="qr-name" type="text" default-value="Google QR" />
      </div>
      <div class="grid gap-2">
        <Label html-for="qr-link">QR Link</Label>
        <Input id="qr-link" type="url" default-value="https://www.google.com" />
      </div>
      <div class="flex justify-between gap-2 mt-2">
        <Button variant="destructive" type="button"> Delete </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  </UseTemplate>

  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit QR Link</DialogTitle>
        <DialogDescription>
          Update your QR code link details or delete if no longer needed.
        </DialogDescription>
      </DialogHeader>
      <QrForm />
    </DialogContent>
  </Dialog>
</template>
