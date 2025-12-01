<script setup lang="ts">
import { Home, Megaphone, Gift, QrCode } from "lucide-vue-next";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Campaign",
    url: "/dashboard/campaigns",
    icon: Megaphone,
  },

  {
    title: "Offers",
    url: "/dashboard/offers",
    icon: Gift,
  },
  {
    title: "QR Codes",
    url: "/dashboard/qr-codes",
    icon: QrCode,
  },
];

const userStore = useUserStore();

const projects = userStore.projects;

const route = useRoute();

function isActive(path: string) {
  if (path === "/dashboard") {
    return route.path === path;
  }

  return route.path === path || route.path.startsWith(path + "/");
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <AppSidebarProjectSwitcher v-if="projects" :projects="projects" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton
                as-child
                :is-active="isActive(item.url)"
                class="p-6"
              >
                <NuxtLink :href="`${item.url}`">
                  <component :is="item.icon" />
                  <span class="text-base">{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
