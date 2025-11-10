import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Account, AccountsResponse, UseAllAccountsReturn } from '~/types/account';
import useApiRoutes from '~/composables/useApiRoutes';
import { useUserStore } from '~/stores/userStore';

export const useAllAccounts = (): UseAllAccountsReturn => {
  const userStore = useUserStore();
  const api = useApiRoutes();

  const accounts: Ref<Account[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAccounts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<AccountsResponse>(api.accounts.all, {
        headers: {
          Authorization: `Bearer ${userStore.token?.token ?? ''}`,
        },
      });

      accounts.value = response.data;
      
      // Store accounts in userStore
      if (response.data) {
        userStore.setAccounts(response.data);
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch accounts';
      console.error('Error fetching accounts:', e);
    } finally {
      loading.value = false;
    }
  };

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
  };
};