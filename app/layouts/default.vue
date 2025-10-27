<script setup lang="ts">
import { Check } from "lucide-vue-next";
const builderStore = useBuilderStore();
</script>

<template>
  <div class="h-screen overflow-y-hidden">
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset class="min-h-screen">
        <header
          class="bg-card flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <AppBreadcrumb class="hidden md:block" />
          </div>

          <div class="flex items-center gap-3">
            <Button
              v-if="builderStore.isBuilderOpen"
              @click="
                () => {
                  if (builderStore.action) builderStore.action();
                }
              "
            >
              <Check />
              <span>Done</span>
            </Button>

            <AppThemeToggler />
            <UserProfileDropDown />
          </div>
        </header>
        <Separator orientation="horizontal" class="h-4" />

        <div
          id="main"
          :class="[
            builderStore.isBuilderOpen
              ? 'h-[90vh] p-0 overflow-y-hidden'
              : 'p-4 h-screen pb-[10%]',
            'overflow-y-auto  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-card [&::-webkit-scrollbar-thumb]:bg-foreground',
          ]"
        >
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
