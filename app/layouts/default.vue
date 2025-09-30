<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="h-screen overflow-y-hidden">
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <AppBreadcrumb class="hidden md:block" />
          </div>

          <div class="flex items-center gap-3">
            <NuxtLink
              v-if="route.path === '/dashboard/qr-codes'"
              to="/dashboard/qr-codes/new"
            >
              <Button>Add New</Button>
            </NuxtLink>
            <NuxtLink
              v-if="route.path === '/dashboard/contacts'"
              to="/dashboard/contacts/new"
            >
              <Button>Add New</Button>
            </NuxtLink>
            <NuxtLink
              v-if="route.path === '/dashboard/campaigns'"
              to="/dashboard/campaigns/new"
            >
              <Button>Create New</Button>
            </NuxtLink>
            <NuxtLink
              v-if="route.path === '/dashboard/contacts'"
              to="/dashboard/contacts/new"
            >
              <Button>Add New</Button>
            </NuxtLink>
            <AppThemeToggler />
            <UserProfileDropDown />
          </div>
        </header>
        <Separator orientation="horizontal" class="h-4" />

        <div
          id="main"
          :class="[
            route.path !== '/dashboard/builder' ? 'p-4 h-screen' : '',
            'h-min overflow-y-auto pb-[10%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-card [&::-webkit-scrollbar-thumb]:bg-foreground',
          ]"
        >
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
