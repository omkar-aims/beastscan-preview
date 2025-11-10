export interface Account {
  type: "accounts";
  id: string;
  attributes: {
    name: string;
    slug: string;           
    created_at: Date;       
    updated_at: Date;
  };
}

export interface AccountResponse {
  data: Account;
}

export interface AccountsResponse {
  data: Account[];
}

export interface UpdateAccountPayload {
  name: string;
}

export interface UseAllAccountsReturn {
  accounts: Ref<Account[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  fetchAccounts: () => Promise<void>;
}

export interface UseUpdateAccountReturn {
  updatedAccount: Ref<Account | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  updateAccount: (id: string, payload: UpdateAccountPayload) => Promise<Account>;
}