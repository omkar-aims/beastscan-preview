<script setup lang="ts">
const handleClick = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2500);
  });
};
</script>

<template>
  <Card>
    <AppRow direction="horizontal">
      <form class="mx-4 space-y-4">
        <FormField v-slot="{ componentField }" name="registrationCode">
          <FormItem>
            <FormLabel>Registration Code</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="ex. DEV-XYZ-123"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              This code uniquely identifies your physical device.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <StatefulButton @click="handleClick">Verify</StatefulButton>
      </form>
    </AppRow>
  </Card>
</template>
