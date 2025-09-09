<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
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

      <main class="p-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
