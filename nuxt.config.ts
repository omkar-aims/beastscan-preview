import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Enable CORS

  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      host: process.env.NUXT_PUBLIC_HOST,
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-color-picker",
    "@vueuse/motion/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    classSuffix: "",
  },
});
