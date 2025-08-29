<script setup lang="ts">
const menuItems = [
  { label: "View Profile", href: "/account", icon: "lucide:user" },
  { label: "Settings", href: "/settings", icon: "lucide:settings" },
  { label: "My Orders", href: "/orders", icon: "lucide:shopping-bag" },
  { label: "My Loyalty", href: "/loyalty", icon: "lucide:heart" },
  { label: "My Clip Cards", href: "/clip-cards", icon: "lucide:credit-card" },
  { label: "Billing & Subscription", href: "/billing", icon: "lucide:receipt" },
  { label: "Referrals", href: "/referrals", icon: "lucide:share-2" },
  { label: "Integrations", href: "/integrations", icon: "lucide:layers" },
];

const logoutItem = {
  label: "Logout",
  href: "/logout",
  icon: "lucide:log-out",
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/300"
          alt="User profile"
          class="select-none"
        />

        <AvatarFallback>
          <Icon
            name="lucide:circle-user-round"
            class="text-3xl text-gray-700"
          />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel>
        <p class="text-sm font-bold leading-none mb-0.5">user</p>
        <p class="text-xs leading-none text-muted-foreground">
          user@example.com
        </p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem v-for="item in menuItems" :key="item.href" as-child>
        <a :href="item.href" class="flex items-center gap-2">
          <Icon :name="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </a>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem as-child>
        <a :href="logoutItem.href" class="flex items-center gap-2">
          <Icon :name="logoutItem.icon" class="h-4 w-4" />
          {{ logoutItem.label }}
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
