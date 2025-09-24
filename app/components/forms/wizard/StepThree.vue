<script setup lang="ts">
defineProps<{
  newForm: Ref;
  triggerValues: Ref;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Trigger</CardTitle>
      <CardDescription
        >Choose when you want to show the pop-up.</CardDescription
      >
    </CardHeader>
    <CardContent class="space-y-2">
      <RadioGroup
        v-model="newForm.config.trigger.type"
        class="flex flex-col space-y-3"
      >
        <div class="flex items-center gap-x-3">
          <RadioGroupItem id="delay" value="delay" />
          <Label for="delay" class="font-normal flex items-center gap-x-2">
            <span>Wait</span>
            <Input
              v-model="triggerValues.delay"
              :disabled="newForm.config.trigger.type !== 'delay'"
              class="w-16"
              type="number"
            />
            <span>seconds before showing the pop-up</span>
          </Label>
        </div>

        <div class="flex items-center gap-x-3">
          <RadioGroupItem id="scroll" value="scroll" />
          <Label for="scroll" class="font-normal flex items-center gap-x-2">
            <span>Show when user scrolls to</span>
            <Select
              v-model="triggerValues.scroll"
              :disabled="newForm.config.trigger.type !== 'scroll'"
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a scroll trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
              </SelectContent>
            </Select>
          </Label>
        </div>

        <div class="flex items-center gap-x-3">
          <RadioGroupItem id="exit-intent" value="exit-intent" />
          <Label for="exit-intent" class="font-normal">
            Show before closing page (doesn't work on mobile)
          </Label>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-x-3">
            <RadioGroupItem id="floating-button" value="floating-button" />
            <Label for="floating-button" class="font-normal">
              Open popup using floating button
            </Label>
          </div>

          <div
            v-if="newForm.config.trigger.type === 'floating-button'"
            v-motion-fade
            class="flex gap-4 my-2"
          >
            <IconPicker />
            <Input
              placeholder="Enter label (Leave empty for no label)"
              class="w-xs"
            />
          </div>
        </div>
      </RadioGroup>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Schedule</CardTitle>
      <CardDescription
        >Set the timing of your pop-up in advance.</CardDescription
      >
    </CardHeader>
    <CardContent class="flex flex-col lg:flex-row gap-4">
      <div class="flex flex-col space-y-1">
        <span class="text-sm font-medium">Date from</span>
        <DatePicker />
      </div>

      <div class="flex flex-col space-y-1">
        <span class="text-sm font-medium">Date to</span>
        <DatePicker />
      </div>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Frequency</CardTitle>
      <CardDescription>
        Set the period when you want to show the pop-up to the same user again.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <Select v-model="newForm.config.frequency">
        <SelectTrigger>
          <SelectValue placeholder="Choose a frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="always">Always</SelectItem>
          <SelectItem value="session">Once per session</SelectItem>
          <SelectItem value="day">Once a day</SelectItem>
          <SelectItem value="week">Once a week</SelectItem>
          <SelectItem value="month">Once a month</SelectItem>
          <SelectItem value="3months">Once in 3 months</SelectItem>
          <SelectItem value="6months">Once in 6 months</SelectItem>
          <SelectItem value="year">Once a year</SelectItem>
        </SelectContent>
      </Select>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Visibility</CardTitle>
      <CardDescription
        >Control which devices can see your pop-up.</CardDescription
      >
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex items-center space-x-2">
        <Switch
          id="visibility-mobile"
          v-model="newForm.config.visibility.mobile"
        />
        <Label for="visibility-mobile">Hide on mobile devices</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch
          id="visibility-tablet"
          v-model="newForm.config.visibility.tablet"
        />
        <Label for="visibility-tablet">Hide on tablet devices</Label>
      </div>
      <div class="flex items-center space-x-2">
        <Switch
          id="visibility-desktop"
          v-model="newForm.config.visibility.desktop"
        />
        <Label for="visibility-desktop">Hide on desktop devices</Label>
      </div>
    </CardContent>
  </Card>
</template>
