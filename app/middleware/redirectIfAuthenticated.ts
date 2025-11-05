import { useUserStore } from "~/stores/userStore";
import type { UserProfileResponse } from "~/types/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const tokenCookie = useCookie<string | null>("token");
  const refreshTokenCookie = useCookie<string | null>("refreshToken");
  const refreshTokenExpiration = useCookie<number | null>(
    "refreshTokenExpiration"
  );

  const authPages = ["/login", "/register"];
  const protectedPages = ["/dashboard", "/profile"];

  const isTokenValid =
    !!tokenCookie.value &&
    !!refreshTokenExpiration.value &&
    refreshTokenExpiration.value > Date.now();

  const userStore = useUserStore();
  const { user, setUser, setToken, clearAuth } = userStore;

  if (isTokenValid && authPages.includes(to.path)) {
    return navigateTo("/dashboard");
  }
  if (!isTokenValid && protectedPages.includes(to.path)) {
    clearAuth();
    tokenCookie.value = null;
    refreshTokenCookie.value = null;
    return navigateTo("/login");
  }

  if (isTokenValid && !user) {
    const apiRoutes = useApiRoutes();

    const { data, error } = await useFetch<UserProfileResponse>(
      apiRoutes.user.profile,
      {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
        key: "current-user",
      }
    );

    if (error.value || !data.value?.data) {
      tokenCookie.value = null;
      refreshTokenCookie.value = null;
      clearAuth();
      return navigateTo("/login");
    }

    setUser(data.value.data);
    setToken({
      token: tokenCookie.value,
      refreshToken: refreshTokenCookie.value,
    });
  }
});
