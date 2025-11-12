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
  Megaphone,
  FileText,
  QrCode,
  Tag,
} from "lucide-vue-next";

import { useForm } from "vee-validate";
import z from "zod";
import { useLogin } from "~/composables/auth/useLogin";
import { useRegister } from "~/composables/auth/useRegister";

definePageMeta({
  layout: false,
});

const schemas = [
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
  if (!q.name) return 1;
  if (!q.type || (q.type === "business" && !q.businessName)) return 2;
  if (!q.color) return 3;
  if (!q.mainGoal) return 4;
  if (!q.email || !q.password || !q.confirmPassword) return 5;

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

  if (currentStep.value < 5) {
    Object.assign(query, values);

    await router.push({
      path: route.path,
      query,
    });
  } else if (currentStep.value === 5) {
    const userData = {
      ...query,
      ...values,
    };

    await register(
      {
        email: userData.email,
        password: userData.password,
        accountName: userData.name,
        projectName: userData.businessName ?? `${userData.name}'s Project`,
        referralCode: "",
      },
      {
        onError() {
          error.value = "Email already exits";
        },
      }
    );

    await router.push({
      path: route.path,
      query: {
        ...query,
        completed: "true",
      },
    });

    await login({
      email: userData.email,
      password: userData.password,
    });
  }

  console.log(`Step ${currentStep.value} submitted:`, values);
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

const nextSteps = [
  {
    title: "Create your first Campaign",
    description: "Start by launching a campaign to engage your audience.",
    icon: Megaphone,
    gradient: "linear-gradient(to top right, #10b981, #0d9488)",
    action: "Create Campaign",
  },
  {
    title: "Design a Form",
    description: "Collect leads or feedback with a custom form.",
    icon: FileText,
    gradient: "linear-gradient(to top right, #8b5cf6, #7c3aed)",
    action: "Create Form",
  },
  {
    title: "Generate a QR Code",
    description: "Make it easy for users to access your campaigns offline.",
    icon: QrCode,
    gradient: "linear-gradient(to top right, #f59e0b, #d97706)",
    action: "Generate QR",
  },
  {
    title: "Publish an Offer",
    description: "Create and promote a limited-time offer for your audience.",
    icon: Tag,
    gradient: "linear-gradient(to top right, #0ea5e9, #0284c7)",
    action: "Publish Offer",
  },
];

watch(
  () => logingStatus.value,
  (status) => {
    if (status === "success") {
      confetti.shootFullScreen();
    }
  }
);
</script>

<template>
  <section
    class="min-h-screen w-full flex flex-col justify-center items-center px-6"
  >
    <div>
      <AppLogo class="h-8 w-auto" />
    </div>

    <div
      v-if="currentStep === 1"
      class="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-3">
        <AppHeading :level="2" class="text-3xl md:text-4xl font-semibold">
          Welcome to <span class="text-primary">Beastscan</span>
        </AppHeading>
        <p class="text-muted-foreground text-base">
          Let's start by knowing your name
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
                class="bg-card"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <Button type="submit">
            <span>Continue</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>

    <div
      v-if="currentStep === 2"
      v-motion-slide-bottom
      class="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-3">
        <AppHeading :level="2" class="text-3xl md:text-4xl font-semibold">
          Tell us about yourself
        </AppHeading>
        <p class="text-muted-foreground text-base">
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
                  class="bg-card"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="flex justify-end">
          <Button type="submit">
            <span>Continue</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>

    <div
      v-if="currentStep === 3"
      v-motion-slide-bottom
      class="w-full max-w-lg flex flex-col gap-8 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-3">
        <AppHeading :level="2" class="text-3xl md:text-4xl font-semibold">
          Choose your brand color
        </AppHeading>
        <p class="text-muted-foreground text-base">
          Pick a color that best represents your brand
        </p>
      </div>

      <form class="space-y-8" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="color">
          <FormItem>
            <FormControl>
              <div class="flex flex-wrap gap-4 justify-center">
                <label
                  v-for="color in colors"
                  :key="color.value"
                  class="w-12 h-12 rounded-full cursor-pointer border-2 transition-all duration-200 flex justify-center items-center"
                  :class="{
                    'ring-4 ring-offset-2 ring-primary':
                      color.value === componentField.modelValue,
                  }"
                  :style="{ backgroundColor: `#${color.value}` }"
                >
                  <Input
                    type="radio"
                    class="hidden"
                    :value="color.value"
                    v-bind="componentField"
                  />
                  <Check
                    v-if="color.value === form.values.color"
                    v-motion-pop
                    class="text-white"
                  />
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-center">
          <Button type="submit">
            <span>Continue</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>

    <div
      v-if="currentStep === 4"
      v-motion-slide-bottom
      class="w-full max-w-3xl flex flex-col gap-8 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-3">
        <AppHeading :level="2" class="text-3xl md:text-4xl font-semibold">
          What's your main goal?
        </AppHeading>
        <p class="text-muted-foreground text-base">
          Choose one that best describes what you want to achieve with Beastscan
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
          <Button>
            <span>Continue</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>

    <div
      v-if="currentStep === 5"
      v-motion-slide-bottom
      class="w-full max-w-md flex flex-col gap-8 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-3">
        <AppHeading :level="2" class="text-3xl md:text-4xl font-semibold">
          Let's secure your account
        </AppHeading>
        <p class="text-muted-foreground text-base">
          Just one more step to create your Beastscan account
        </p>
      </div>

      <Alert
        v-if="error"
        class="flex items-start gap-3 bg-transparent border-none py-0"
      >
        <Icon name="lucide:circle-alert" class="text-lg text-destructive" />
        <AlertDescription class="text-destructive">
          {{ error }}
        </AlertDescription>
      </Alert>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel> Email </FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                class="bg-card"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel> Password </FormLabel>
            <FormControl>
              <PasswordInput
                id="password"
                type="password"
                placeholder="••••••••"
                class="bg-card"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel> Password </FormLabel>
            <FormControl>
              <PasswordInput
                id="confirm"
                type="password"
                placeholder="••••••••"
                class="bg-card"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <StatefulButton :status="status"> Continue </StatefulButton>
        </div>
      </form>
    </div>

    <div v-if="currentStep === 6" v-motion-slide-bottom>
      <div
        v-if="logingStatus !== 'success'"
        key="processing"
        class="flex flex-col items-center gap-6 animate-in fade-in-50 duration-700"
      >
        <div class="space-y-2">
          <AppHeading
            :level="2"
            class="text-2xl md:text-3xl font-semibold text-center"
          >
            We are Setting things up
          </AppHeading>
          <p class="text-muted-foreground text-base">
            We're preparing your dashboard — this will only take a few seconds.
          </p>
        </div>
      </div>

      <div
        v-else
        key="next"
        class="flex flex-col items-center gap-10 animate-in fade-in duration-700"
      >
        <div class="space-y-3">
          <AppHeading :level="2" class="text-3xl font-semibold text-center">
            You're all set!
          </AppHeading>
          <p class="text-muted-foreground text-base">
            Let's help you get started with one of these quick actions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            v-for="step in nextSteps"
            :key="step.title"
            class="cursor-pointer"
          >
            <CardContent class="flex gap-3">
              <div
                class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-white"
                :style="{ background: step.gradient }"
              >
                <component :is="step.icon" class="w-5 h-5" />
              </div>

              <div class="flex flex-col items-start">
                <p class="font-medium text-base">{{ step.title }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ step.description }}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <NuxtLink href="/dashboard">
          <Button>
            <span>Go to dashboard</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
