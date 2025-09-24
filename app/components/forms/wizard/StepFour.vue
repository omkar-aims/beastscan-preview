<template>
  <Card>
    <CardHeader>
      <AppHeading :level="3">
        🎉 Congratulations! Your form is ready
      </AppHeading>
    </CardHeader>
    <CardContent class="space-y-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Form Name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>

    <CardFooter>
      <CardAction>
        <Button>Finish</Button>
      </CardAction>
    </CardFooter>
  </Card>
</template>
