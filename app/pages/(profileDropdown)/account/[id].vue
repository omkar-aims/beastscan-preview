<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAccountById from "~/composables/account/useAccountById";
import { useUpdateAccount } from "~/composables/account/useUpdateAccount";

const route = useRoute();
const router = useRouter();

const { account, loading, error, fetchAccount } = useAccountById();
const { loading: updateLoading, updateAccount } = useUpdateAccount();

const isDialogOpen = ref(false);
const updateName = ref("");

const loadAccount = async () => {
  const id = route.params.id as string;
  if (id) {
    await fetchAccount(id);
  }
};

onMounted(() => {
  loadAccount();
});

const openUpdateDialog = () => {
  if (account.value) {
    updateName.value = account.value.attributes.name;
    isDialogOpen.value = true;
  }
};

const closeDialog = () => {
  isDialogOpen.value = false;
  updateName.value = "";
};

const handleUpdate = async () => {
  if (!updateName.value.trim() || !account.value) {
    return;
  }

  try {
    await updateAccount(account.value.id, {
      name: updateName.value.trim(),
    });

    // Re-fetch the account data to ensure we have the latest data
    await loadAccount();

    closeDialog();
    console.log("Account updated successfully");
  } catch (err) {
    console.error("Failed to update account:", err);
  }
};
</script>
<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Back Button -->
    <Button variant="ghost" class="mb-6" @click="router.back()" >
      <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
      Back to Accounts
    </Button>

    <!-- Loading State -->
    <div v-if="loading">
      <Card>
        <CardHeader>
          <Skeleton class="h-8 w-1/2" />
          <Skeleton class="h-4 w-1/3 mt-2" />
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-10 w-32 mt-6" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-destructive text-lg">{{ error }}</p>
      <Button class="mt-4" @click="loadAccount" >
        <Icon name="lucide:refresh-cw" class="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>

    <!-- Account Details -->
    <div v-else-if="account">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">{{ account.attributes.name }}</CardTitle>
          <CardDescription>Account Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="grid gap-2">
              <div class="flex items-center text-sm font-medium">
                <Icon
                  name="lucide:user"
                  class="mr-2 h-4 w-4 text-muted-foreground"
                />
                Name
              </div>
              <p class="text-lg pl-6">{{ account.attributes.name }}</p>
            </div>

            <div class="grid gap-2">
              <div class="flex items-center text-sm font-medium">
                <Icon
                  name="lucide:hash"
                  class="mr-2 h-4 w-4 text-muted-foreground"
                />
                Account ID
              </div>
              <p class="font-mono text-sm pl-6 text-muted-foreground">
                {{ account.id }}
              </p>
            </div>

            <div class="grid gap-2">
              <div class="flex items-center text-sm font-medium">
                <Icon
                  name="lucide:tag"
                  class="mr-2 h-4 w-4 text-muted-foreground"
                />
                Type
              </div>
              <p class="pl-6">{{ account.type }}</p>
            </div>

            <div class="pt-6">
              <Button class="w-full sm:w-auto" @click="openUpdateDialog" >
                <Icon name="lucide:edit" class="mr-2 h-4 w-4" />
                Update Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Update Account Dialog -->
    <AlertDialog v-model:open="isDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Account</AlertDialogTitle>
          <AlertDialogDescription>
            Update the account name. Click submit when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="py-4">
          <Label for="name" class="text-sm font-medium">Account Name</Label>
          <Input
            id="name"
            v-model="updateName"
            placeholder="Enter account name"
            class="mt-2"
            @keyup.enter="handleUpdate"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel @click="closeDialog">Cancel</AlertDialogCancel>
          <AlertDialogAction
          :disabled="updateLoading || !updateName.trim()"
            @click="handleUpdate"
          >
            <Icon
              v-if="updateLoading"
              name="lucide:loader-2"
              class="mr-2 h-4 w-4 animate-spin"
            />
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
