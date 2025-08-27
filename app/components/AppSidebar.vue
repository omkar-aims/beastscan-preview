<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: "lucide:home",
  },
  {
    title: "Inbox",
    url: "#",
    icon: "lucide:inbox",
  },
  {
    title: "Calendar",
    url: "#",
    icon: "lucide:calendar",
  },
  {
    title: "Search",
    url: "#",
    icon: "lucide:search",
  },
  {
    title: "Settings",
    url: "#",
    icon: "lucide:settings",
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <a :href="item.url" class="flex items-center gap-2">
                  <Icon :name="item.icon" class="w-4 h-4" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
