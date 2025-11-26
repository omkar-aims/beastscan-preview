<script setup lang="ts">
const templates = [
  {
    id: 1,
    name: "Classic Card",
    thumbnail: "templates/vcard/classic.svg",
    description: "Traditional centered layout with profile image at the top",
    config: `{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-R-LX_L","type":"Section","styles":{"margin":"0","padding":"0"},"content":[{"id":"element-tmLMSy","type":"Flex","styles":{"margin":"0","padding":"0"},"props":{"class":"relative"},"content":[{"id":"element-Ajenmp","type":"Image","props":{"src":"[BANNER_IMAGE]","alt":"Image","width":"100%","class":"cover-image"},"content":null},{"id":"element-tKiKcc","type":"Image","styles":{"margin":"0","borderRadius":"100%","border":"6px solid #FFFFFF","boxShadow":"0 8px 24px rgba(0, 0, 0, 0.15)"},"props":{"src":"[PROFILE_IMAGE]","alt":"Profile Picture","width":140,"height":140,"class":"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"},"content":null}]},{"id":"element-CXohQH","type":"Flex","styles":{"margin":"4rem 0 0 0","flexDirection":"column","alignItems":"center"},"props":{},"content":[{"id":"element-VicgWC","type":"Heading","props":{"contenteditable":true},"content":"[TITLE]"},{"id":"element-uJiton","type":"Text","props":{"contenteditable":true},"content":"[TEXT]"},{"id":"element-N4iTP4","type":"Social","styles":{"margin":"0"},"props":{"variant":"icon-only","shape":"pill","links":[SOCIAL_LINKS]},"content":null},{"content":[{"id":"element-3BtRYx","type":"Button","styles":{"margin":"1rem 0 0 0","borderRadius":"100px","background":"[PRIMARY_COLOR]","padding":"1.4rem"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[PRIMARY_BUTTON]"},{"id":"element-MB6aew","type":"Button","styles":{"margin":"0","borderRadius":"100px","background":"#FFFFFF","padding":"1.4rem","border":"2px solid [PRIMARY_COLOR]","color":"[PRIMARY_COLOR]"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[SECONDARY_BUTTON]"}],"id":"element-ETjuQe","props":{},"styles":{"flexDirection":"column","alignItems":"center","padding":"0 1rem 0 1rem"},"type":"Flex"}]}]}]},"theme":{}}`,
  },
  {
    id: 2,
    name: "Minimal List",
    thumbnail: "templates/vcard/minimal.svg",
    description: "Clean, link-focused design for maximum simplicity",
    config: `{"head":{"title":"Professional Profile","description":""},"body":{"elements":[{"id":"element-A1B2C3","type":"Section","content":[{"id":"element-CXohQH","type":"Flex","styles":{"flexDirection":"column","alignItems":"center"},"props":{},"content":[{"id":"element-tKiKcc","type":"Image","styles":{"margin":"0","borderRadius":"100%","border":"6px solid #FFFFFF"},"props":{"src":"[PROFILE_IMAGE]","alt":"Image","width":200,"height":200},"content":null},{"id":"element-VicgWC","type":"Heading","styles":{"color":"#ffffff"},"props":{"contenteditable":true},"content":"[TITLE]"},{"id":"element-uJiton","type":"Text","styles":{"color":"#ffffff"},"props":{"contenteditable":true},"content":"[TEXT]"},{"id":"element-N4iTP4","type":"Social","styles":{"margin":"0"},"props":{"variant":"icon-only","shape":"pill","links":[SOCIAL_LINKS]},"content":null},{"content":[{"id":"element-3BtRYx","type":"Button","styles":{"margin":"1rem 0 0 0","borderRadius":"100px","background":"#ffffff","fontWeight":"700","color":"#333333","padding":"1.4rem"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[PRIMARY_BUTTON]"},{"id":"element-MB6aew","type":"Button","styles":{"margin":"0","borderRadius":"100px","background":"#ffffff","padding":"1.4rem","fontWeight":"700","color":"#333333"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[SECONDARY_BUTTON]"}],"id":"element-ETjuQe","props":{},"styles":{"flexDirection":"column","alignItems":"center","padding":"0 1rem 0 1rem"},"type":"Flex"}]}],"props":{"class":"h-screen"}, "styles": {"background": "linear-gradient(0deg, [PRIMARY_COLOR], [SECONDARY_COLOR])"}}]},"theme":{}}`,
  },
];

const emit = defineEmits(["done"]);

function onThemeSelect(theme: (typeof templates)[0]) {
  const template = theme.config;
  emit("done", template);
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap gap-4">
      <div
        v-for="template in templates"
        :key="template.id"
        class="h-[412px] overflow-hidden group relative cursor-pointer rounded-3xl"
        @click="() => onThemeSelect(template)"
      >
        <NuxtImg
          :src="template.thumbnail"
          :alt="template.name"
          class="h-full w-auto"
        />

        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4"
        >
          <h3 class="text-white text-lg font-semibold">
            {{ template.name }}
          </h3>
          <p class="text-white/80 text-sm">
            {{ template.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
