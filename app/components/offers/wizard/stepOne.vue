<script setup lang="ts">
import TimeSelector from "@/components/TimeSelector.vue";
import { Moon } from "lucide-vue-next";

// Default business days
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Default schedule
const schedule = reactive(
  days.map((day) => ({
    name: day,
    open: !["Sunday", "Monday"].includes(day),
    startTime: "09:00",
    endTime: "17:00",
  }))
);

// Basic form state (can be replaced with reactive form libraries like zod or vee-validate)
const formData = reactive({
  businessName: "",
  streetAddress: "",
  postalCode: "",
  city: "",
  country: "",
});
</script>

<template>
  <Card class="mx-auto p-6 shadow-md rounded-2xl space-y-6">
    <CardHeader>
      <h2 class="text-xl font-semibold text-primary">Business Information</h2>
    </CardHeader>

    <CardContent>
      <Form>
        <div class="space-y-6">
          <!-- Business Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="businessName">
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    v-model="formData.businessName"
                    placeholder="Enter business name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="streetAddress">
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    v-model="formData.streetAddress"
                    placeholder="Enter street address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField name="postalCode">
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    v-model="formData.postalCode"
                    placeholder="Enter postal code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="city">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input v-model="formData.city" placeholder="Enter city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="country">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    v-model="formData.country"
                    placeholder="Enter country"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <Separator />

          <!-- Business Hours -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-primary">Business Hours</h3>

            <div
              v-for="day in schedule"
              :key="day.name"
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-lg p-4 hover:shadow-sm transition"
            >
              <!-- Day + Switch -->
              <div class="flex items-center justify-between w-full sm:w-52">
                <p class="font-medium">{{ day.name }}</p>
                <div class="flex items-center gap-2">
                  <Switch v-model="day.open" />
                  <span
                    class="text-sm font-medium"
                    :class="day.open ? 'text-primary' : 'text-muted-foreground'"
                  >
                    {{ day.open ? "Open" : "Closed" }}
                  </span>
                </div>
              </div>

              <!-- Time Range -->
              <div
                v-if="day.open"
                class="flex items-center gap-3 w-full sm:w-auto justify-between"
                
              >
                <div class="flex items-center gap-2">
                  <TimeSelector v-model="day.startTime" />
                  <span class="text-sm font-medium text-muted-foreground"
                    >to</span
                  >
                  <TimeSelector v-model="day.endTime" />
                </div>
              </div>

              <!-- Closed Badge -->
              <div
                v-else
                class="w-full sm:w-auto text-sm text-muted-foreground italic"
              >
                <Badge
                  variant="secondary"
                  class="px-2 py-1 rounded-md flex items-center gap-1"
                >
                  <Moon class="w-4 h-4" /> Closed
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </CardContent>

    <CardFooter>
      <div class="flex justify-end w-full gap-3">
        <slot />
      </div>
    </CardFooter>
  </Card>
</template>
