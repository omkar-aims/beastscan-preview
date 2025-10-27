<script setup lang="ts">
import {
  Home,
  Megaphone,
  FileText,
  Gift,
  QrCode,
  Zap,
  GalleryVerticalEnd,
} from "lucide-vue-next";

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
    title: "Forms",
    url: "/dashboard/forms",
    icon: FileText,
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
  {
    title: "Devices",
    url: "/dashboard/devices",
    icon: Zap,
  },
];

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Free",
  },
  {
    name: "Acme Corp.",
    plan: "Startup",
    logo: GalleryVerticalEnd,
  },
  {
    name: "Evil Corp.",
    plan: "Free",
    logo: GalleryVerticalEnd,
  },
];

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
      <AppSidebarTeamSwitcher :teams="teams" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup class="px-0">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child :is-active="isActive(item.url)">
                <NuxtLink :href="item.url">
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
