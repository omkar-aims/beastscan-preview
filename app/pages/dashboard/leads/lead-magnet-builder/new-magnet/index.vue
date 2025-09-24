  <script setup lang="ts">
  import { ref } from "vue";
  import AppStepper from "@/components/AppStepper.vue";
  const { currentStep, nextStep, prevStep } = useWizard(4);
  const step = [
    {
      step: 1,
      title: "General Information",
      description: "Add information about magnet",
      icon: "lucide:badge-info",
    },
    {
      step: 2,
      title: "Audience Assignment",
      description: "Assign Segment for Lead magnet",
      icon: "lucide:users-round",
    },
    {
      step: 3,
      title: "Form Setting",
      description: "Popuo/Embedded Form Setting",
      icon: "lucide:settings",
    },
    {
      step: 4,
      title: "Done",
      description: "Continue to Design",
      icon: "lucide:figma",
    },
  ];

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
  </script>
  <template>
    <div>
      <div>
        <Card>
          <AppStepper v-model="currentStep" :steps="step" :disabled="false" />
        </Card>
      </div>
      <div v-if="currentStep === 1">
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
                  <FormLabel>Choose Segment</FormLabel>
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
        <div class="flex justify-end mt-6">
          <Button @click="nextStep">Next</Button>
        </div>
      </div>
      <div v-if="currentStep === 2">
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
        <div class="flex justify-between mt-6">
          <Button variant="outline" @click="prevStep">Back</Button>
          <Button @click="nextStep">Next</Button>
        </div>
      </div>
      <div v-if="currentStep === 3">
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
        <div class="flex justify-between mt-6">
          <Button variant="outline" @click="prevStep">Back</Button>
          <Button @click="nextStep">Next</Button>
        </div>
      </div>
      <div v-if="currentStep === 4">
        <div
          v-if="currentStep === 4"
          class="flex flex-col items-center justify-center text-center space-y-6 py-12"
        >
          <!-- Success Icon -->
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <!-- Heading -->
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold tracking-tight">Content is Ready 🎉</h2>
            <p class="text-muted-foreground max-w-md mx-auto">
              Your lead magnet setup is complete. You can now move forward and
              design your form layout.
            </p>
          </div>

          <!-- Action Button -->
          <Button
            class="px-8 py-3 text-base rounded-xl shadow-md hover:shadow-lg transition"
          >
            Continue to Design
          </Button>
        </div>
      </div>
    </div>
  </template>
