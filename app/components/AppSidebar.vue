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
} from "lucide-vue-next";

const menu = [
  {
    title: "Campaigns",
    icon: Megaphone,
    items: [
      {
        title: "Forms",
        url: "dashboard/forms",
        icon: FileText,
      },
      {
        title: "Pages",
        url: "dashboard/pages",
        icon: Globe,
      },
      {
        title: "Loyalty",
        url: "dashboard/loyalty",
        icon: Gift,
      },
      {
        title: "Store",
        url: "dashboard/store",
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
        url: "dashboard/leads",
        icon: UserRoundCheck,
      },
      {
        title: "Mailer",
        url: "dashboard/mailer",
        icon: Mail,
      },
    ],
  },
];
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <AppLogoFull />
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
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
              <SidebarMenuButton as-child>
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
              :default-open="false"
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
                      <SidebarMenuSubButton as-child>
                        <NuxtLink
                          :to="`/${subItem.url}`"
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
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
