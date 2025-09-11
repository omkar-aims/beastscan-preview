<script setup lang="ts">
const items = [
  { title: "Dashboard", url: "", icon: "lucide:layout-dashboard" },
  { title: "QR Codes", url: "qr-codes", icon: "lucide:qr-code" },
  { title: "Campaigns", url: "campaigns", icon: "lucide:megaphone" },
  { title: "Lead Tools", url: "lead-tools", icon: "lucide:users" },
  { title: "Devices", url: "devices", icon: "lucide:tablet-smartphone" },
  { title: "Contacts", url: "contacts", icon: "lucide:contact" },
  { title: "Products", url: "products", icon: "lucide:package" },
  { title: "Loyalty", url: "loyalty", icon: "lucide:gift" },
  { title: "Mailer", url: "mailer", icon: "lucide:mail" },
  { title: "Offers", url: "offers", icon: "lucide:tag" },
];

const route = useRoute();
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
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton
                as-child
                :is-active="
                  item.url
                    ? route.path.startsWith(`/dashboard/${item.url}`)
                    : route.path === '/dashboard'
                "
              >
                <NuxtLink
                  :to="`/dashboard/${item.url}`"
                  class="flex items-center gap-2"
                >
                  <Icon :name="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
