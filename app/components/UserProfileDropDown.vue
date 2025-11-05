<script setup lang="ts">
import { ref } from "vue";

import { Icon } from "@iconify/vue";
import { useLogout } from "~/composables/auth/useLogout";

const { logout } = useLogout();
const showLogoutDialog = ref(false);

const menuItems = [
  { label: "View Profile", href: "/profile", icon: "lucide:user" },
  { label: "Accounts", href: "/accounts", icon: "lucide:users" },
];

const logoutItem = { label: "Logout", icon: "lucide:log-out" };

function openLogout() {
  // stop menu default behavior by opening the dialog via state
  showLogoutDialog.value = true;
}
function closeLogout() {
  showLogoutDialog.value = false;
}
async function confirmLogout() {
  await logout();
  closeLogout();
}
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
      <!-- <DropdownMenuLabel>
        <p class="text-sm font-bold leading-none mb-0.5">user</p>
        <p class="text-xs leading-none text-muted-foreground">
          user@example.com
        </p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator /> -->

      <DropdownMenuItem v-for="item in menuItems" :key="item.href" as-child>
        <NuxtLink :to="item.href" class="flex items-center gap-2 w-full">
          <Icon :icon="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </NuxtLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <!-- Logout item: use a button and stop propagation so menu doesn't auto-close/navigation -->
      <DropdownMenuItem as-child>
        <button
          type="button"
          class="flex items-center gap-2 w-full text-red-600"
          @click.stop="openLogout"
        >
          <Icon :icon="logoutItem.icon" class="h-4 w-4" />
          {{ logoutItem.label }}
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- AlertDialog controlled by showLogoutDialog -->
  <AlertDialog
    :open="showLogoutDialog"
    @openChange="(v) => (showLogoutDialog = v)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to log out? You will be redirected to the login
          page and your local session will be cleared.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeLogout">Cancel</AlertDialogCancel>
        <!-- Confirm runs logout then closes dialog -->
        <AlertDialogAction @click="confirmLogout">Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
