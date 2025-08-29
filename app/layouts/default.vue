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
          <AppBreadcrumb />
        </div>

        <div class="flex items-center gap-3">
          <AppThemeToggler />
          <UserProfileDropDown />
        </div>
      </header>

      <main class="p-4 pt-0">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
