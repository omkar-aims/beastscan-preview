import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Account, AccountResponse } from '~/types/account';
import useApiRoutes from '~/composables/useApiRoutes';
import { useUserStore } from '~/stores/userStore';

export interface UseAccountByIdReturn {
  account: Ref<Account | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  fetchAccount: (id: string) => Promise<void>;
}

export default function useAccountById(): UseAccountByIdReturn {
  const userStore = useUserStore();
  const api = useApiRoutes();

  const account: Ref<Account | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAccount = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const token = userStore.token?.token;

      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await $fetch<AccountResponse>(api.accounts.byId(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      account.value = response.data;

      // Update the account in userStore if it exists in the accounts array
      if (response.data) {
        const accountExists = userStore.accounts.some(acc => acc.id === id);
        if (accountExists) {
          const updatedAccounts = userStore.accounts.map(acc =>
            acc.id === id ? response.data : acc
          );
          userStore.setAccounts(updatedAccounts);
        }
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch account';
      console.error('Error fetching account:', e);
    } finally {
      loading.value = false;
    }
  };

  return {
    account,
    loading,
    error,
    fetchAccount,
  };
}