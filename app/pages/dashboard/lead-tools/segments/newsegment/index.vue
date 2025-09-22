<script setup lang="ts">
import { ref, computed } from "vue";
import { leadData } from "~~/server/data/leaddata"; // <-- your leads file

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Condition } from "@/types/segment";
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

const segmentName = ref("");
const senderName = ref("");
const senderEmail = ref("");
const requireDoubleOptIn = ref(false);

const conditions = ref<Condition[]>([]);
const matchType = ref<"ALL" | "ANY">("ALL"); // ALL => every condition must be true

/* ---------------------------
   Helper: fields available for filtering (exclude `id`)
   --------------------------- */
const fields = computed(() => {
  if (!leadData || leadData.length === 0) {
    // fallback if no data
    return [
      "name",
      "email",
      "source",
      "tags",
      "emailsSent",
      "openRate",
      "clickRate",
      "lastActivity",
    ];
  }
  return Object.keys(leadData[0] ?? {}).filter(f => f !== "id");
});

/* ---------------------------
   Field-type detection (explicit mapping for known fields)
   types: "string" | "number" | "array" | "date" | "percentage"
   --------------------------- */
function getFieldType(field: string) {
  if (!field) return "string";
  // explicit known fields
  if (field === "openRate" || field === "clickRate") return "percentage";
  if (field === "emailsSent") return "number";
  if (field === "tags") return "array";
  if (field === "lastActivity") return "date";

  // fallback to probing sample value
  const sample = (leadData[0] as any)?.[field];
  if (Array.isArray(sample)) return "array";
  if (typeof sample === "number") return "number";
  if (sample && !isNaN(Date.parse(sample))) return "date";
  return "string";
}

/* ---------------------------
   Operator lists (value + label)
   --------------------------- */
function getOperators(field: string) {
  const t = getFieldType(field);
  switch (t) {
    case "number":
    case "percentage":
      return [
        { value: "gte", label: "Greater than or equal" },
        { value: "lte", label: "Less than or equal" },
        { value: "eq", label: "Equals" },
      ];
    case "array":
      return [
        { value: "contains", label: "Contains" },
        { value: "not_contains", label: "Not contains" },
      ];
    case "date":
      return [
        { value: "before", label: "Before" },
        { value: "after", label: "After" },
        { value: "on", label: "On" },
      ];
    default:
      // string
      return [
        { value: "eq", label: "Equals" },
        { value: "neq", label: "Not equal" },
        { value: "contains", label: "Contains" },
      ];
  }
}

/* ---------------------------
   Helpers to parse numeric/percentage/date values
   --------------------------- */
function toNumberLoose(v: any): number | null {
  if (v === null || v === undefined || v === "") return null;
  const s = String(v).replace(/[^0-9.-]+/g, "");
  if (s === "" || isNaN(Number(s))) return null;
  return Number(s);
}

function parseDate(v: any): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

/* ---------------------------
   Evaluate a single condition against one lead
   - incomplete conditions (missing field/operator/value) are ignored
     (treated as "no-op" so they don't incorrectly filter leads)
   --------------------------- */
function applyCondition(lead: any, cond: Condition): boolean {
  if (!cond || !cond.field || !cond.condition || cond.value === "") {
    // ignore incomplete condition
    return true;
  }

  const field = cond.field;
  const op = cond.condition;
  const rawValue = cond.value;
  const fieldType = getFieldType(field);
  const leadVal = lead[field];

  // Safety: if lead doesn't have the field, treat as non-matching
  if (leadVal === undefined) return false;

  // Percentage/number handling
  if (fieldType === "number" || fieldType === "percentage") {
    const leadNum = toNumberLoose(leadVal);
    const inputNum = toNumberLoose(rawValue);
    if (leadNum === null || inputNum === null) return false;
    if (op === "eq") return leadNum === inputNum;
    if (op === "gte") return leadNum >= inputNum;
    if (op === "lte") return leadNum <= inputNum;
    return false;
  }

  // Array handling (tags)
  if (fieldType === "array") {
    if (!Array.isArray(leadVal)) return false;
    const valueLower = String(rawValue).toLowerCase();
    const anyMatch = leadVal.some((el: any) =>
      String(el).toLowerCase().includes(valueLower)
    );
    if (op === "contains") return anyMatch;
    if (op === "not_contains") return !anyMatch;
    return false;
  }

  // Date handling
  if (fieldType === "date") {
    const leadDate = parseDate(leadVal);
    const inputDate = parseDate(rawValue);
    if (!leadDate || !inputDate) return false;

    // compare dates by day for "on"
    if (op === "on") {
      const a = leadDate.toISOString().split("T")[0];
      const b = inputDate.toISOString().split("T")[0];
      return a === b;
    }
    if (op === "before") return leadDate.getTime() < inputDate.getTime();
    if (op === "after") return leadDate.getTime() > inputDate.getTime();
    return false;
  }

  // Default: string handling
  const leadStr = String(leadVal ?? "").toLowerCase();
  const inputStr = String(rawValue ?? "").toLowerCase();
  if (op === "eq") return leadStr === inputStr;
  if (op === "neq") return leadStr !== inputStr;
  if (op === "contains") return leadStr.includes(inputStr);

  return false;
}

/* ---------------------------
   Filtered leads using only valid conditions
   - valid condition = has field, operator, and a value (non-empty)
   - when matchType = ALL => every valid condition must be true (AND)
   - when matchType = ANY => any valid condition true (OR)
   --------------------------- */
const filteredLeads = computed(() => {
  const valid = conditions.value.filter(
    (c) => c.field && c.condition && c.value !== ""
  );
  if (valid.length === 0) return leadData;
  return leadData.filter((lead) => {
    const results = valid.map((c) => applyCondition(lead, c));
    return matchType.value === "ALL" ? results.every(Boolean) : results.some(Boolean);
  });
});

/* ---------------------------
   Preview text
   --------------------------- */
const previewMessage = computed(() => {
  const validCount = conditions.value.filter(
    (c) => c.field && c.condition && c.value !== ""
  ).length;
  if (validCount === 0) return "No conditions added yet.";
  return matchType.value === "ALL"
    ? `All conditions must be true (${filteredLeads.value.length} leads match).`
    : `Any one condition must be true (${filteredLeads.value.length} leads match).`;
});

/* ---------------------------
   UI helpers / actions
   --------------------------- */
function addConditionGroup() {
  conditions.value.push({ field: "", condition: "", value: "" });
}
function removeConditionGroup(index: number) {
  if (index >= 0 && index < conditions.value.length) {
    conditions.value.splice(index, 1);
  }
}
function clearCondition(index: number) {
  if (conditions.value[index]) {
    conditions.value[index] = { field: "", condition: "", value: "" };
  }
}
function setField(index: number, field: string) {
  if (conditions.value[index]) {
    conditions.value[index].field = field;
    // reset operator & value when field changes
    conditions.value[index].condition = "";
    conditions.value[index].value = "";
  }
}
function getInputTypeForField(field: string) {
  const t = getFieldType(field);
  if (t === "date") return "date";
  if (t === "number" || t === "percentage") return "number";
  return "text";
}

/* ---------------------------
   Final create: console.log full segment and matched leads
   --------------------------- */
function createSegment() {
  const valid = conditions.value.filter(
    (c) => c.field && c.condition && c.value !== ""
  );
  const data = {
    segmentName: segmentName.value,
    senderName: senderName.value,
    senderEmail: senderEmail.value,
    requireDoubleOptIn: requireDoubleOptIn.value,
    matchType: matchType.value,
    conditions: valid,
    matchedLeads: filteredLeads.value,
  };
  console.log("Created Segment:", data);
}
</script>

<template>
  <div class="space-y-8 px-4">
    <div class="w-full max-w-3xl mx-auto text-center">
      <p class="text-primary font-semibold text-2xl">Create New Lead Segment</p>
    </div>

    <Card class="w-full max-w-3xl mx-auto shadow-md">
      <CardContent class="space-y-6">
        <Form class="space-y-6">
          <!-- Segment Name -->
          <FormField name="segmentName">
            <FormItem>
              <FormLabel>Segment Name</FormLabel>
              <FormControl>
                <Input v-model="segmentName" placeholder="e.g. Summer Campaign" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Sender Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="senderName">
              <FormItem>
                <FormLabel>Sender Name</FormLabel>
                <FormControl>
                  <Input v-model="senderName" placeholder="e.g. John Doe" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="senderEmail">
              <FormItem>
                <FormLabel>Sender Email</FormLabel>
                <FormControl>
                  <Input v-model="senderEmail" placeholder="e.g. email@gmail.com" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <!-- Toggle -->
          <FormField name="requireDoubleOptIn">
            <FormItem>
              <div class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex flex-row gap-2 items-center">
                  <FormControl>
                    <Switch v-model:checked="requireDoubleOptIn" />
                  </FormControl>
                  <FormLabel>Require Double Opt-In For Segment</FormLabel>
                </div>
              </div>
            </FormItem>
          </FormField>

          <!-- Segment Conditions -->
          <div class="mt-6 space-y-4">
            <h3 class="font-medium">Segment Conditions</h3>

            <!-- Global Match Selector -->
            <div class="flex flex-wrap items-center gap-2">
              <span>Match</span>
              <Select v-model="matchType">
                <SelectTrigger class="w-[140px]">
                  <SelectValue placeholder="Match" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">ALL (AND)</SelectItem>
                  <SelectItem value="ANY">ANY (OR)</SelectItem>
                </SelectContent>
              </Select>
              <span>of the following:</span>
            </div>

            <!-- If no groups -->
            <div v-if="conditions.length === 0" class="text-center">
              <Button type="button" variant="outline" @click="addConditionGroup">
                + Add Condition
              </Button>
            </div>

            <!-- Groups -->
            <TransitionGroup name="fade" tag="div" class="space-y-4">
              <div
                v-for="(group, index) in conditions"
                :key="index"
                class="border rounded-lg p-4 space-y-4 relative transition-all duration-300 transform"
              >
                <div class="flex flex-wrap md:flex-nowrap gap-4 items-center">
                  <!-- Field -->
                  <FormField :name="`field-${index}`">
                    <FormItem class="flex-1 min-w-[150px]">
                      <FormControl>
                        <Select v-model="group.field">
                          <SelectTrigger class="w-full">
                            <SelectValue placeholder="Field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              v-for="key in fields"
                              :key="key"
                              :value="key"
                              @click.prevent="setField(index, key)"
                            >
                              {{ key }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <!-- Condition (operators change by field type) -->
                  <FormField :name="`condition-${index}`">
                    <FormItem class="flex-1 min-w-[180px]">
                      <FormControl>
                        <Select v-model="group.condition">
                          <SelectTrigger class="w-full">
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              v-for="op in getOperators(group.field)"
                              :key="op.value"
                              :value="op.value"
                            >
                              {{ op.label }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <!-- Value -->
                  <FormField :name="`value-${index}`">
                    <FormItem class="flex-1 min-w-[200px]">
                      <FormControl>
                        <Input
                          v-model="group.value"
                          :type="getInputTypeForField(group.field)"
                          :placeholder="getFieldType(group.field) === 'percentage' ? 'e.g. 25 (means 25%)' : 'Enter value'"
                          class="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>

                <!-- Buttons Below Inputs -->
                <div class="flex gap-4 mt-4">
                  <Button type="button" size="sm" class="flex-1" @click="clearCondition(index)">
                    Clear
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    class="flex-1"
                    @click="removeConditionGroup(index)"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </TransitionGroup>

            <!-- Add more groups -->
            <div v-if="conditions.length > 0" class="text-center">
              <Button type="button" variant="outline" @click="addConditionGroup">
                + Add Condition
              </Button>
            </div>

            <!-- Live Preview -->
            <p class="text-sm text-muted-foreground text-center italic">
              {{ previewMessage }}
            </p>

            <!-- Small live preview list (names + email) -->
            <div class="mt-2">
              <div v-if="filteredLeads.length === 0" class="text-sm text-center text-muted-foreground">
                No leads match.
              </div>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <li
                  v-for="lead in filteredLeads"
                  :key="lead.email"
                  class="border rounded p-2 text-sm flex justify-between items-center"
                >
                  <div>
                    <div class="font-medium">{{ lead.name }}</div>
                    <div class="text-xs text-muted-foreground">{{ lead.email }}</div>
                  </div>
                  <div class="text-xs">{{ lead.source }}</div>
                </li>
              </ul>
            </div>
          </div>
        </Form>
      </CardContent>

      <CardFooter class="flex justify-end">
        <Button class="cursor-pointer" @click="createSegment">
          Create Segment
        </Button>
      </CardFooter>
    </Card>
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
