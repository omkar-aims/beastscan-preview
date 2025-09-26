<template>
  <Card>
    <CardHeader>
      <CardTitle>Theme</CardTitle>
      <CardDescription>
        Adjust the primary colors, fonts, and overall look and feel of your
        form.
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <div class="space-y-2">
        <span
          class="block text-sm font-semibold text-muted-foreground uppercase"
          >Colors</span
        >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <span class="text-sm font-medium">Primary</span>
            <AppColorPicker />
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm font-medium">Secondary</span>
            <AppColorPicker />
          </div>
        </div>
      </div>
    </CardContent>

    <Separator />

    <CardContent class="space-y-6">
      <div class="space-y-2">
        <span
          class="block text-sm font-semibold text-muted-foreground uppercase"
          >Fonts</span
        >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <span class="text-sm font-medium">Primary</span>
            <FontPicker />
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm font-medium">
              Secondary
              <span class="text-muted-foreground">(optional)</span>
            </span>
            <FontPicker />
          </div>
        </div>
      </div>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Content</CardTitle>
      <CardDescription>
        Customize the text elements of your form.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="flex flex-col space-y-2">
        <Label for="formHeading">Heading</Label>
        <Input id="formHeading" />
      </div>
      <div class="flex flex-col space-y-2">
        <Label for="formSubHeading">Sub Heading</Label>
        <Input id="formSubHeading" />
      </div>
      <div class="flex flex-col space-y-2">
        <Label for="formButtonLabel">Button Label</Label>
        <Input id="formButtonLabel" />
      </div>
    </CardContent>
  </Card>
</template>
