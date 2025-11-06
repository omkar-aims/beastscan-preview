<script setup lang="ts">
import { Search, X, Plus } from "lucide-vue-next";

defineProps<{
  disableRemove: boolean;
}>();

const allTags = ref([
  { name: "Design", color: "#E57373" },
  { name: "Development", color: "#64B5F6" },
  { name: "Marketing", color: "#FFD54F" },
  { name: "Research", color: "#81C784" },
  { name: "Finance", color: "#BA68C8" },
  { name: "Testing", color: "#4DB6AC" },
  { name: "UI/UX", color: "#FF8A65" },
  { name: "Analytics", color: "#90A4AE" },
]);

const search = ref("");
const selectedTags = ref([
  { name: "Design", color: "#E57373" },
  { name: "Development", color: "#64B5F6" },
]);

const filteredTags = computed(() => {
  if (!search.value) return allTags.value;
  return allTags.value.filter((t) =>
    t.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

function toggleTag(tag) {
  const exists = selectedTags.value.find((t) => t.name === tag.name);
  if (exists) {
    selectedTags.value = selectedTags.value.filter((t) => t.name !== tag.name);
  } else {
    selectedTags.value.push(tag);
  }
}

function addCustomTag() {
  const name = search.value.trim();
  if (!name || allTags.value.some((t) => t.name === name)) return;

  const color = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  const newTag = { name, color };

  allTags.value.push(newTag);
  selectedTags.value.push(newTag);
  search.value = "";
}
</script>

<template>
  <div class="w-full space-y-3">
    <div class="flex flex-wrap gap-2">
      <div
        v-for="tag in selectedTags"
        :key="tag.name"
        class="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-foreground/90 shadow-sm"
        :style="{ backgroundColor: tag.color + '33' }"
      >
        <span
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: tag.color }"
        />
        <span>{{ tag.name }}</span>
        <X
          v-if="!disableRemove"
          class="w-4 h-4 cursor-pointer hover:text-destructive/80"
          @click="toggleTag(tag)"
        />
      </div>

      <Popover>
        <PopoverTrigger as-child>
          <slot />
        </PopoverTrigger>

        <PopoverContent class="w-xs p-3 space-y-3">
          <div class="relative">
            <Input
              v-model="search"
              placeholder="Search tag"
              class="pl-8 bg-card"
            />
            <Search
              class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            />
          </div>

          <div
            class="max-h-60 overflow-y-auto pr-2 space-y-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted rounded-md"
          >
            <Button
              v-for="tag in filteredTags"
              :key="tag.name"
              variant="ghost"
              size="sm"
              class="w-full justify-start flex items-center gap-2"
              :class="{
                'bg-primary/10 text-primary': selectedTags.some(
                  (t) => t.name === tag.name
                ),
              }"
              @click="toggleTag(tag)"
            >
              <span
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: tag.color }"
              />
              {{ tag.name }}
            </Button>

            <Button
              v-if="search && !filteredTags.some((t) => t.name === search)"
              variant="outline"
              size="sm"
              class="w-full justify-start text-muted-foreground"
              @click="addCustomTag"
            >
              <Plus class="w-4 h-4 mr-2" /> Create “{{ search }}”
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
