<script setup lang="ts"></script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Create New Group </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogDescription>
          Enter Group Name to add new group.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Enter Group Name </Label>
          <Input id="name" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Group</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
