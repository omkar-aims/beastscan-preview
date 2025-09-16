import type { UserProfileResponse } from "~/types/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const protectedPrefixes = ["/dashboard", "/profile"];

  const isProtected = protectedPrefixes.some((prefix) =>
    to.path.startsWith(prefix)
  );
  if (!isProtected) return;

  const token = useCookie<string | null>("token");
  const { user, setUser } = useAuthStore();

  if (!token.value) return navigateTo("/login");
  if (user) return;

  const apiRoutes = useApiRoutes();
  const { data, error } = await useFetch<UserProfileResponse>(
    apiRoutes.user.profile,
    {
      headers: { Authorization: `Bearer ${token.value}` },
      key: "current-user",
    }
  );

  if (error.value || !data.value?.result) {
    token.value = null;
    return navigateTo("/login");
  }

  setUser(data.value.result, token.value);
});
