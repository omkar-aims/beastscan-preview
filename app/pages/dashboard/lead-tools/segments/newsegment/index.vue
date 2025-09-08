<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type Condition = {
  match: "ALL" | "ANY";
  field: string;
  condition: string;
  value: string;
};

const segmentName = ref("");
const senderName = ref("");
const senderEmail = ref("");
const requireDoubleOptIn = ref(false);

const conditions = ref<Condition[]>([]);

function addConditionGroup() {
  conditions.value.push({
    match: "ALL",
    field: "",
    condition: "",
    value: "",
  });
}

function removeConditionGroup(index: number) {
  if (index >= 0 && index < conditions.value.length) {
    conditions.value.splice(index, 1);
  }
}

function clearCondition(index: number) {
  const condition = conditions.value[index];
  if (condition) {
    condition.field = "";
    condition.condition = "";
    condition.value = "";
  }
}

function createSegment() {
  const data = {
    segmentName: segmentName.value,
    senderName: senderName.value,
    senderEmail: senderEmail.value,
    requireDoubleOptIn: requireDoubleOptIn.value,
    conditions: conditions.value,
  };
  console.log("Created Segment:", data);
}
</script>

<template>
  <div class="space-y-8 space-x-2">
    <div class="w-full max-w-3xl mx-auto shadow-md justify-center items-center">
      <p class="text-primary text-semibold text-2xl">Create New Lead Segment</p>
    </div>

    <div>
      <Card class="w-full max-w-3xl mx-auto shadow-md">
        <CardContent class="space-y-6">
          <Form class="space-y-6">
            <!-- Segment Name -->
            <FormField name="segmentName">
              <FormItem>
                <FormLabel>Segment Name</FormLabel>
                <FormControl>
                  <Input
                    v-model="segmentName"
                    placeholder="e.g. Summer Campaign"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Sender Name -->
              <FormField name="senderName">
                <FormItem>
                  <FormLabel>Sender Name</FormLabel>
                  <FormControl>
                    <Input v-model="senderName" placeholder="e.g. John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- Sender Email -->
              <FormField name="senderEmail">
                <FormItem>
                  <FormLabel>Sender Email</FormLabel>
                  <FormControl>
                    <Input
                      v-model="senderEmail"
                      placeholder="e.g. email@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <!-- Toggle -->
            <FormField name="requireDoubleOptIn">
              <FormItem>
                <div
                  class="flex items-center justify-between rounded-lg border p-3"
                >
                  <div class="flex flex-row gap-2">
                    <FormControl>
                      <Switch v-model:checked="requireDoubleOptIn" />
                    </FormControl>
                    <FormLabel>Require Double Opt-In For Segment</FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
            <!-- Segment Conditions -->
            <div class="mt-6 space-y-4">
              <h3 class="font-medium">Segment Conditions</h3>
              <!-- If no groups -->
              <div v-if="conditions.length === 0" class="text-center">
                <Button
                  type="button"
                  variant="outline"
                  @click="addConditionGroup"
                >
                  + Add Condition Group
                </Button>
              </div>
              <!-- Groups -->
              <TransitionGroup name="fade" tag="div" class="space-y-4">
                <div
                  v-for="(group, index) in conditions"
                  :key="index"
                  class="border rounded-lg p-4 space-y-4 relative transition-all duration-300 transform"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span>Match</span>
                      <FormField :name="`match-${index}`">
                        <FormItem>
                          <FormControl>
                            <Select v-model="group.match">
                              <SelectTrigger class="w-[120px]">
                                <SelectValue placeholder="Match" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ALL">ALL (AND)</SelectItem>
                                <SelectItem value="ANY">ANY (OR)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      </FormField>
                      <span>of the following:</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      class="cursor-pointer"
                      @click="removeConditionGroup(index)"
                    >
                      Remove Group
                    </Button>
                  </div>
                  <!-- Condition Row -->
                  <div
                    class="flex flex-col md:flex-row md:items-center md:space-x-2 gap-2"
                  >
                    <!-- Field -->
                    <FormField :name="`field-${index}`">
                      <FormItem class="w-full md:w-auto">
                        <FormControl>
                          <Select v-model="group.field">
                            <SelectTrigger class="w-full md:w-[150px]">
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email_opens"
                                >Email Opens</SelectItem
                              >
                              <SelectItem value="location">Location</SelectItem>
                              <SelectItem value="clicks">Clicks</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <!-- Condition -->
                    <FormField :name="`condition-${index}`">
                      <FormItem class="w-full md:w-auto">
                        <FormControl>
                          <Select v-model="group.condition">
                            <SelectTrigger class="w-full md:w-[180px]">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="greater_than"
                                >Greater Than</SelectItem
                              >
                              <SelectItem value="contains">Contains</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <!-- Value -->
                    <FormField :name="`value-${index}`">
                      <FormItem class="w-full md:w-auto">
                        <FormControl>
                          <Input
                            v-model="group.value"
                            placeholder="Enter value"
                            class="w-full md:w-[200px]"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <!-- Clear Button -->
                    <Button
                      type="button"
                      class="cursor-pointer"
                      @click="clearCondition(index)"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </TransitionGroup>

              <!-- Add more groups -->
              <div v-if="conditions.length > 0" class="text-center">
                <Button
                  type="button"
                  variant="outline"
                  @click="addConditionGroup"
                >
                  + Add Condition Group
                </Button>
              </div>
              <!-- Live Preview -->
              <p class="text-sm text-muted-foreground text-center">
                ~125 leads match these conditions
              </p>
            </div>
          </Form>
        </CardContent>

        <CardFooter class="flex justify-end">
          <Button class="cursor-pointer" @click="createSegment" 
            >Create Segment</Button
          >
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
