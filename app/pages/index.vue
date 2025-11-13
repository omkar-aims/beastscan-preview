<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Autoplay from "embla-carousel-autoplay";

import {
  CreditCard,
  Cuboid,
  Tag,
  UsersRound,
  Sticker,
  ClipboardList,
  FileText,
  QrCode,
  Quote,
  Gift,
  Megaphone,
  ShoppingCart,
  Users,
  Globe,
  BarChart3,
  Heart,
  Camera,
  MessageSquare,
  Calendar,
} from "lucide-vue-next";
import { useRouter } from "vue-router";

const tokenCookie = useCookie<string | null>("token");

const router = useRouter();

const goToDashboard = () => {
  router.push("/dashboard");
};
definePageMeta({
  layout: false,
});

const products = [
  {
    title: "Wood Card",
    href: "/products/wood-card",
    description: "Premium NFC wood cards.",
    icon: CreditCard,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Wood Cube",
    href: "/products/wood-cube",
    description: "Interactive NFC cubes.",
    icon: Cuboid,
    gradient: "from-rose-400 to-pink-500",
  },
  {
    title: "Tags",
    href: "/products/tags",
    description: "Durable NFC & QR tags.",
    icon: Tag,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Social Cards",
    href: "/products/social-cards",
    description: "Smart cards for creators.",
    icon: UsersRound,
    gradient: "from-sky-400 to-blue-500",
  },
  {
    title: "Stickers",
    href: "/products/stickers",
    description: "Custom QR & NFC stickers.",
    icon: Sticker,
    gradient: "from-purple-400 to-indigo-500",
  },
];

const services = [
  {
    title: "Campaign Builder",
    href: "/services/campaign-builder",
    description: "Build and manage interactive campaigns with ease.",
    icon: ClipboardList,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Form Builder",
    href: "/services/form-builder",
    description: "Create branded forms for leads and feedback.",
    icon: FileText,
    gradient: "from-indigo-400 to-sky-500",
  },
  {
    title: "QR Code Generator",
    href: "/services/qr-code-generator",
    description: "Design and track custom dynamic QR codes.",
    icon: QrCode,
    gradient: "from-rose-400 to-orange-400",
  },
];

const reviews = [
  {
    name: "Gabrielle Williams",
    title: "CEO and Co-founder of ABC Company",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "Creative geniuses who listen, understand, and craft captivating visuals — an agency that truly understands our needs.",
  },
  {
    name: "Samantha Johnson",
    title: "Marketing Director at Visionary Brands",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Exceeded our expectations with innovative designs that brought our vision to life — a truly remarkable creative agency.",
  },
  {
    name: "Isabella Rodriguez",
    title: "Brand Strategist at Nova Media",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "Their ability to capture our brand essence in every project is unparalleled — an invaluable creative collaborator.",
  },
];

const useCases = [
  {
    title: "Holiday Giveaways",
    description:
      "Launch festive campaigns that boost brand engagement and reward loyal customers.",
    icon: Gift,
    gradient: "from-rose-400 to-orange-400",
  },
  {
    title: "Product Launches",
    description:
      "Announce new products with buzz-worthy interactive campaigns.",
    icon: Megaphone,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "E-commerce Promotions",
    description: "Drive conversions with QR codes and exclusive online offers.",
    icon: ShoppingCart,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Event Check-ins",
    description:
      "Simplify attendance tracking and offer personalized event experiences.",
    icon: Calendar,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Customer Feedback",
    description:
      "Collect instant feedback from your audience to improve products and services.",
    icon: MessageSquare,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Social Media Growth",
    description:
      "Boost followers and engagement through interactive QR-based social challenges.",
    icon: Users,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    title: "Global Campaigns",
    description:
      "Run multi-language campaigns across different regions effortlessly.",
    icon: Globe,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    title: "Brand Awareness",
    description:
      "Increase recognition through creative storytelling and visual impact.",
    icon: BarChart3,
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    title: "Non-profit Drives",
    description:
      "Engage donors and volunteers with meaningful, trackable campaigns.",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Influencer Collabs",
    description:
      "Collaborate with influencers and measure performance seamlessly.",
    icon: Camera,
    gradient: "from-purple-500 to-pink-500",
  },
];

const steps = [
  {
    id: "01",
    title: "Create Your Campaign",
    description: "Build or choose a campaign that fits your goals.",
    image: "/step-1.svg",
  },
  {
    id: "02",
    title: "Link Your Campaign",
    description: "Connect it to QR codes or smart tags for instant tracking.",
    image: "/step-2.svg",
  },
  {
    id: "03",
    title: "Analyze & Improve",
    description: "Track engagement and optimize with real-time insights.",
    image: "/step-3.svg",
  },
];

const menuOpen = ref(false);

const words = ["Campaigns", "Forms", "QR Codes"];
const currentIndex = ref(0);
const currentWord = ref(words[0]);

const visibleWords = computed(() => [currentWord.value]);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % words.length;
    currentWord.value = words[currentIndex.value];
  }, 5000);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-card text-card-foreground">
    <header
      class="max-w-7xl w-full mx-auto py-4 px-4 sm:px-6 flex items-center justify-between"
    >
      <div class="flex items-center gap-4 sm:gap-6">
        <NuxtLink href="/">
          <NuxtImg
            src="/logo-full-light.png"
            alt="BeastScan Logo"
            height="40"
            class="h-10 sm:h-12"
          />
        </NuxtLink>

        <div class="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2"
                  >
                    <li v-for="product in products" :key="product.href">
                      <NavigationMenuLink as-child>
                        <a
                          :href="product.href"
                          class="group block select-none rounded-xl p-3 transition-all duration-200 hover:bg-muted/60 hover:shadow-sm"
                        >
                          <div class="flex items-start gap-3">
                            <div
                              :class="`bg-gradient-to-br ${product.gradient} w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`"
                            >
                              <component
                                :is="product.icon"
                                class="h-5 w-5 text-white"
                              />
                            </div>

                            <div>
                              <p
                                class="text-sm font-semibold text-foreground group-hover:text-emerald-600 transition-colors"
                              >
                                {{ product.title }}
                              </p>
                              <p
                                class="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2"
                              >
                                {{ product.description }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    class="grid gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-2"
                  >
                    <li v-for="service in services" :key="service.title">
                      <NavigationMenuLink as-child>
                        <a
                          :href="service.href"
                          class="group block select-none rounded-xl p-3 transition-all duration-200 hover:bg-muted/60 hover:shadow-sm"
                        >
                          <div class="flex items-start gap-3">
                            <div
                              :class="`bg-gradient-to-br ${service.gradient} w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`"
                            >
                              <component
                                :is="service.icon"
                                class="h-5 w-5 text-white"
                              />
                            </div>

                            <div>
                              <p
                                class="text-sm font-semibold text-foreground group-hover:text-emerald-600 transition-colors"
                              >
                                {{ service.title }}
                              </p>
                              <p
                                class="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2"
                              >
                                {{ service.description }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  :class="navigationMenuTriggerStyle()"
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  :class="navigationMenuTriggerStyle()"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div class="hidden lg:flex items-center gap-3">
        <nav class="flex items-center gap-3">
          <template v-if="tokenCookie">
            <Button @click="goToDashboard">Go To Dashboard</Button>
          </template>

          <template v-else>
            <NuxtLink href="/login">
              <Button variant="outline">Login</Button>
            </NuxtLink>
            <NuxtLink href="/register">
              <Button>Register</Button>
            </NuxtLink>
          </template>
        </nav>
      </div>

      <button
        class="lg:hidden p-2 rounded-lg hover:bg-muted/60 transition-colors"
        @click="menuOpen = !menuOpen"
      >
        <Icon v-if="!menuOpen" name="lucide:menu" class="w-6 h-6" />
        <Icon v-else name="lucide:x" class="w-6 h-6" />
      </button>

      <transition name="fade">
        <div
          v-if="menuOpen"
          class="absolute top-16 left-0 w-full bg-background border-t border-border lg:hidden z-50"
        >
          <ul class="flex flex-col gap-2 p-4">
            <li>
              <details>
                <summary class="font-medium cursor-pointer py-2">
                  Products
                </summary>
                <ul class="pl-4">
                  <li v-for="product in products" :key="product.title">
                    <a
                      :href="product.href"
                      class="block py-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {{ product.title }}
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details>
                <summary class="font-medium cursor-pointer py-2">
                  Services
                </summary>
                <ul class="pl-4">
                  <li v-for="service in services" :key="service.title">
                    <a
                      :href="service.href"
                      class="block py-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {{ service.title }}
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <NuxtLink href="/about" class="block py-2 font-medium"
                >About Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink href="/contact" class="block py-2 font-medium"
                >Contact</NuxtLink
              >
            </li>

            <li class="flex gap-2 mt-3">
              <NuxtLink href="/login">
                <Button variant="outline" class="flex-1">Login</Button>
              </NuxtLink>
              <NuxtLink href="/register">
                <Button class="flex-1">Get Started</Button>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </transition>
    </header>

    <section
      class="relative bg-gray-100 flex flex-col items-center justify-center text-center pt-20 px-6 space-y-8 overflow-hidden"
    >
      <h1
        class="text-5xl sm:text-6xl font-extrabold leading-tight max-w-4xl tracking-tight"
      >
        <span class="block">Unleash the Power of Smart</span>

        <div class="inline-flex overflow-hidden items-center gap-3">
          <span
            v-for="word in visibleWords"
            :key="word"
            v-motion-slide-bottom
            class="bg-gradient-to-r from-primary via-pink-700 to-rose-500 bg-clip-text text-transparent font-bold block text-right"
          >
            {{ word }}
          </span>
          <span> with BeastScan </span>
        </div>
      </h1>

      <p
        class="text-lg text-muted-foreground max-w-2xl leading-relaxed mx-auto font-medium"
      >
        Create, manage, and track campaigns powered by QR codes, NFC tags, and
        intelligent analytics — all in one platform.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <NuxtLink to="/login">
          <Button size="lg" class="px-8 py-6 text-lg rounded-full">
            Start for Free
          </Button>
        </NuxtLink>

        <Button
          size="lg"
          variant="outline"
          class="px-8 py-6 text-lg rounded-full"
        >
          Book a Demo
        </Button>
      </div>

      <NuxtImg
        src="/auth-hero.png"
        class="mt-16 max-w-5xl rounded-xl overflow-hidden relative flex justify-center shadow-2xl shadow-primary h-96 w-auto object-contain scale-100 group-hover:scale-105 transition-transform duration-500"
        alt="Smart Campaigns"
      />
    </section>

    <section class="max-w-7xl mx-auto py-20 px-6 text-center">
      <div
        class="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-rose-500"
      >
        <span class="text-sm font-semibold text-white uppercase">
          How It Works
        </span>
      </div>
      <div class="grid md:grid-cols-3 gap-8 mt-12">
        <div v-for="step in steps" :key="step.id" class="group relative">
          <div class="flex justify-center">
            <NuxtImg :src="step.image" class="w-48" />
          </div>

          <h3 class="text-xl font-bold mb-2">
            {{ step.title }}
          </h3>
          <p class="text-muted-foreground">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-full grid grid-cols-1 lg:grid-cols-2">
      <div class="py-20 flex flex-col items-center bg-gray-100">
        <div
          class="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-rose-500"
        >
          <span class="text-sm font-semibold text-white uppercase">
            Use cases
          </span>
        </div>

        <div class="flex flex-wrap justify-center gap-4 scale-90">
          <div
            v-for="(useCase, i) in useCases"
            :key="i"
            class="flex items-center gap-2 px-5 py-3 bg-card backdrop-blur-sm rounded-full shadow-md cursor-pointer"
          >
            <div
              :class="`bg-gradient-to-br ${useCase.gradient} w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`"
            >
              <component :is="useCase.icon" class="h-4 w-4 text-white" />
            </div>
            <span class="font-medium text-sm text-foreground">
              {{ useCase.title }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="
          background-image: url('https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?_gl=1*l4n73y*_ga*MTU2NDYxNTAwLjE3NjE3MzIxODY.*_ga_8JE65Q40S6*czE3NjIyNTQ2MjkkbzIkZzEkdDE3NjIyNTUzNDUkajM3JGwwJGgw');
        "
      />
    </section>

    <section class="max-w-full grid grid-cols-1 lg:grid-cols-2">
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="
          background-image: url('https://images.pexels.com/photos/7108466/pexels-photo-7108466.jpeg?_gl=1*vr0yar*_ga*MTU2NDYxNTAwLjE3NjE3MzIxODY.*_ga_8JE65Q40S6*czE3NjIyNTQ2MjkkbzIkZzEkdDE3NjIyNTQ3NjIkajM0JGwwJGgw');
        "
      />

      <div class="py-20 flex flex-col items-center bg-gray-100">
        <div
          class="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-rose-500"
        >
          <span class="text-sm font-semibold text-white uppercase">
            Testimonials
          </span>
        </div>

        <Carousel
          class="max-w-sm"
          :plugins="[
            Autoplay({
              delay: 2000,
            }),
          ]"
        >
          <CarouselContent>
            <CarouselItem v-for="(review, index) in reviews" :key="index">
              <Card class="rounded-2xl">
                <CardContent>
                  <Quote class="w-6 h-6 fill-primary text-transparent mb-3" />
                  <p class="text-left text-card-foreground leading-relaxed">
                    {{ review.review }}
                  </p>
                </CardContent>

                <CardFooter class="flex gap-3">
                  <NuxtImg
                    :src="review.avatar"
                    :alt="review.name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="text-left font-semibold text-sm text-foreground">
                      {{ review.name }}
                    </p>
                    <p class="text-left text-xs text-muted-foreground">
                      {{ review.title }}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>

    <footer class="mt-12 border-t border-border py-4">
      <div
        class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground"
      >
        <NuxtLink href="/">
          <NuxtImg src="/logo.png" alt="BeastScan Logo" class="h-12 w-auto" />
        </NuxtLink>
        <p>© {{ new Date().getFullYear() }} BeastScan. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <NuxtLink
            href="#"
            class="hover:text-primary hover:fill-primary transition-colors"
          >
            <NuxtImg
              src="https://cdn.simpleicons.org/facebook/0866FF"
              width="28"
              height="28"
              alt="facebook page"
            />
          </NuxtLink>
          <NuxtLink
            href="#"
            class="hover:text-primary hover:fill-primary transition-colors"
          >
            <NuxtImg
              src="https://cdn.simpleicons.org/X/000000"
              width="24"
              height="24"
              alt="twitter page"
            />
          </NuxtLink>
          <NuxtLink
            href="#"
            class="hover:text-primary hover:fill-primary transition-colors"
          >
            <NuxtImg
              src="https://cdn.simpleicons.org/instagram/FF0069"
              width="24"
              height="24"
              alt="facebook page"
            />
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
