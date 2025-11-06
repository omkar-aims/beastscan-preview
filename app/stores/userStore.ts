import { defineStore } from "pinia";
import type { Token, Account, Project } from "@/types";
import type { User } from "~/types/user";

export const useUserStore = defineStore("user", () => {
  const token = ref<Token>({
    token: null,
    refreshToken: null,
  });

  const user = ref<User | null>(null);

  const accounts = ref<Account[]>([]);
  const projects = ref<Project[]>([]);

  const activeAccountId = useCookie<string | null>("activeAccountId");
  const activeProjectId = useCookie<string | null>("activeProjectId");

  const tempCredentials = ref<{ email: string; password: string } | null>(null);

  const activeAccount = computed(
    () => accounts.value.find((acc) => acc.id === activeAccountId.value) ?? null
  );

  const activeProject = computed(
    () =>
      projects.value.find((proj) => proj.id === activeProjectId.value) ?? null
  );

  function setToken(newToken: Partial<Token>) {
    token.value = { ...token.value, ...newToken };
  }

  function setUser(newUser: User) {
    user.value = newUser;
  }

  function setAccounts(list: Account[]) {
    accounts.value = list;
  }

  function setProjects(list: Project[]) {
    projects.value = list;
  }

  function setActiveAccount(accountId: string | null) {
    activeAccountId.value = accountId;
  }

  function setActiveProject(projectId: string | null) {
    activeProjectId.value = projectId;
  }

  function setTempCredentials(email: string, password: string) {
    tempCredentials.value = { email, password };
  }

  function clearTempCredentials() {
    tempCredentials.value = null;
  }

  function clearAuth() {
    token.value = { token: null, refreshToken: null };
    user.value = null;
    accounts.value = [];
    projects.value = [];
    activeAccountId.value = null;
    activeProjectId.value = null; 
    clearTempCredentials();

  }

  function resetStore() {
    clearTempCredentials();
  }

  return {
    token,
    user,
    accounts,
    projects,
    activeAccountId,
    activeProjectId,
    tempCredentials,

    activeAccount,
    activeProject,

    setToken,
    setUser,
    setAccounts,
    setProjects,
    setActiveAccount,
    setActiveProject,
    setTempCredentials,
    clearTempCredentials,
    clearAuth,
    resetStore,
  };
});