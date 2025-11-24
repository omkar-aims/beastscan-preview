<script setup lang="ts">
const templates = [
  {
    id: 1,
    name: "Simple Demo",
    thumbnail: "templates/template-04.png",
    description: "Simple and minimalist portfolio",
    config: `{"head":{"title":"Untitled Page","description":""},"body":{"elements":[{"id":"element-R-LX_L","type":"Section","styles":{"margin":"0","padding":"0"},"content":[{"id":"element-tmLMSy","type":"Flex","styles":{"margin":"0","padding":"0"},"props":{"class":"relative"},"content":[{"id":"element-Ajenmp","type":"Image","props":{"src":"[BANNER_IMAGE]","alt":"Image","width":"100%","class":"aspect-[3/1]"},"content":null},{"id":"element-tKiKcc","type":"Image","styles":{"margin":"0","borderRadius":"100%","border":"6px solid #FFFFFF","boxShadow":"0 8px 24px rgba(0, 0, 0, 0.15)"},"props":{"src":"[PROFILE_IMAGE]","alt":"Profile Picture","width":140,"height":140,"class":"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"},"content":null}]},{"id":"element-CXohQH","type":"Flex","styles":{"margin":"6rem 0 0 0","flexDirection":"column","alignItems":"center"},"props":{},"content":[{"id":"element-VicgWC","type":"Heading","props":{"contenteditable":true},"content":"[TITLE]"},{"id":"element-uJiton","type":"Text","props":{"contenteditable":true},"content":"[TEXT]"},{"id":"element-N4iTP4","type":"Social","styles":{"margin":"0"},"props":{"variant":"icon-only","shape":"pill","links":[SOCIAL_LINKS]},"content":null},{"id":"element-3BtRYx","type":"Button","styles":{"margin":"1rem 0 0 0","borderRadius":"100px","background":"[PRIMARY_COLOR]","padding":"1.4rem"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[PRIMARY_BUTTON]"},{"id":"element-MB6aew","type":"Button","styles":{"margin":"0","borderRadius":"100px","background":"#FFFFFF","padding":"1.4rem","border":"2px solid [PRIMARY_COLOR]","color":"[PRIMARY_COLOR]"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"[SECONDARY_BUTTON]"}]}]}]},"theme":{}}`,
  },
  {
    id: 2,
    name: "Simple Demo",
    thumbnail: "templates/template-04.png",
    description: "Simple and minimalist portfolio",
    config: `{"head":{"title":"Professional Profile","description":""},"body":{"elements":[{"id":"element-A1B2C3","type":"Section","content":[{"id":"element-CXohQH","type":"Flex","styles":{"flexDirection":"column","alignItems":"center"},"props":{},"content":[{"id":"element-tKiKcc","type":"Image","styles":{"margin":"0","borderRadius":"100%"},"props":{"src":"[PROFILE_IMAGE]","alt":"Image","width":200,"height":200},"content":null},{"id":"element-VicgWC","type":"Heading","styles":{"color":"[PRIMARY_COLOR]"},"props":{"contenteditable":true},"content":"Jean Smith"},{"id":"element-uJiton","type":"Text","styles":{"color":"[PRIMARY_COLOR]"},"props":{"contenteditable":true},"content":"Product Manager | Entrepreneur | Speaker"},{"id":"element-N4iTP4","type":"Social","styles":{"margin":"0"},"props":{"variant":"icon-only","shape":"pill","links":[SOCIAL_LINKS]},"content":null},{"id":"element-3BtRYx","type":"Button","styles":{"margin":"1rem 0 0 0","borderRadius":"100px","background":"#ffec99","fontWeight":"700","color":"#333333","padding":"1.4rem"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"Schedule Meeting"},{"id":"element-MB6aew","type":"Button","styles":{"gridTemplateColumns":"1fr 1fr","margin":"0","borderRadius":"100px","background":"#ffec99","padding":"1.4rem","fontWeight":"700","color":"#333333"},"props":{"contenteditable":true,"variant":"default","class":"w-full max-w-md"},"content":"View Portfolio"}]}],"props":{"class":"bg-no-repeat bg-cover bg-[url([BANNER_IMAGE])]"}}]},"theme":{}}`,
  },
];

const emit = defineEmits(["done"]);

const props = defineProps<{
  config: object;
}>();

function onThemeSelect(theme) {
  const template = theme.config;

  let updatedTemplate = template.replaceAll(
    "[TITLE]",
    `${props.config.firstName} ${props.config.lastName}`
  );

  updatedTemplate = updatedTemplate.replaceAll("[TEXT]", props.config.note);

  if (props.config.profileImage)
    updatedTemplate = updatedTemplate.replaceAll(
      "[PROFILE_IMAGE]",
      props.config.profileImage
    );

  updatedTemplate = updatedTemplate.replaceAll(
    "[BANNER_IMAGE]",
    "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  updatedTemplate = updatedTemplate.replaceAll(
    "[PRIMARY_BUTTON]",
    props.config.primaryButton
  );
  updatedTemplate = updatedTemplate.replaceAll(
    "[SECONDARY_BUTTON]",
    props.config.secondaryButton
  );

  updatedTemplate = updatedTemplate.replaceAll(
    "[SOCIAL_LINKS]",
    JSON.stringify(props.config.socialLinks)
  );

  console.log(updatedTemplate);

  emit("done", updatedTemplate);
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap gap-4 h-[256px]">
      <div
        v-for="template in templates"
        :key="template.id"
        class="w-[320px] rounded overflow-hidden hover:-translate-y-1 shadow transition-transform duration-200 cursor-pointer"
        @click="() => onThemeSelect(template)"
      >
        <NuxtImg
          :src="template.thumbnail"
          :alt="template.name"
          class="h-full"
        />
      </div>
    </div>
  </section>
</template>
