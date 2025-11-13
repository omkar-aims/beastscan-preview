import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes("-"),
    },
  },

  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      host: process.env.NUXT_PUBLIC_HOST,
      previewBase: process.env.NUXT_PUBLIC_PREVIEW_BASE,
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
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "fr", language: "fr-FR", file: "fr.json" },
    ],
    defaultLocale: "en",
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
    },
  },

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
