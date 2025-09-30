<script setup lang="ts">
const icons = [
  "bi:house",
  "bi:bell",
  "bi:envelope",
  "bi:star",
  "bi:heart",
  "bi:person",
  "bi:camera",
  "bi:chat",
  "bi:calendar",
  "bi:cart",
  "bi:gear",
  "bi:trash",
  "bi:lock",
  "bi:unlock",
  "bi:cloud",
  "bi:folder",
  "bi:file",
  "bi:check",
  "bi:x",
  "bi:arrow-up",
  "bi:arrow-down",
  "bi:arrow-left",
  "bi:arrow-right",
  "bi:search",
  "bi:plus",
  "bi:dash",
  "bi:pencil",
  "bi:download",
  "bi:upload",
  "bi:info-circle",
  "bi:question-circle",
  "bi:exclamation-triangle",
  "bi:triangle",
  "bi:bookmark",
  "bi:tag",
  "bi:emoji-smile",
  "bi:geo-alt",
  "bi:phone",
  "bi:alarm",
  "bi:mic",
  "bi:music-note",
  "bi:play-circle",
  "bi:pause-circle",
  "bi:stop-circle",
  "bi:record-circle",
  "bi:clock",
  "bi:lightbulb",
  "bi:plug",
  "bi:share",
  "bi:chat-dots",
  "bi:chat-heart",
  "bi:hand-thumbs-up",
  "bi:hand-thumbs-down",
  "bi:hand-index-thumb",
  "bi:phone",
  "bi:camera-video",
  "bi:camera-reels",
  "bi:camera-fill",
  "bi:plus-circle",
  "bi:pencil-square",
  "bi:save",
  "bi:send",
  "bi:star-fill",
  "bi:facebook",
  "bi:twitter",
  "bi:instagram",
  "bi:linkedin",
  "bi:youtube",
  "bi:tiktok",
  "bi:whatsapp",
  "bi:snapchat",
  "bi:pinterest",
  "bi:reddit",
  "bi:telegram",
  "bi:discord",
];

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const search = ref("");

const selectedIcon = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const filteredIcons = computed(() => {
  if (!search.value) return icons;
  return icons.filter((i) =>
    i.toLowerCase().includes(search.value.toLowerCase())
  );
});

function selectIcon(icon: string) {
  selectedIcon.value = icon;
}
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button variant="outline" class="flex items-center gap-2 w-xs">
        <Icon v-if="selectedIcon" :name="selectedIcon" class="text-lg" />
        <span>{{ selectedIcon ? "Change Icon" : "Choose Icon" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-72 p-3 space-y-3">
      <div class="relative">
        <Input v-model="search" placeholder="Search icons..." class="pl-8" />
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <div
        class="grid grid-cols-4 gap-3 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-card [&::-webkit-scrollbar-thumb]:bg-foreground"
      >
        <Button
          v-for="icon in filteredIcons"
          :key="icon"
          variant="ghost"
          class="py-6"
          @click="
            () => {
              selectIcon(icon);
              close();
            }
          "
        >
          <Icon :name="icon" class="text-xl" />
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
