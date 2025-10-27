<script setup lang="ts">
import { Plus } from "lucide-vue-next";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const checkedDays = ref<string[]>([]);

const toggleDay = (day: string) => {
  if (checkedDays.value.includes(day)) {
    checkedDays.value = checkedDays.value.filter((d) => d !== day);
  } else {
    checkedDays.value.push(day);
  }
};

const from = ref();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Business Name </CardTitle>
      <CardDescription
        >Please provide details about your business</CardDescription
      >
    </CardHeader>

    <CardContent>
      <form class="space-y-4">
        <FormField v-slot="{ componentField }" name="businessName">
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="streetAddress">
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FormField v-slot="{ componentField }" name="postalCode">
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="country">
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>
    </CardContent>

    <Separator />

    <CardHeader>
      <CardTitle>Opening Hours</CardTitle>
      <CardDescription>
        Select one or more days and specify opening and closing times.
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <label
          v-for="day in days"
          :key="day"
          class="flex items-center px-3 py-1.5 rounded-full border cursor-pointer transition-all select-none"
          :class="
            checkedDays.includes(day)
              ? 'bg-primary text-primary-foreground border-primary shadow-sm'
              : 'bg-muted hover:bg-muted/70 border-border text-foreground/80'
          "
        >
          <Input
            type="checkbox"
            class="hidden"
            :checked="checkedDays.includes(day)"
            @change="() => toggleDay(day)"
          />
          <span class="text-sm font-medium">{{ day }}</span>
        </label>
      </div>

      <div class="flex gap-4">
        <Input placeholder="From" />
        <Input placeholder="To" />
        <TimePicker v-model="from" />
        <Button type="button" variant="outline"> <Plus /> Add </Button>
      </div>
    </CardContent>
  </Card>
</template>
