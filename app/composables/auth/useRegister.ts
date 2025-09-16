import { ref } from "vue";
import type { RegisterSchema } from "~/schemas/auth";
import type { RegisterResponse } from "~/types/auth";

export const useRegister = () => {
  const apiRoutes = useApiRoutes();

  const pending = ref(false);
  const error = ref<string | null>(null);

  const register = async (
    credentials: RegisterSchema
  ): Promise<RegisterResponse | undefined> => {
    pending.value = true;
    error.value = null;

    try {
      const res: RegisterResponse = await $fetch(apiRoutes.auth.register, {
        method: "POST",
        body: credentials,
      });

      return res;
    } catch (err: any) {
      error.value = err.data?.message || "Something went wrong";
    } finally {
      pending.value = false;
    }
  };
  return { register, pending, error };
};
