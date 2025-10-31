import { watch } from "vue";
import { defineStore } from "pinia";
import type { Token, Account, Project } from "@/types";
import type { User } from "~/types/user";

export const useUserStore = defineStore("user", () => {
  const apiRoutes = useApiRoutes();

  const token = ref<Token>({
    token: null,
    refreshToken: null,
  });

  const user = ref<User | null>(null);

  const accounts = ref<Account[]>([]);
  const projects = ref<Project[]>([]);

  const activeAccountId = ref<string | null>(null);
  const activeProjectId = ref<string | null>(null);

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

  function resetStore() {
    token.value = { token: null, refreshToken: null };
    accounts.value = [];
    projects.value = [];
    activeAccountId.value = null;
    activeProjectId.value = null;
  }

  async function fetchAccounts() {
    if (!token.value.token) return;
    const { data }: { data: Account[] } = await $fetch(apiRoutes.accounts, {
      headers: { Authorization: `Bearer ${token.value.token}` },
    });

    console.log(data);

    setAccounts(data);
    if (data[0]) setActiveAccount(data[0].id);
  }

  async function fetchProjects() {
    if (!activeAccountId.value || !token.value.token) return;
    const { data }: { data: Project[] } = await $fetch(
      apiRoutes.projects.replace("[ID]", `/${activeAccountId.value}`),
      {
        headers: { Authorization: `Bearer ${token.value.token}` },
      }
    );

    setProjects(data);
    if (data[0]) setActiveProject(data[0].id);
  }

  watch(
    () => token.value.token,
    async (newToken) => {
      if (newToken) await fetchAccounts();
    }
  );

  watch(
    () => activeAccountId.value,
    async (newId) => {
      if (newId) await fetchProjects();
    }
  );

  return {
    token,
    user,
    accounts,
    projects,
    activeAccountId,
    activeProjectId,

    activeAccount,
    activeProject,

    setToken,
    setUser,
    setAccounts,
    setProjects,
    setActiveAccount,
    setActiveProject,
    resetStore,
  };
});
