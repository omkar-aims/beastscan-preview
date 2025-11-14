<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import {
  ArrowRight,
  User,
  Building2,
  CheckCircle2,
  Check,
  Mail,
  Zap,
  Users,
  Shield,
  Gift,
  QrCode,
  Palette,
  Goal,
  Plus,
} from "lucide-vue-next";

import { useForm } from "vee-validate";
import z from "zod";
import { useLogin } from "~/composables/auth/useLogin";
import { useRegister } from "~/composables/auth/useRegister";

definePageMeta({
  layout: false,
});

const schemas = [
  z
    .object({
      email: z
        .string({
          required_error: "Email is required.",
        })
        .email("Please enter a valid email address."),
      password: z
        .string({
          required_error: "Password is required.",
        })
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(
          /[!@#$%^&*?~]/,
          "Password must contain at least one special character."
        ),
      confirmPassword: z.string({
        required_error: "Please confirm your password.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }),
  z.object({
    name: z
      .string({
        required_error: "Name is required.",
      })
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot exceed 50 characters."),
  }),

  z
    .object({
      type: z.enum(["personal", "business"], {
        required_error: "Please select a type.",
      }),
      businessName: z
        .string({
          required_error: "Business name is required.",
        })
        .max(100, "Business name cannot exceed 100 characters.")
        .optional(),
    })
    .refine(
      (data) =>
        data.type === "personal" ||
        (data.type === "business" && !!data.businessName),
      {
        message: "Business name is required when type is 'business'.",
        path: ["businessName"],
      }
    ),

  z.object({
    color: z
      .string({
        required_error: "Color is required.",
      })
      .default("f63b82"),
  }),

  z.object({
    mainGoal: z.string({
      required_error: "Please specify your main goal.",
    }),
  }),
];

const { register, status } = useRegister();
const { login, status: logingStatus } = useLogin({ redirect: false });
const confetti = useConfetti();

const error = ref<null | string>(null);
const route = useRoute();
const router = useRouter();
const currentStep = computed(() => {
  const q = route.query;

  if (q.completed === "true") return 6;
  if (!q.email || !q.password) return 1;
  if (!q.name) return 2;
  if (!q.type || (q.type === "business" && !q.businessName)) return 3;
  if (!q.color) return 4;
  if (!q.mainGoal) return 5;

  return 6;
});

const currentSchema = computed(() => schemas[currentStep.value - 1]);

const form = useForm({
  validationSchema: computed(() =>
    toTypedSchema(currentSchema.value || z.object({}))
  ),
});

const onSubmit = form.handleSubmit(async (values) => {
  const query = { ...route.query };

  if (currentStep.value === 1) {
    const userData = { ...values };

    await register(
      {
        email: userData.email,
        password: userData.password,
        referralCode: "",
      },
      {
        onError() {
          error.value = "Email already exists";
        },
      }
    );

    await router.push({
      path: route.path,
      query: {
        ...query,
        ...values,
      },
    });

    return;
  }

  if (currentStep.value < 5) {
    Object.assign(query, values);

    await router.push({
      path: route.path,
      query,
    });
    return;
  }

  if (currentStep.value === 5) {
    await router.push({
      path: route.path,
      query: {
        ...query,
        ...values,
        completed: "true",
      },
    });
  }
});

const colors = [
  { name: "Primary", value: "f63b82" },
  { name: "Blue", value: "3B82F6" },
  { name: "Green", value: "22C55E" },
  { name: "Purple", value: "8B5CF6" },
  { name: "Orange", value: "F97316" },
  { name: "Red", value: "EF4444" },
];

const goals = [
  {
    title: "Collect More Leads",
    icon: Users,
    description: "Grow your audience and capture customer info easily.",
    gradient: "linear-gradient(to top right, #2563eb, #0ea5e9)",
  },
  {
    title: "Run a QR Campaign",
    icon: QrCode,
    description: "Engage customers through interactive QR experiences.",
    gradient: "linear-gradient(to top right, #7c3aed, #6366f1)",
  },
  {
    title: "Send Better Emails",
    icon: Mail,
    description: "Reach your users with personalized email campaigns.",
    gradient: "linear-gradient(to top right, #db2777, #f43f5e)",
  },
  {
    title: "Automate Follow-ups",
    icon: Zap,
    description: "Save time and increase conversions with automation.",
    gradient: "linear-gradient(to top right, #f59e0b, #ef4444)",
  },
  {
    title: "Product Warranty or Verification",
    icon: Shield,
    description: "Enable customers to verify and protect their purchases.",
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
  },
  {
    title: "Loyalty Programs",
    icon: Gift,
    description: "Reward repeat customers and boost brand loyalty.",
    gradient: "linear-gradient(to top right, #d946ef, #ec4899)",
  },
];

watch(
  () => currentStep.value,
  async (step) => {
    if (step === 6) {
      const email = route.query.email as string;
      const password = route.query.password as string;

      await login({
        email,
        password,
      });
    }
  }
);

watch(
  () => logingStatus.value,
  (status) => {
    if (status === "success") {
      confetti.shootFullScreen();
    }
  }
);

const steps = [
  {
    id: 1,
    title: "Login Details",
  },
  {
    id: 2,
    title: "Your Name",
  },
  {
    id: 3,
    title: "Account Type",
  },
  {
    id: 4,
    title: "Brand Color",
  },
  {
    id: 5,
    title: "Main Goal",
  },
];

const stepIcon = computed(() => {
  switch (currentStep.value) {
    case 2:
      return User;
    case 3:
      return Building2;
    case 4:
      return Palette;
    case 5:
      return Goal;
    default:
      return User;
  }
});
</script>

<template>
  <div>
    <section
      v-if="currentStep !== 6"
      class="w-screen h-screen overflow-hidden grid grid-cols-[320px_1fr]"
    >
      <div
        class="relative w-[360px] h-screen text-white px-10 py-20 flex flex-col justify-between overflow-hidden"
        :class="currentStep === 1 ? 'bg-primary' : 'bg-card'"
      >
        <div v-if="currentStep === 1">
          <div class="flex items-center gap-2 mb-12">
            <div
              class="h-7 w-7 bg-white/20 rounded-full flex items-center justify-center"
            >
              <span class="font-bold text-white">B</span>
            </div>
            <span class="text-white/90 font-medium tracking-wide"
              >Beastscan</span
            >
          </div>

          <h1 class="text-3xl font-semibold leading-snug mb-4">
            A few steps away from creating your account.
          </h1>

          <p class="text-white/80 text-sm leading-relaxed max-w-xs">
            Create your account in minutes. Start personalizing your experience
            today.
          </p>

          <div class="absolute bottom-0 right-0">
            <NuxtImg src="/onboarding/startup.svg" class="w-60 opacity-90" />
          </div>
        </div>

        <div v-else class="mt-10 space-y-6 text-card-foreground">
          <div class="absolute top-4 left-4">
            <NuxtImg src="/logo-full-light.png" class="h-10" />
          </div>
          <div
            v-for="step in steps"
            :key="step.id"
            class="flex flex-col gap-2 py-1"
          >
            <div class="flex items-center gap-4">
              <div
                class="h-8 w-8 flex items-center justify-center rounded-full border font-medium text-base transition-all"
                :class="[
                  currentStep > step.id
                    ? 'bg-success text-white border-success'
                    : currentStep === step.id
                    ? 'border-2 border-primary text-primary'
                    : 'border-2 border-muted-foreground/40 text-muted-foreground',
                ]"
              >
                <Check
                  v-if="currentStep > step.id"
                  class="w-4 h-4 stroke-[3]"
                />

                <span v-else>{{ step.id }}</span>
              </div>

              <span
                class="text-base transition-colors font-medium"
                :class="[
                  currentStep > step.id
                    ? 'text-muted-foreground/70'
                    : currentStep === step.id
                    ? 'text-primary'
                    : 'text-muted-foreground/80',
                ]"
              >
                {{ step.title }}
              </span>
            </div>
          </div>

          <div
            class="absolute bottom-0 right-0 w-full h-32 flex items-center justify-center"
          >
            <div
              class="bg-gradient-to-br from-primary to-primary/50 h-32 absolute bottom-0 right-0 w-full"
              style="clip-path: polygon(0 0, 100% 40%, 100% 100%, 0% 100%)"
            />

            <div
              v-motion
              class="absolute top-0 right-4 shadow-2xl border border-primary w-20 h-20 rounded-full bg-white flex justify-center items-center"
              :initial="{ opacity: 0, scale: 0.6, y: 10 }"
              :enter="{ opacity: 1, scale: 1, y: 0 }"
              :transition="{ duration: 300 }"
            >
              <component
                :is="stepIcon"
                v-motion
                class="w-10 h-10 text-primary"
                :initial="{ opacity: 0, scale: 0.5 }"
                :enter="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 250 }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="p-4">
        <div
          class="flex justify-end items-center gap-1 text-sm text-muted-foreground mb-12"
        >
          <Button
            v-if="currentStep === 1"
            variant="link"
            class="p-0 h-auto text-primary/80 flex items-center gap-1"
          >
            Login here
            <ArrowRight class="w-4 h-4" />
          </Button>

          <span v-else class="flex items-center">
            Having issue ?
            <Button
              variant="link"
              class="p-0 h-auto text-primary/80 flex items-center gap-1"
              >Get help
              <ArrowRight class="w-4 h-4" />
            </Button>
          </span>
        </div>

        <div
          v-if="currentStep === 1"
          class="w-full max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
              Create your account
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              Set up your account to get started with your dashboard.
            </p>
          </div>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel> Email </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    class="bg-card border-0 rounded-xl py-6 px-8"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>
            <Alert
              v-if="error"
              class="flex items-start gap-3 bg-transparent border-none py-0"
            >
              <Icon
                name="lucide:circle-alert"
                class="text-lg text-destructive"
              />
              <AlertDescription class="text-destructive">
                {{ error }}
              </AlertDescription>
            </Alert>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel> Password </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    class="bg-card border-0 rounded-xl py-6 px-8"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem>
                <FormLabel> Confirm Password </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    class="bg-card border-0 rounded-xl py-6 px-8"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex justify-end">
              <StatefulButton
                :status="status"
                size="lg"
                class="rounded-full py-6 px-8"
              >
                Continue
              </StatefulButton>
            </div>
          </form>
        </div>
        <div
          v-if="currentStep === 2"
          v-motion-slide-bottom
          class="w-full max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
              What's your name?
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              Your name will appear across your dashboard and profile.
            </p>
          </div>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel> Name </FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="e.g., John Doe"
                    class="bg-card border-0 rounded-xl py-6 px-8"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex justify-end">
              <Button type="submit" size="lg" class="rounded-full py-6 px-8">
                <span>Continue</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
        <div
          v-if="currentStep === 3"
          v-motion-slide-bottom
          class="w-full max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
              How will you be using your account?
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              Are you using Beastscan for personal or business purposes?
            </p>
          </div>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="type">
                <FormItem>
                  <Card
                    class="cursor-pointer relative"
                    @click="form.setFieldValue('type', 'personal')"
                  >
                    <CardContent class="flex items-start gap-3">
                      <div
                        class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-orange-400"
                      >
                        <User class="w-5 h-5 text-white" />
                      </div>
                      <div class="flex-1">
                        <p class="font-medium">Personal</p>
                        <p class="text-xs text-muted-foreground">
                          For creators, individuals, and freelancers
                        </p>
                      </div>
                    </CardContent>

                    <CheckCircle2
                      v-if="form.values.type === 'personal'"
                      v-motion-pop
                      class="absolute top-4 right-4 text-success"
                    />
                  </Card>

                  <FormControl>
                    <Input
                      id="personal"
                      type="radio"
                      class="hidden"
                      value="personal"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="type">
                <FormItem>
                  <Card
                    class="cursor-pointer relative"
                    @click="form.setFieldValue('type', 'business')"
                  >
                    <CardContent class="flex items-start gap-3">
                      <div
                        class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400"
                      >
                        <Building2 class="w-5 h-5 text-white" />
                      </div>
                      <div class="flex-1">
                        <p class="font-medium">Business</p>
                        <p class="text-xs text-muted-foreground">
                          For companies, brands, and marketing teams
                        </p>
                      </div>
                    </CardContent>
                    <CheckCircle2
                      v-if="form.values.type === 'business'"
                      v-motion-pop
                      class="absolute top-4 right-4 text-success"
                    />
                  </Card>

                  <FormControl>
                    <Input
                      id="business"
                      type="radio"
                      class="hidden"
                      value="business"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div v-if="form.values.type === 'business'" v-motion-fade>
              <FormField v-slot="{ componentField }" name="businessName">
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      id="businessName"
                      placeholder="Your company name"
                      class="bg-card border-0 rounded-xl py-6 px-8"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="flex justify-end">
              <Button type="submit" class="rounded-full py-6 px-8">
                <span>Continue</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
        <div
          v-if="currentStep === 4"
          v-motion-slide-bottom
          class="w-full max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
              Choose your brand color
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              Pick a color that best represents your style or brand identity.
            </p>
          </div>
          <form class="space-y-10" @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="color">
              <FormItem>
                <FormControl>
                  <div class="flex flex-wrap gap-5">
                    <label
                      v-for="color in colors"
                      :key="color.value"
                      class="w-12 h-12 cursor-pointer border relative flex items-center justify-center transition-all duration-200 hover:scale-105"
                      :class="[
                        'rounded-full border-muted',
                        color.value === componentField.modelValue
                          ? 'ring-2 ring-primary ring-offset-2'
                          : '',
                      ]"
                      :style="{ backgroundColor: `#${color.value}` }"
                    >
                      <Input
                        type="radio"
                        class="hidden"
                        :value="color.value"
                        v-bind="componentField"
                      />

                      <Check
                        v-if="color.value === componentField.modelValue"
                        v-motion-pop
                        class="text-white w-5 h-5"
                      />
                    </label>

                    <label
                      class="w-12 h-12 cursor-pointer border rounded-full flex items-center justify-center bg-white hover:scale-105 transition-all duration-200 relative"
                      :class="
                        componentField.modelValue?.startsWith('custom:')
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                      "
                    >
                      <Plus
                        v-if="!componentField.modelValue?.startsWith('custom:')"
                        class="text-muted-foreground"
                      />

                      <div
                        v-else
                        class="absolute inset-0 rounded-full"
                        :style="{
                          backgroundColor: componentField.modelValue.replace(
                            'custom:',
                            '#'
                          ),
                        }"
                      />

                      <Input
                        type="color"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @input="
                          (e) => {
                            const val = e.target.value.replace('#', '');
                            componentField.onChange('custom:' + val);
                          }
                        "
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex justify-end">
              <Button type="submit" class="rounded-full py-6 px-8 gap-2">
                <span>Continue</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
        <div
          v-if="currentStep === 5"
          v-motion-slide-bottom
          class="w-full max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
              What's your main goal?
            </h1>
            <p class="text-sm text-muted-foreground mt-1">
              Tell us your main goal so we can guide you in the right direction.
            </p>
          </div>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                v-for="goal in goals"
                :key="goal.title"
                v-slot="{ componentField }"
                name="goal"
              >
                <FormItem>
                  <Card
                    class="cursor-pointer relative"
                    @click="form.setFieldValue('mainGoal', goal.title)"
                  >
                    <CardContent class="flex items-start gap-3">
                      <div
                        class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full"
                        :style="{ background: goal.gradient }"
                      >
                        <component :is="goal.icon" class="w-5 h-5 text-white" />
                      </div>

                      <div class="flex-1">
                        <p class="font-medium">{{ goal.title }}</p>
                        <p class="text-xs text-muted-foreground">
                          {{ goal.description }}
                        </p>
                      </div>
                    </CardContent>
                    <CheckCircle2
                      v-if="form.values.mainGoal === goal.title"
                      v-motion-pop
                      class="absolute top-4 right-4 text-success"
                    />
                  </Card>

                  <FormControl>
                    <Input
                      :id="goal.title"
                      type="radio"
                      class="hidden"
                      :value="goal.title"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="flex justify-end">
              <Button class="rounded-full py-6 px-8">
                <span>Continue</span>
                <ArrowRight class="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section
      v-if="currentStep === 6"
      class="w-screen h-screen flex flex-col justify-center items-center overflow-hidden bg-primary relative"
    >
      <div
        v-if="logingStatus !== 'success'"
        class="space-y-4 text-center relative z-10"
      >
        <div class="mt-6 flex justify-center">
          <div
            class="w-10 h-10 border-4 border-white border-t-primary rounded-full animate-spin"
          />
        </div>
        <AppHeading
          :level="2"
          class="text-2xl md:text-4xl font-bold text-primary-foreground"
        >
          We are Setting things up
        </AppHeading>
        <p class="text-primary-foreground/80 text-lg md:text-xl">
          We're preparing your dashboard — this will only take a few seconds.
        </p>
      </div>

      <div v-else class="space-y-6 text-center relative z-10">
        <AppHeading
          :level="2"
          class="text-3xl md:text-5xl font-extrabold text-primary-foreground"
        >
          You're all set!
        </AppHeading>
        <NuxtLink href="/dashboard" class="inline-block">
          <Button
            class="rounded-full py-4 px-8 bg-primary-foreground hover:bg-primary-foreground text-primary hover:text-primary"
          >
            <span>Go to dashboard</span>
            <ArrowRight class="w-5 h-5" />
          </Button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
