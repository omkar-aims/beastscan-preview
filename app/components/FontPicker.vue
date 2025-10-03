<script setup>
import { Search } from "lucide-vue-next";

const fonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Poppins",
  "Montserrat",
  "Inter",
  "Nunito",
  "Raleway",
  "Work Sans",
  "Mulish",
  "Merriweather",
  "Playfair Display",
  "Lora",
  "Crimson Text",
  "Bitter",
  "EB Garamond",
  "Cormorant Garamond",
  "Cardo",
  "Alegreya",
  "Domine",
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Abril Fatface",
  "Righteous",
  "Kanit",
  "Fredoka",
  "Alfa Slab One",
  "Pacifico",
  "Dancing Script",
  "Great Vibes",
  "Caveat",
  "Amatic SC",
  "Sacramento",
  "Shadows Into Light",
  "Indie Flower",
  "Roboto Mono",
  "Fira Code",
  "JetBrains Mono",
  "Space Mono",
  "Inconsolata",
];

const search = ref("");
const selectedFont = ref("");

const filteredFonts = computed(() => {
  if (!search.value) return fonts;
  return fonts.filter((f) =>
    f.toLowerCase().includes(search.value.toLowerCase())
  );
});

function selectFont(font) {
  selectedFont.value = font;
}
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button variant="outline" class="flex items-center gap-2 w-full">
        <span v-if="selectedFont" class="truncate max-w-[120px]">
          {{ selectedFont }}
        </span>
        <span v-else>Choose Font</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-xs p-3 space-y-3">
      <div class="relative">
        <Input v-model="search" placeholder="Search fonts..." class="pl-8" />
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <div
        class="max-h-72 overflow-y-auto pr-2 space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-card [&::-webkit-scrollbar-thumb]:bg-foreground"
      >
        <Button
          v-for="font in filteredFonts"
          :key="font"
          variant="ghost"
          class="w-full flex items-center justify-center text-base"
          @click="
            () => {
              selectFont(font);
              close();
            }
          "
        >
          {{ font }}
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
