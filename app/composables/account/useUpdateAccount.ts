import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Account, UpdateAccountPayload, UseUpdateAccountReturn } from '~/types/account';
import useApiRoutes from '~/composables/useApiRoutes';
import { useUserStore } from '~/stores/userStore';

export const useUpdateAccount = (): UseUpdateAccountReturn => {
  const userStore = useUserStore();
  const api = useApiRoutes();

  const updatedAccount: Ref<Account | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const updateAccount = async (id: string, payload: UpdateAccountPayload): Promise<Account> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<any>(
        api.accounts.update(id),
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${userStore.token?.token ?? ''}`,
          },
          body: payload,
        }
      );

      const accountData = response?.data || response;
      updatedAccount.value = accountData;

      // Update the account in userStore
      if (accountData) {
        const updatedAccounts = userStore.accounts.map(acc => 
          acc.id === id ? accountData : acc
        );
        userStore.setAccounts(updatedAccounts);
      }

      return accountData;
    } catch (e: any) {
      error.value = e.message || 'Failed to update account';
      console.error('Error updating account:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    updatedAccount,
    loading,
    error,
    updateAccount,
  };
};