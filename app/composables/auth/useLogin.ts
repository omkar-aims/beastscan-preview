import { ref } from "vue";
import apiRoutes from "~/constants/apiRoutes";
import type { LoginSchema } from "~/schemas/auth";
import type { LoginResponse } from "~/types/auth";

export const useLogin = () => {
  const routes = apiRoutes();

  const token = useCookie<string | null>("token");
  const refreshToken = useCookie<string | null>("refreshToken");
  const refreshTokenExpiration = useCookie<number | null>(
    "refreshTokenExpiration"
  );

  const pending = ref(false);
  const error = ref<string | null>(null);

  const login = async (
    credentials: LoginSchema
  ): Promise<LoginResponse | undefined> => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.data.message || "Something went wrong";
    } finally {
      pending.value = false;
    }
  };

  return { login, pending, error };
};
