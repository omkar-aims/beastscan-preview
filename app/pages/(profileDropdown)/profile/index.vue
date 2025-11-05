<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useFetchUser } from "~/composables/user/useFetchUser";
import { useUserStore } from "~/stores/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, AlertCircle } from "lucide-vue-next";

const userStore = useUserStore();
const { fetchUser } = useFetchUser();

const isLoading = ref(false);
const error = ref<string | null>(null);

const loadUserData = async () => {
  if (userStore.user) return;

  isLoading.value = true;
  error.value = null;

  try {
    await fetchUser();
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to load profile data";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadUserData();
});

const userId = computed(() => {
  if (!userStore.user) return "";
  if ("attributes" in userStore.user) {
    return (userStore.user as any).id;
  }
  return userStore.user.id;
});

const userEmail = computed(() => {
  if (!userStore.user) return "";
  if ("attributes" in userStore.user) {
    return (userStore.user as any).attributes.email;
  }
  return userStore.user.email;
});

const userRoles = computed(() => {
  if (!userStore.user) return [];
  if ("attributes" in userStore.user) {
    return (userStore.user as any).attributes.public_roles || [];
  }
  return userStore.user.publicRoles || [];
});

const retryFetch = () => {
  loadUserData();
};
</script>

<template>
  <div class="container mx-auto py-8 px-4 max-w-4xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight">Profile</h1>
      <p class="text-muted-foreground mt-2">
        Manage your account information and settings
      </p>
    </div>

    <Card v-if="isLoading" class="w-full">
      <CardHeader>
        <Skeleton class="h-8 w-48 mb-2" />
        <Skeleton class="h-4 w-64" />
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Skeleton class="h-4 w-20" />
          <Skeleton class="h-10 w-full" />
        </div>
        <div class="space-y-2">
          <Skeleton class="h-4 w-24" />
          <Skeleton class="h-10 w-full" />
        </div>
        <div class="space-y-2">
          <Skeleton class="h-4 w-16" />
          <Skeleton class="h-8 w-32" />
        </div>
      </CardContent>
    </Card>

    <Alert v-else-if="error" variant="destructive" class="mb-6">
      <AlertCircle class="h-4 w-4" />
      <AlertDescription class="flex items-center justify-between">
        <span>{{ error }}</span>
        <button
          class="ml-4 px-3 py-1 text-sm font-medium rounded-md bg-white text-red-600 hover:bg-red-50 transition-colors"
          @click="retryFetch"
        >
          Retry
        </button>
      </AlertDescription>
    </Alert>

    <Card v-else-if="userStore.user" class="w-full">
      <CardHeader>
        <div class="flex items-center gap-3">
          <div
            class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <User class="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your profile details and roles</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <label
            class="text-sm font-medium text-muted-foreground flex items-center gap-2"
          >
            <Shield class="h-4 w-4" />
            User ID
          </label>
          <div class="p-3 bg-muted rounded-md font-mono text-sm break-all">
            {{ userId }}
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-sm font-medium text-muted-foreground flex items-center gap-2"
          >
            <Mail class="h-4 w-4" />
            Email Address
          </label>
          <div class="p-3 bg-muted rounded-md text-sm">
            {{ userEmail || "No email available" }}
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-sm font-medium text-muted-foreground flex items-center gap-2"
          >
            <Shield class="h-4 w-4" />
            Public Roles
          </label>
          <div class="flex flex-wrap gap-2">
            <template v-if="userRoles.length > 0">
              <Badge v-for="role in userRoles" :key="role" variant="secondary">
                {{ role }}
              </Badge>
            </template>
            <span v-else class="text-sm text-muted-foreground italic">
              No roles assigned
            </span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Alert v-else>
      <AlertCircle class="h-4 w-4" />
      <AlertDescription>
        No user data available. Please try refreshing the page.
      </AlertDescription>
    </Alert>
  </div>
</template>
