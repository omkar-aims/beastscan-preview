<script setup lang="ts">
definePageMeta({
  layout: false,
});

const config = {
  theme: {
    colors: {
      background: "#4F4A47",
      text: "#D0C7C6",
    },
  },

  data: {
    company: {
      logo: "/logo.png",
      name: "Beastscan",
    },

    banner:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=500&auto=format&fit=crop&q=60",

    profileImage: "https://i.pravatar.cc/150?img=21",
    fullName: "Halley Smith",
    profession: "Fashion Designer",

    contact: {
      email: "halley@gmail.com",
      phone: "123-456-7890",
      address: "123 anywhere street Any city, 123456",
      website: "www.halley.com",
    },

    socialLinks: [
      { platform: "youtube", link: "https://youtube.com" },
      { platform: "linkedin", link: "https://linkedin.com" },
      { platform: "facebook", link: "https://facebook.com" },
    ],
  },
};
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center"
    :style="{
      backgroundColor: config.theme.colors.background,
      color: config.theme.colors.text,
    }"
  >
    <header class="w-full py-4 flex justify-center items-center gap-2">
      <NuxtImg
        :src="config.data.company.logo"
        alt="Company Logo"
        class="h-10"
      />
      <h1 class="text-xl font-bold">{{ config.data.company.name }}</h1>
    </header>

    <div class="w-full relative">
      <NuxtImg
        :src="config.data.banner"
        alt="Banner"
        class="w-full h-48 object-cover"
      />
      <div class="flex flex-col items-center my-4 -translate-y-1/2">
        <NuxtImg
          :src="config.data.profileImage"
          alt="Profile"
          class="w-32 h-32 rounded-full"
        />
        <h3 class="text-3xl font-bold mt-2">{{ config.data.fullName }}</h3>
        <p class="border-b">{{ config.data.profession }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-y-4 text-center">
      <div class="flex flex-col items-center">
        <Icon name="lucide:mail" class="text-3xl" />
        <span>{{ config.data.contact.email }}</span>
      </div>
      <div class="flex flex-col items-center">
        <Icon name="lucide:globe" class="text-3xl" />
        <span>{{ config.data.contact.website }}</span>
      </div>
      <div class="flex flex-col items-center">
        <Icon name="lucide:phone" class="text-3xl" />
        <span>{{ config.data.contact.phone }}</span>
      </div>
      <div class="flex flex-col items-center">
        <Icon name="lucide:map-pin" class="text-3xl" />
        <span>{{ config.data.contact.address }}</span>
      </div>
    </div>

    <footer class="flex gap-4 mt-6">
      <a
        v-for="link in config.data.socialLinks"
        :key="link.platform"
        :href="link.link"
        target="_blank"
      >
        <Icon :name="`logos:${link.platform}-icon`" class="text-xl" />
      </a>
    </footer>
  </main>
</template>
