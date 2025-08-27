<script setup lang="ts">
const { user, logout } = useAuthStore();

const handleLogout = () => {
  const token = useCookie<string | null>("token");
  token.value = null;
  logout();
  navigateTo("/");
};
</script>

<template>
  <div class="m-8">
    <h1 class="text-2xl font-semibold mb-2">Hello, {{ user?.email }}</h1>

    <Button @click="handleLogout">Logout</Button>
  </div>
</template>
