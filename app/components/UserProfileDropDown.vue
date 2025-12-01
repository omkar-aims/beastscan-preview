<script setup lang="ts">
import { useLogout } from "~/composables/auth/useLogout";
import {
  FolderOpen,
  LogOut,
  User,
  Users,
  CirclePlus,
  EllipsisVertical,
} from "lucide-vue-next";

const { logout } = useLogout();
const showLogoutDialog = ref(false);
const showAccountDialog = ref(false);

const menuItems = [
  { label: "View Profile", href: "/user/", icon: User },
  { label: "Manage Projects", href: "/user/projects", icon: FolderOpen },
];

const logoutItem = { label: "Logout", icon: LogOut };

function closeLogout() {
  showLogoutDialog.value = false;
}
async function confirmLogout() {
  await logout();
  closeLogout();
}

const accounts = [
  {
    id: 1,
    name: "Emma Holland",
    email: "emma@gmail.com",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    active: true,
  },
  {
    id: 2,
    name: "Emma Holland (Work)",
    email: "emmawork@gmail.com",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    active: false,
  },
];
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
          <User />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuItem
        v-for="item in menuItems"
        :key="item.href"
        class="cursor-pointer"
        @click="navigateTo(item.href)"
      >
        <component :is="item.icon" class="h-4 w-4 mr-2" />
        <span>{{ item.label }}</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        class="cursor-pointer"
        @click="showAccountDialog = true"
      >
        <Users class="h-4 w-4 mr-2" />
        Switch Account
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        variant="destructive"
        class="cursor-pointer"
        @click="showLogoutDialog = true"
      >
        <component :is="logoutItem.icon" class="h-4 w-4 mr-2" />
        {{ logoutItem.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertDialog v-model:open="showLogoutDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to log out? You will be redirected to the login
          page and your local session will be cleared.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="confirmLogout">Confirm</AlertDialogAction>
        <AlertDialogCancel @click="closeLogout">Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <Dialog v-model:open="showAccountDialog">
    <DialogContent class="sm:max-w-md rounded-xl">
      <DialogHeader class="text-center">
        <DialogTitle>Manage Accounts</DialogTitle>
        <DialogDescription>
          Switch accounts or sign in and sign out.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-3 mt-4">
        <div
          v-for="account in accounts"
          :key="account.id"
          class="flex items-center justify-between px-4 py-3 rounded-xl"
        >
          <div class="flex items-center gap-3">
            <div class="relative">
              <Avatar class="w-10 h-10">
                <AvatarImage :src="account.image" />
                <AvatarFallback>{{ account.name[0] }}</AvatarFallback>
              </Avatar>
              <span
                v-if="account.active"
                class="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-background rounded-full"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-sm text-foreground">{{
                account.name
              }}</span>
              <span class="text-xs text-muted-foreground">{{
                account.email
              }}</span>
            </div>
          </div>

          <EllipsisVertical class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <Button class="w-full mt-4">
        <CirclePlus class="w-4 h-4 mr-2" />
        Add an account
      </Button>
    </DialogContent>
  </Dialog>
</template>
