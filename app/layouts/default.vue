<script setup lang="ts">
import { useFetchUser } from "~/composables/user/useFetchUser";
import { useUserStore } from "~/stores/userStore";

const { fetchUser } = useFetchUser();
const userStore = useUserStore();

// Fetch user on layout mount if not available
onMounted(async () => {
  if (!userStore.user && userStore.token?.token) {
    console.log("Layout: Fetching user...");
    try {
      await fetchUser();
    } catch (error) {
      console.error("Layout: Failed to fetch user:", error);
    }
  }
});
const builderStore = useBuilderStore();

const route = useRoute();

const showBuilderOptions = computed(() => route.fullPath.includes("design"));

watch(
  () => route.path,
  () => {
    document.querySelector("#main")?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
);
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
            <div v-if="showBuilderOptions" class="flex gap-2">
              <StatefulButton
                :status="builderStore.draftStatus"
                variant="outline"
                @click="
                  () => {
                    if (
                      builderStore.iframeRef &&
                      builderStore.iframeRef.contentWindow
                    ) {
                      builderStore.iframeRef.contentWindow.postMessage(
                        { type: 'builderCreate' },
                        '*'
                      );
                      builderStore.setAction('draft');
                    }
                  }
                "
              >
                Save as draft
              </StatefulButton>

              <StatefulButton
                :status="builderStore.publishStatus"
                variant="default"
                @click="
                  () => {
                    if (
                      builderStore.iframeRef &&
                      builderStore.iframeRef.contentWindow
                    ) {
                      builderStore.iframeRef.contentWindow.postMessage(
                        { type: 'builderCreate' },
                        '*'
                      );
                      builderStore.setAction('published');
                    }
                  }
                "
              >
                Publish
              </StatefulButton>
            </div>

            <AppThemeToggler />
            <UserProfileDropDown />
          </div>
        </header>
        <Separator orientation="horizontal" class="h-4" />

        <div
          id="main"
          :class="[
            showBuilderOptions
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
