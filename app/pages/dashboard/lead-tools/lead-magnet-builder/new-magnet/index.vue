<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { Check, Copy } from "lucide-vue-next";

const options = [
  { id: "popup", label: "Popup" },
  { id: "embedded", label: "Embedded" },
  { id: "floating", label: "Floating Button" },
  { id: "timed", label: "Time Delay" },
  { id: "scroll", label: "Scroll Trigger" },
  { id: "exit", label: "Exit Intent" },
];

const selectedOptions = ref<string[]>([]);

const timeDelay = ref(false);
const scrollPercent = ref(false);
const exitIntent = ref(false);
const floatingButton = ref(true);

const timeDelaySeconds = ref("");
const scrollThreshold = ref("");
const floatingButtonText = ref("");

const triggerDesktop = ref(true);
const triggerTablet = ref(true);
const triggerMobile = ref(true);

const formDesktop = ref(true);
const formTablet = ref(true);
const formMobile = ref(true);


const backoffClosed = ref("");
const backoffSubmitted = ref("");
const showTriggerAfterClosed = ref(true);
const keepTriggerAfterSubmit = ref(true);

const embedCode = `<script src="https://cdn.beastscan.com/widgets/form.js" data-form-id="abc123" data-embedded-id="beast-lead"><script>`;

const copied = ref(false);
function copySnippet() {
  navigator.clipboard.writeText(embedCode).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
}
</script>
<template>
  <div class="space-y-8">
    <div class="space-y-6 mb-4">
        <p class="text-3xl font-bold">Create Lead Magnet</p>
    </div>

    <div class="space-y-6">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Fill in the basic details for your lead magnet.
          </CardDescription>
        </CardHeader>

        <!-- Use CardContent for spacing -->
        <CardContent>
          <Form class="space-y-6">
            <!-- Form Name -->
            <FormField name="title">
              <FormItem>
                <FormLabel>Form Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the title of your lead magnet"
                    class="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Form Description -->
            <FormField name="description">
              <FormItem>
                <FormLabel>Form Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a brief description of your lead magnet"
                    class="w-full min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Form Type -->
            <FormField name="file">
              <FormItem>
                <FormLabel>Form Type</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger class="w-full">
                      <SelectValue
                        placeholder="Select the type of your lead magnet"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popup">Popup</SelectItem>
                      <SelectItem value="embedded">Embedded</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </Form>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Form Type</CardTitle>
          <CardDescription>
            Choose one or more ways to display your lead magnet.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form>
            <FormField name="formTypes">
              <FormItem>
                <FormLabel>Select Options</FormLabel>
                <FormControl>
                  <!-- FIXED HEIGHT SCROLL BOX -->
                  <div
                    class="h-24 overflow-y-auto space-y-3 p-2 border rounded-md"
                  >
                    <div
                      v-for="opt in options"
                      :key="opt.id"
                      class="flex items-center space-x-2"
                    >
                      <Checkbox
                        :id="opt.id"
                        :checked="selectedOptions.includes(opt.id)"
                        @update:checked="(val : boolean) => {
                      if (val) {
                        selectedOptions.push(opt.id)
                      } else {
                        selectedOptions.splice(
                          selectedOptions.indexOf(opt.id),
                          1
                        )
                      }
                    }"
                      />
                      <label
                        :for="opt.id"
                        class="text-sm font-medium leading-none cursor-pointer"
                      >
                        {{ opt.label }}
                      </label>
                    </div>
                  </div>


                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </Form>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Popup Settings</CardTitle>
          <CardDescription>
            Configure triggers and visibility for your popup.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form>
            <div class="space-y-6">
              <!-- Trigger Types -->
              <FormField name="triggerTypes">
                <FormItem class="space-y-3">
                  <FormLabel>Trigger Types</FormLabel>
                  <FormDescription>
                    Choose one or more events that should trigger the popup to
                    appear.
                  </FormDescription>
                  <FormControl>
                    <div class="space-y-3">
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="timeDelay" />
                        <span>Time Delay</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="scrollPercent" />
                        <span>Scroll %</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="exitIntent" />
                        <span>Exit Intent</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="floatingButton" />
                        <span>Floating Button</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- Time Delay -->
              <FormField v-if="timeDelay" name="timeDelaySeconds">
                <FormItem>
                  <FormLabel>Time Delay</FormLabel>
                  <FormDescription>
                    Delay before showing (seconds).
                  </FormDescription>
                  <FormControl>
                    <Input v-model="timeDelaySeconds" placeholder="e.g. 5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- Scroll % -->
              <FormField v-if="scrollPercent" name="scrollThreshold">
                <FormItem>
                  <FormLabel>Scroll %</FormLabel>
                  <FormDescription>
                    Show when user scrolls past this percentage.
                  </FormDescription>
                  <FormControl>
                    <Input v-model="scrollThreshold" placeholder="e.g. 50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- Floating Button -->
              <FormField v-if="floatingButton" name="floatingButtonText">
                <FormItem>
                  <FormLabel>Floating Trigger Button</FormLabel>
                  <FormDescription>
                    Button text for floating trigger.
                  </FormDescription>
                  <FormControl>
                    <Input
                      v-model="floatingButtonText"
                      placeholder="e.g. Get My Discount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <!-- Visibility Settings -->
              <FormField name="visibilitySettings">
                <FormItem class="space-y-4">
                  <FormLabel>Visibility Settings</FormLabel>
                  <FormControl>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Trigger Visibility -->
                      <div class="space-y-2">
                        <div class="font-medium text-sm">
                          Trigger Visibility
                        </div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="triggerDesktop" />
                          <span>Desktop</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="triggerTablet" />
                          <span>Tablet</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="triggerMobile" />
                          <span>Mobile</span>
                        </div>
                      </div>

                      <!-- Form Visibility -->
                      <div class="space-y-2">
                        <div class="font-medium text-sm">Form Visibility</div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="formDesktop" />
                          <span>Desktop</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="formTablet" />
                          <span>Tablet</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <Checkbox v-model="formMobile" />
                          <span>Mobile</span>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
          </Form>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Suppression & Reappearance</CardTitle>
          <CardDescription>
            Configure backoff timings and floating button behavior.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form>
            <div class="space-y-6">
              <!-- Backoff Inputs -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="backoffClosed">
                  <FormItem>
                    <FormLabel>Backoff After Form Closed (days)</FormLabel>
                    <FormControl>
                      <Input v-model="backoffClosed" placeholder="e.g. 7" />
                    </FormControl>
                    <FormDescription>
                      How many days before this form reappears if the visitor
                      closes it?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField name="backoffSubmitted">
                  <FormItem>
                    <FormLabel>Backoff After Form Submitted (days)</FormLabel>
                    <FormControl>
                      <Input
                        v-model="backoffSubmitted"
                        placeholder="e.g. 365"
                      />
                    </FormControl>
                    <FormDescription>
                      How many days before this form can be shown again after
                      someone subscribes?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>

              <!-- Floating Button Behavior -->
              <FormField name="floatingBehavior">
                <FormItem class="space-y-3">
                  <FormLabel>Floating Button Behavior</FormLabel>
                  <FormControl>
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="showTriggerAfterClosed" />
                        <span
                          >Show trigger button even after form is closed</span
                        >
                      </div>
                      <div class="flex items-center gap-2">
                        <Checkbox v-model="keepTriggerAfterSubmit" />
                        <span
                          >Keep trigger available even after form was
                          submitted</span
                        >
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </Form>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Embedded Form Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            This form will be embedded directly into your website. You'll
            receive a snippet of HTML or JS to paste.
          </p>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>How to Embed This Form</CardTitle>
          <CardDescription>
            Copy and paste the following code into your website, right before
            the closing
            <code>&lt;/body&gt;</code> tag:
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            <p>Embed snippet</p>
          </div>
          <div class="relative bg-primary rounded-lg mt-2">
            <!-- Code Block -->
            <pre
              class="rounded-lg p-4 text-sm overflow-x-hidden text-white"
            ><code>{{ embedCode }}</code></pre>

            <!-- Copy Button -->
            <Button
              variant="outline"
              size="icon"
              class="absolute top-2 right-2"
              @click="copySnippet"
            >
              <component :is="copied ? Check : Copy" class="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p>
              Tip: Make sure your website supports JavaScript. The form will
              auto-appear based on your trigger and timing settings.
            </p>
          </div>
          <div>
            <p>
              Need Help?
              <span
                class="cursor-pointer underline underline-offset-2 text-primary"
              >
                <NuxtLink>Read The Full Documentation</NuxtLink></span
              >
              or
              <span
                class="cursor-pointer underline underline-offset-2 text-primary"
              >
                <NuxtLink> Contect Support </NuxtLink></span
              >
            </p>
          </div>
        </CardContent>
      </Card>
      <Button class="w-full align-left mt-4 ">Continue to Design</Button>
    </div>
  </div>
</template>
