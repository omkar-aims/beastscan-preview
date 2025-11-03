import type { UserProfileResponse } from "~/types/auth";
import type { Account, Project } from "~/types";
import { useUserStore } from "@/stores/userStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const protectedPrefixes = ["/dashboard", "/profile", "/design"];
  const isProtected = protectedPrefixes.some((prefix) =>
    to.path.startsWith(prefix)
  );
  if (!isProtected) return;

  const tokenCookie = useCookie<string | null>("token");
  const refreshTokenCookie = useCookie<string | null>("refreshToken");
  if (!tokenCookie.value) return navigateTo("/login");

  const userStore = useUserStore();
  const apiRoutes = useApiRoutes();

  userStore.setToken({
    token: tokenCookie.value,
    refreshToken: refreshTokenCookie.value,
  });

  const userProfile = useState<UserProfileResponse | null>(
    "user-profile",
    () => null
  );

  if (!userProfile.value) {
    try {
      const data = await $fetch<UserProfileResponse>(apiRoutes.user.profile, {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      });

      userProfile.value = data;
      userStore.setUser(data.data);
    } catch {
      tokenCookie.value = null;
      refreshTokenCookie.value = null;
      return navigateTo("/login");
    }
  }

  const accounts = useState<Account[] | null>("accounts", () => null);

  if (!accounts.value || accounts.value.length === 0) {
    const { data } = await $fetch<{ data: Account[] }>(
      "https://beta.beastscan.com/api/v1/accounts",
      {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      }
    );
    accounts.value = data;

    if (data && data[0]) {
      userStore.setAccounts(data);
      if (!userStore.activeAccountId) userStore.setActiveAccount(data[0].id);
    }
  }

  const projects = useState<Project[] | null>("projects", () => null);

  if (!projects.value && userStore.activeAccountId) {
    const { data } = await $fetch<{ data: Project[] }>(
      `https://beta.beastscan.com/api/v1/accounts/${userStore.activeAccountId}/projects`,
      {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      }
    );
    projects.value = data;

    if (data && data[0]) {
      userStore.setProjects(data);
      if (!userStore.activeProjectId) userStore.setActiveProject(data[0].id);
    }
  }
});
