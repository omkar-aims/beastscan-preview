
<script setup lang="ts">

import { useAllAccounts } from '~/composables/account/useAllAccounts';

const router = useRouter();
const { accounts, loading, error, fetchAccounts } = useAllAccounts();

onMounted(() => {
  fetchAccounts();
});

const navigateToAccount = (id: string) => {
  router.push(`/account/${id}`);
};
</script>
<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">All Accounts</h1>
      <p class="text-muted-foreground mt-2">Manage your accounts</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="i in 3" :key="i">
        <CardHeader>
          <Skeleton class="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-4 w-full mb-2" />
          <Skeleton class="h-10 w-32 mt-4" />
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-destructive text-lg">{{ error }}</p>
      <Button class="mt-4" @click="fetchAccounts" >
        <Icon name="lucide:refresh-cw" class="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>

    <!-- Empty State -->
    <div v-else-if="accounts.length === 0" class="text-center py-12">
      <p class="text-muted-foreground text-lg">No accounts found</p>
    </div>

    <!-- Accounts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="account in accounts" :key="account.id" class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{{ account.attributes.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-muted-foreground">
              <Icon name="lucide:hash" class="mr-2 h-4 w-4" />
              <span class="font-mono text-xs">{{ account.id }}</span>
            </div>
            <div class="flex items-center text-sm text-muted-foreground">
              <Icon name="lucide:tag" class="mr-2 h-4 w-4" />
              <span>{{ account.type }}</span>
            </div>
          </div>
          <Button class="w-full" @click="navigateToAccount(account.id)" >
            <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
            Show Details
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
