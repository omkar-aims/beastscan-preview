  import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "~/stores/userStore";
import type { LoginSchema } from "~/schemas/auth";
import type { LoginResponse } from "~/types/auth";

export const useLogin = (options?: { redirect?: boolean }) => {
 const { redirect = true } = options || {};
  const routes = useApiRoutes();
  const userStore = useUserStore();
  const router = useRouter();

  const tokenCookie = useCookie<string | null>("token");
  const refreshTokenCookie = useCookie<string | null>("refreshToken");
  const refreshTokenExpiration = useCookie<number | null>(
    "refreshTokenExpiration"
  );

  const { mutateAsync, status, error } = useMutation<
    LoginResponse,
    Error,
    LoginSchema
  >({
    mutationFn: async (credentials) => {
      return await $fetch<LoginResponse>(routes.auth.login, {
        method: "POST",
        body: credentials,
      });
    },

    onSuccess: async (res) => {
      userStore.setToken({
        token: res.token,
        refreshToken: res.refresh_token,
      });

      tokenCookie.value = res.token;
      refreshTokenCookie.value = res.refresh_token;
      refreshTokenExpiration.value = res.refresh_token_expiration;

      if (redirect) {
        await router.replace("/dashboard");
      }
    },
  });

  const logout = () => {
    userStore.resetStore();
    tokenCookie.value = null;
    refreshTokenCookie.value = null;
    refreshTokenExpiration.value = null;
  };

  return {
    login: mutateAsync,
    logout,
    status,
    error,
  };
};
