<script setup lang="ts">
const menu = [
  {
    title: "menu.campaigns",
    icon: "lucide:megaphone",
    items: [
      {
        title: "menu.forms",
        url: "dashboard/forms",
        icon: "lucide:file-text",
      },
      {
        title: "menu.sites",
        url: "dashboard/sites",
        icon: "lucide:globe",
      },
      {
        title: "menu.vcards",
        url: "dashboard/vcards",
        icon: "lucide:id-card",
      },
    ],
  },
  {
    title: "menu.crm",
    icon: "lucide:users",
    items: [
      {
        title: "menu.leads",
        url: "dashboard/leads",
        icon: "lucide:user-round-check",
      },
      {
        title: "menu.mailer",
        url: "dashboard/mailer",
        icon: "lucide:mail",
      },
    ],
  },
  {
    title: "menu.store",
    icon: "lucide:shopping-bag",
    items: [
      {
        title: "menu.products",
        url: "dashboard/products",
        icon: "lucide:package",
      },
      {
        title: "menu.ecommerce",
        url: "dashboard/e-commerce",
        icon: "lucide:shopping-cart",
      },
    ],
  },
  {
    title: "menu.loyalty",
    icon: "lucide:tag",
    items: [
      {
        title: "menu.stampCards",
        url: "dashboard/stamp-cards",
        icon: "lucide:ticket",
      },
      {
        title: "menu.giftCards",
        url: "dashboard/gift-cards",
        icon: "lucide:gift",
      },
      { title: "menu.offersList", url: "offers/list", icon: "lucide:tags" },
      {
        title: "menu.giveaway",
        url: "dashboard/giveaway",
        icon: "lucide:party-popper",
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
              <SidebarMenuButton>
                <NuxtLink
                  to="/dashboard"
                  class="w-full flex items-center gap-2"
                >
                  <Icon name="lucide:layout-dashboard" />
                  Dashboard
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton class="flex items-center gap-2">
                <NuxtLink
                  to="/dashboard/qr-codes"
                  class="w-full flex items-center gap-2"
                >
                  <Icon name="lucide:qr-code" />
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
                    class="flex justify-between cursor-pointer"
                  >
                    <div class="flex items-center gap-2">
                      <Icon :name="item.icon" />
                      {{ $t(item.title) }}
                    </div>
                    <Icon name="lucide:chevron-right" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton>
                        <NuxtLink
                          :to="`/${subItem.url}`"
                          class="w-full flex items-center gap-2"
                        >
                          <Icon :name="subItem.icon" />
                          {{ $t(subItem.title) }}
                        </NuxtLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem></Collapsible
            >
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
