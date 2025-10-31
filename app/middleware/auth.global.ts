import type { UserProfileResponse } from "~/types/auth";
import { useUserStore } from "@/stores/userStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const protectedPrefixes = ["/dashboard", "/profile"];
  const isProtected = protectedPrefixes.some((prefix) =>
    to.path.startsWith(prefix)
  );

  if (!isProtected) return;

  const tokenCookie = useCookie<string | null>("token");
  const refreshTokenCookie = useCookie<string | null>("refreshToken");
  const userStore = useUserStore();

  if (!tokenCookie.value) navigateTo("/login");

  const apiRoutes = useApiRoutes();

  const { data, error } = await useFetch<UserProfileResponse>(
    apiRoutes.user.profile,
    {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
      key: "current-user",
    }
  );

  if (error.value) {
    tokenCookie.value = null;
    refreshTokenCookie.value = null;
    return navigateTo("/login");
  }

  if (data.value) {
    userStore.setUser(data.value?.data);
    userStore.setToken({
      token: tokenCookie.value,
      refreshToken: refreshTokenCookie.value,
    });
  }
});
