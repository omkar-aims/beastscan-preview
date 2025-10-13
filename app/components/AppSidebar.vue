<script setup lang="ts">
import {
  Megaphone,
  FileText,
  Globe,
  Gift,
  Store,
  Users,
  UserRoundCheck,
  Mail,
  LayoutDashboard,
  QrCode,
  ChevronRight,
  PartyPopper,
} from "lucide-vue-next";

const menu = [
  {
    title: "Campaigns",
    icon: Megaphone,
    items: [
      {
        title: "Forms",
        url: "/dashboard/forms",
        icon: FileText,
      },
      {
        title: "Pages",
        url: "/dashboard/pages",
        icon: Globe,
      },
      {
        title: "Loyalty",
        url: "/dashboard/loyalty",
        icon: Gift,
      },
      {
        title: "Store",
        url: "/dashboard/store",
        icon: Store,
      },
    ],
  },
  {
    title: "CRM",
    icon: Users,
    items: [
      {
        title: "Leads",
        url: "/dashboard/leads",
        icon: UserRoundCheck,
      },
      {
        title: "Mailer",
        url: "/dashboard/mailer",
        icon: Mail,
      },
    ],
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
      <AppLogoFull />
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent class="space-y-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child :is-active="isActive('/dashboard')">
                <NuxtLink
                  to="/dashboard"
                  class="w-full flex items-center gap-2 transition-colors duration-200"
                >
                  <LayoutDashboard class="w-4 h-4" />
                  Dashboard
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                as-child
                :is-active="isActive('/dashboard/qr-codes')"
              >
                <NuxtLink
                  to="/dashboard/qr-codes"
                  class="w-full flex items-center gap-2 transition-colors duration-200"
                >
                  <QrCode class="w-4 h-4" />
                  QR codes
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarMenu>
            <Collapsible
              v-for="item in menu"
              :key="item.title"
              :default-open="true"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="flex justify-between cursor-pointer transition-colors duration-200"
                  >
                    <div class="flex items-center gap-2">
                      <component :is="item.icon" class="w-4 h-4" />
                      {{ item.title }}
                    </div>
                    <ChevronRight class="w-4 h-4" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton
                        as-child
                        :is-active="isActive(subItem.url)"
                      >
                        <NuxtLink
                          :to="subItem.url"
                          class="w-full flex items-center gap-2 transition-colors duration-200"
                        >
                          <component :is="subItem.icon" class="w-4 h-4" />
                          {{ subItem.title }}
                        </NuxtLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
          <SideberMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                as-child
                :is-active="isActive('/dashboard/qr-codes')"
              >
                <NuxtLink
                  to="/dashboard/offers"
                  class="w-full flex items-center gap-2 transition-colors duration-200"
                >
                  <PartyPopper  class="w-4 h-4" />
                  Offers
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SideberMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
