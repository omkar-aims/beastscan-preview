<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import {
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

import AppStepper from "@/components/AppStepper.vue";
import { useWizard } from "@/composables/useWizard";
import { useConfetti } from "@/composables/useConfetti";
import { NuxtLink } from "#components";

// --- Types ---
type Segment = { id: string; label: string };
type User = {
  id: number;
  name: string;
  email: string;
  segment: string;
  signupDate: string; // YYYY-MM-DD
};

// --- Static data (mock users) ---
const segments: Segment[] = [
  { id: "newsletter", label: "Newsletter" },
  { id: "promo", label: "Promo Responders" },
  { id: "vip", label: "VIP List" },
];

const staticUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    segment: "newsletter",
    signupDate: "2025-06-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    segment: "promo",
    signupDate: "2025-06-05",
  },
  {
    id: 3,
    name: "Sam Green",
    email: "sam@example.com",
    segment: "vip",
    signupDate: "2025-06-10",
  },
  {
    id: 4,
    name: "Priya Patel",
    email: "priya@example.com",
    segment: "newsletter",
    signupDate: "2025-06-20",
  },
  {
    id: 5,
    name: "Amit Kumar",
    email: "amit@example.com",
    segment: "promo",
    signupDate: "2025-07-01",
  },
  {
    id: 6,
    name: "Sara Lee",
    email: "sara@example.com",
    segment: "vip",
    signupDate: "2025-07-12",
  },
  {
    id: 7,
    name: "Carlos Diaz",
    email: "carlos@example.com",
    segment: "newsletter",
    signupDate: "2025-07-20",
  },
  {
    id: 8,
    name: "Lina Zhou",
    email: "lina@example.com",
    segment: "promo",
    signupDate: "2025-08-01",
  },
  {
    id: 9,
    name: "Tom Brown",
    email: "tom@example.com",
    segment: "vip",
    signupDate: "2025-08-15",
  },
  {
    id: 10,
    name: "Maya Singh",
    email: "maya@example.com",
    segment: "newsletter",
    signupDate: "2025-08-20",
  },
];

// --- Wizard & confetti ---
const { nextStep: wizardNext, prevStep: wizardPrev } = useWizard(4);
const { shoot } = useConfetti();

// local currentStep ref to control AppStepper
const currentStep = ref<number>(1);

// ensure confetti fired once on entering step 4
const confettiFired = ref(false);

watch(currentStep, (newStep, oldStep) => {
  // If trying to move forward, validate the old step before allowing
  if (newStep > oldStep) {
    const ok = validateStep(oldStep);
    if (!ok) {
      // revert
      currentStep.value = oldStep;
      return;
    }
  }

  // update wizard composable state in a best-effort way
  if (newStep === oldStep + 1) wizardNext();
  else if (newStep === oldStep - 1) wizardPrev();
  else if (newStep < oldStep) {
    for (let i = 0; i < oldStep - newStep; i++) wizardPrev();
  } else if (newStep > oldStep) {
    for (let i = 0; i < newStep - oldStep; i++) wizardNext();
  }

  // fire confetti once when entering step 4
  if (newStep === 4 && !confettiFired.value) {
    shoot();
    confettiFired.value = true;
  }
});

// --- Form state ---
const form = reactive({
  segment: "",
  signedUpAfter: "",
  signedUpBefore: "",
  winnersCount: 1 as number | string,
});

// Errors per-field
const errors = reactive<Record<string, string | null>>({
  segment: null,
  signedUpAfter: null,
  signedUpBefore: null,
  winnersCount: null,
});

// winners result
const winnersList = ref<User[]>([]);

// --- Zod schemas (per-step) ---
const segmentSchema = z.object({
  segment: z.string().nonempty({ message: "Please select a segment." }),
});

const dateSchema = z
  .object({
    signedUpAfter: z.string().nonempty({ message: "Start date is required." }),
    signedUpBefore: z.string().nonempty({ message: "End date is required." }),
  })
  .superRefine((val, ctx) => {
    const a = new Date(val.signedUpAfter);
    const b = new Date(val.signedUpBefore);
    if (isNaN(a.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["signedUpAfter"],
        message: "Start date is invalid.",
      });
    }
    if (isNaN(b.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["signedUpBefore"],
        message: "End date is invalid.",
      });
    }
    // inclusive check: a <= b
    if (a.getTime() > b.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["signedUpBefore"],
        message: "End date must be the same or after start date.",
      });
    }
  });

const winnersSchema = z.object({
  winnersCount: z
    .number({ invalid_type_error: "Number of winners is required." })
    .int({ message: "Must be an integer." })
    .positive({ message: "Must be a positive number." }),
});

// --- Helpers ---
function clearErrors() {
  for (const k in errors) errors[k] = null;
}

function validateStep(step: number): boolean {
  clearErrors();
  try {
    if (step === 1) {
      segmentSchema.parse({ segment: form.segment });
    } else if (step === 2) {
      dateSchema.parse({
        signedUpAfter: form.signedUpAfter,
        signedUpBefore: form.signedUpBefore,
      });
    } else if (step === 3) {
      // ensure numeric
      const n = Number(form.winnersCount);
      winnersSchema.parse({ winnersCount: n });

      // additional check: winners <= available candidates
      const candidates = getFilteredCandidates();
      if (n > candidates.length) {
        errors.winnersCount = `Requested winners (${n}) exceed available candidates (${candidates.length}).`;
        return false;
      }
    }
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      for (const issue of e.issues) {
        const path = issue.path[0] as string | undefined;
        if (path) errors[path] = issue.message;
      }
    } else {
      console.error(e);
    }
    return false;
  }
}

function getFilteredCandidates(): User[] {
  const seg = form.segment;
  if (!seg) return [];
  const after = new Date(form.signedUpAfter);
  const before = new Date(form.signedUpBefore);
  return staticUsers.filter((u) => {
    if (u.segment !== seg) return false;
    const d = new Date(u.signupDate + "T00:00:00");
    // inclusive comparison
    return d.getTime() >= after.getTime() && d.getTime() <= before.getTime();
  });
}

function pickWinners(): void {
  winnersList.value = [];
  const n = Number(form.winnersCount);
  const pool = getFilteredCandidates().slice(); 
  if (n <= 0 || pool.length === 0) return;

  // Fisher-Yates shuffle then take first n
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  winnersList.value = pool.slice(0, n) as User[];
}

// --- Navigation actions used by buttons ---
function onNext() {
  const ok = validateStep(currentStep.value);
  if (!ok) return;
  if (currentStep.value < 4) currentStep.value += 1;
}

function onBack() {
  if (currentStep.value > 1) currentStep.value -= 1;
}

function onPickWinners() {
  const ok = validateStep(3);
  if (!ok) return;
  pickWinners();
  currentStep.value = 4;
}

function onRestart() {
  form.segment = "";
  form.signedUpAfter = "";
  form.signedUpBefore = "";
  form.winnersCount = 1;
  winnersList.value = [];
  clearErrors();
  confettiFired.value = false;
  currentStep.value = 1;
}

// computed helper for select placeholder
const selectedSegmentLabel = computed(() => {
  if (!form.segment) return "Choose a segment";
  const seg = segments.find((s) => s.id === form.segment);
  return seg ? seg.label : "Choose a segment";
});
</script>

<template>
  <div class="mx-auto p-4">
    <Card class="mb-4">
      <CardContent>
        <AppStepper
          v-model="currentStep"
          :steps="[
            {
              step: 1,
              title: 'Select Segment',
              description: 'Choose a segment',
              icon: 'lucide:component',
            },
            {
              step: 2,
              title: 'Date Range',
              description: 'Select Date Range',
              icon: 'lucide:calendar-fold',
            },
            {
              step: 3,
              title: 'Number of Winners',
              description: 'Total Number of Winners',
              icon: 'lucide:medal',
            },
            {
              step: 4,
              title: 'Done',
              description: 'Download or share',
              icon: 'lucide:check-circle',
            },
          ]"
          :disabled="false"
        />
      </CardContent>
    </Card>

    <div class="space-y-6 mb-4">
      <p class="text-3xl font-semibold">Winner Picker Tool</p>
      <p class="text-sm text-muted-foreground">
        Follow the steps to pick lucky winners from your selected segment and
        date range.
      </p>
    </div>

    <Card class="w-full mx-auto">
      <CardContent class="p-6">
        <!-- Step 1 -->
        <div v-show="currentStep === 1">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField name="segment">
              <FormItem>
                <FormLabel>Segment</FormLabel>
                <FormControl>
                  <Select v-model="form.segment">
                    <SelectTrigger class="w-full">
                      <SelectValue :placeholder="selectedSegmentLabel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="seg in segments"
                        :key="seg.id"
                        :value="seg.id"
                        >{{ seg.label }}</SelectItem
                      >
                    </SelectContent>
                  </Select>
                </FormControl>
                <p v-if="errors.segment" class="text-sm text-red-600 mt-2">
                  {{ errors.segment }}
                </p>
              </FormItem>
            </FormField>
          </div>

          <div class="mt-6 flex justify-end">
            <Button
              class="w-full md:w-40"
              :disabled="!form.segment"
              @click="onNext"
              >Next</Button
            >
          </div>
        </div>

        <!-- Step 2 -->
        <div v-show="currentStep === 2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="signedUpAfter">
              <FormItem class="flex flex-col">
                <FormLabel>Signed Up After</FormLabel>
                <FormControl>
                  <Input v-model="form.signedUpAfter" type="date" />
                </FormControl>
                <p v-if="errors.signedUpAfter" class="text-sm mt-2">
                  {{ errors.signedUpAfter }}
                </p>
              </FormItem>
            </FormField>

            <FormField name="signedUpBefore">
              <FormItem>
                <FormLabel>Signed Up Before</FormLabel>
                <FormControl>
                  <Input v-model="form.signedUpBefore" type="date" />
                </FormControl>
                <p v-if="errors.signedUpBefore" class="text-sm mt-2">
                  {{ errors.signedUpBefore }}
                </p>
              </FormItem>
            </FormField>
          </div>

          <div class="mt-6 flex flex-col md:flex-row md:justify-between gap-3">
            <div class="flex-1">
              <Button variant="outline" class="w-full md:w-40" @click="onBack"
                >Back</Button
              >
            </div>
            <div class="flex-1 md:flex md:justify-end">
              <Button class="w-full md:w-40" @click="onNext">Next</Button>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-show="currentStep === 3">
          <div class="grid md:grid-cols-2 gap-4 items-end">
            <FormField name="winnersCount">
              <FormItem>
                <FormLabel>Number of Winners</FormLabel>
                <FormControl>
                  <Input
                    v-model.number="form.winnersCount"
                    type="number"
                    min="1"
                    step="1"
                  />
                </FormControl>
                <p v-if="errors.winnersCount" class="text-sm mt-2 text-red-500">
                  {{ errors.winnersCount }}
                </p>
              </FormItem>
            </FormField>
          </div>

          <!-- Buttons -->
          <div class="mt-6 flex flex-col md:flex-row justify-between gap-3">
            <!-- Back Button -->
            <Button variant="outline" class="w-full md:w-40" @click="onBack">
              Back
            </Button>

            <!-- Pick Winners Button -->
            <Button class="w-full md:w-40" @click="onPickWinners">
              Pick Winners
            </Button>
          </div>
        </div>

        <!-- Step 4 -->
        <div v-show="currentStep === 4">
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Lucky Winners 🎉</h2>

            <div
              v-if="winnersList.length === 0"
              class="text-sm text-muted-foreground"
            >
              No winners (no eligible candidates). Try different filters.
            </div>

            <ul v-else class="space-y-3">
              <li
                v-for="w in winnersList"
                :key="w.id"
                class="p-4 border rounded-md flex flex-col md:flex-row md:justify-between"
              >
                <div>
                  <div class="font-medium">{{ w.name }}</div>
                  <div class="text-sm text-muted-foreground">
                    <span>{{ w.email }}</span>
                  </div>
                </div>
                <div class="mt-3 md:mt-0">
                  <NuxtLink
                    :to="`/segments/${w.segment}`"
                    class="text-sm underline"
                    >Go to Segment</NuxtLink
                  >
                </div>
              </li>
            </ul>

            <div
              class="mt-6 flex flex-col md:flex-row md:justify-between gap-3"
            >
              <div class="flex-1">
                <Button
                  variant="outline"
                  class="w-full md:w-40"
                  @click="onRestart"
                  >Restart</Button
                >
              </div>
              <div class="flex-1 md:flex md:justify-end">
                <NuxtLink to="/segments" class="w-full md:w-40">
                  <Button class="w-full">Go to Segment</Button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
 