<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-vue-next";

type Segment = { id: string; label: string };
const segments: Segment[] = [
  { id: "newsletter", label: "Newsletter" },
  { id: "promo", label: "Promo Responders" },
  { id: "vip", label: "VIP List" },
];

const selectedSegment = ref<string>("");
const signedUpAfter = ref<string>("");
const signedUpBefore = ref<string>("");
const winners = ref<number>(1);

const selectedSegmentLabel = computed(() => {
  if (!selectedSegment.value) return "Choose a segment";
  const seg = segments.find((s) => s.id === selectedSegment.value);
  return seg ? seg.label : "Choose a segment";
});

function onSubmit() {
  console.log("Form submitted:", {
    segment: selectedSegment.value,
    after: signedUpAfter.value,
    before: signedUpBefore.value,
    winners: winners.value,
  });
}
</script>

<template>
  <div>
    <div class="space-y-6 mb-4">
      <p class="text-3xl font-semibold">Winner Picker Tool</p>
    </div>
    <div>
      <Card class="w-full mx-auto">
        <!-- Blue Header -->
        <CardHeader class="text-primary rounded-t-lg flex items-center gap-2">
          <CardTitle class="text-lg">Filter &amp; Draw</CardTitle>
        </CardHeader>

        <CardContent class="p-6">
          <Form>
            <form class="space-y-6" @submit.prevent="onSubmit" >
              <!-- Row: Segment + Dates -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Segment -->
                <FormField name="segment">
                  <FormItem>
                    <FormLabel>Segment</FormLabel>
                    <FormControl>
                      <Select v-model="selectedSegment">
                        <!--  Make SelectTrigger full width -->
                        <SelectTrigger class="w-full">
                          <SelectValue :placeholder="selectedSegmentLabel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            v-for="seg in segments"
                            :key="seg.id"
                            :value="seg.id"
                          >
                            {{ seg.label }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </FormField>

                <!-- Signed Up After -->
                <FormField name="signedUpAfter">
                  <FormItem>
                    <FormLabel>Signed Up After</FormLabel>
                    <FormControl>
                      <Input v-model="signedUpAfter" type="date" />
                    </FormControl>
                  </FormItem>
                </FormField>

                <!-- Signed Up Before -->
                <FormField name="signedUpBefore">
                  <FormItem>
                    <FormLabel>Signed Up Before</FormLabel>
                    <FormControl>
                      <Input v-model="signedUpBefore" type="date" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <!-- Number of Winners -->
              <FormField name="winners">
                <FormItem>
                  <FormLabel>Number of Winners</FormLabel>
                  <FormControl>
                    <Input
                      v-model.number="winners"
                      type="number"
                      min="1"
                      class="w-40"
                    />
                  </FormControl>
                </FormItem>
              </FormField>

              <!-- Submit Button -->
              <Button
                type="submit"
                class="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-lg"
              >
                <Gift class="h-5 w-5" />
                Pick Winner(s)
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
