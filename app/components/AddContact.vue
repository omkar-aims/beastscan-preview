<script setup lang="ts"></script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogDescription>
          Fill in the contact details and click save.
        </DialogDescription>
      </DialogHeader>

      <Form>
        <FormField v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </Form>

      <DialogFooter>
        <Button type="button" @click="handleSubmit"> Save Contact </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
