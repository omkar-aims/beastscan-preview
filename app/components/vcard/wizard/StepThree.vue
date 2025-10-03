<script setup lang="ts">
const utmProvider = ref<"none" | "beastscan" | "gtm" | "ga">("none");
</script>

<template>
  <div class="grid grid-cols-[1fr_25%] gap-6">
    <Card>
      <CardHeader>
        <AppHeading :level="3">Your vCard is Almost Ready!</AppHeading>
        <CardDescription>
          Fill in the final details to create your vCard, customize meta info,
          and enable tracking.
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
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
        <FormField v-slot="{ componentField }" name="cardUrl">
          <FormItem>
            <FormLabel>Custom URL</FormLabel>
            <FormControl>
              <div
                class="flex w-full rounded-md border border-input overflow-hidden"
              >
                <span
                  class="bg-muted text-muted-foreground px-3 flex items-center select-none"
                >
                  https://beastscan-preview.vercel.app/
                </span>
                <Input
                  v-bind="componentField"
                  class="flex-1 rounded-tl-none rounded-bl-none"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField name="analyticsProvider">
            <FormItem>
              <FormLabel>Analytics Provider</FormLabel>
              <FormControl>
                <Select v-model="utmProvider" default-value="beastscan">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Choose Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="beastscan">Beastscan</SelectItem>
                    <SelectItem value="gtm">GTM</SelectItem>
                    <SelectItem value="ga">GA4</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-if="utmProvider === 'ga' || utmProvider === 'gtm'"
            v-slot="{ componentField }"
            v-motion-fade
            name="trackingId"
          >
            <FormItem>
              <FormLabel>Tracking ID</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  placeholder="Enter your Tracking ID"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3">
        <CardAction>
          <Button type="submit">Finish & Generate vCard</Button>
        </CardAction>
      </CardFooter>
    </Card>

    <PhonePreview
      src="https://media.slidesgo.com/storage/27591492/conversions/5-abstract-design-vcard-thumb.jpg"
    />
  </div>
</template>
