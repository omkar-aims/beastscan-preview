import { ref } from "vue";
import type { LoginSchema } from "~/schemas/auth";
import type { LoginResponse } from "~/types/auth";

export const useLogin = () => {
  const routes = useApiRoutes();

  const token = useCookie<string | null>("token", { path: "/" });
  const refreshToken = useCookie<string | null>("refreshToken", { path: "/" });
  const refreshTokenExpiration = useCookie<number | null>(
    "refreshTokenExpiration",
    { path: "/" }
  );

      const pending = ref(false);
      const error = ref<string | null>(null);

  const login = async (
    credentials: LoginSchema
  ): Promise<LoginResponse | null> => {
    pending.value = true;
    error.value = null;

    try {
      const res: LoginResponse = await $fetch(routes.auth.login, {
        method: "POST",
        body: credentials,
      });

      token.value = res.token;
      refreshToken.value = res.refresh_token;
      refreshTokenExpiration.value = res.refresh_token_expiration;

      return res;
    } catch (err: any) {
      error.value =
        err?.data?.message || err?.message || "Something went wrong";
      return null;
    } finally {
      pending.value = false;
    }
  };

  return { login, pending, error };
};
