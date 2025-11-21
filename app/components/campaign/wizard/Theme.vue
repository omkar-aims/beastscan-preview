<script setup lang="ts">
const templates = [
  {
    id: 1,
    name: "Simple Demo",
    thumbnail: "templates/template-03.png",
    description: "Simple and minimalist portfolio",
    config: `{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-UjXDmF","type":"Section","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","background":"linear-gradient(0deg, PRIMARY_COLOR, SECONDARY_COLOR)"},"content":[{"id":"element-vmibqE","type":"Container","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","justifyContent":"flex-end","alignItems":"center"},"props":{},"content":[{"id":"element-pLqTWl","type":"Image","styles":{"gridTemplateColumns":"1fr 1fr","borderRadius":"120px","margin":"1fr 1fr 1fr 1fr","boxShadow":"0px 0px 0px 0px rgba(255, 255, 255, 1)"},"props":{"src":"https://mockmind-api.uifaces.co/content/human/125.jpg","alt":"Image","width":250,"height":250},"content":null},{"id":"element-m7ucmM","type":"Heading","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1px 1px 24px 1px","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"[NAME]"},{"id":"element-HWoObk","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-5-GYc2","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24px"},"props":{"icon":"globe"},"content":null},{"id":"element-11zDdk","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Visit My Website"}]},{"id":"element-BgFOX-","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-j7CeKy","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24"},"props":{"icon":"shopping-bag"},"content":null},{"id":"element-0MiPwS","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Shop My Merch"}]},{"id":"element-avmgCp","type":"Flex","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1px 1px 24px 1px","alignItems":"center","justifyContent":"center","border":"2px solid #FFFFFF","borderRadius":"120px"},"props":{},"content":[{"id":"element-EmPtcp","type":"Icon","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","color":"#FFFFFF","fontSize":"24"},"props":{"icon":"camera"},"content":null},{"id":"element-Eq5_6-","type":"Text","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr","fontWeight":"600","color":"#FFFFFF"},"props":{"contenteditable":true},"content":"Book a shoot"}]},{"id":"element-ZCk-Im","type":"Social","styles":{"gridTemplateColumns":"1fr 1fr","margin":"1fr 1fr 1fr 1fr"},"props":{"variant":"icon-only","shape":"pill","links":[{"platform":"facebook","url":"https://www.facebook.com/yourpage"},{"platform":"instagram","url":"https://www.facebook.com/yourpage"},{"platform":"tiktok","url":"https://www.facebook.com/yourpage"}]},"content":null}]}]}]},"theme":{}}`,
  },
];

const emit = defineEmits(["done"]);

const props = defineProps<{
  config: object;
}>();

function onThemeSelect(theme) {
  const template = theme.config;

  const updatedTemplate = template.replaceAll(
    "[NAME]",
    `${props.config.firstName} ${props.config.lastName}`
  );

  emit("done", updatedTemplate);
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap gap-4 h-[256px]">
      <div
        v-for="template in templates"
        :key="template.id"
        class="rounded overflow-hidden hover:-translate-y-1 shadow transition-transform duration-200 cursor-pointer"
        @click="() => onThemeSelect(template)"
      >
        <NuxtImg
          :src="template.thumbnail"
          :alt="template.name"
          class="w-full h-full"
        />
      </div>
    </div>
  </section>
</template>
