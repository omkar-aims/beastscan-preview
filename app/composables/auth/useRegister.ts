import { useMutation } from "@tanstack/vue-query";
import type { RegisterSchema } from "~/schemas/auth";
import type { RegisterResponse } from "~/types/auth";
import { useUserStore } from "~/stores/userStore";

export const useRegister = () => {
  const routes = useApiRoutes();
  const userStore = useUserStore();

  const mutation = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      userStore.setTempCredentials(credentials.email, credentials.password);

      const body: any = {
        email: credentials.email,
        password: credentials.password,
      };

      if (credentials.accountName) {
        body.accountName = credentials.accountName;
      }
      if (credentials.projectName) {
        body.projectName = credentials.projectName;
      }
      if (credentials.referralCode) {
        body.referralCode = credentials.referralCode;
      }

      return await $fetch<RegisterResponse>(routes.auth.register, {
        method: "POST",
        body,
      });
    },
  });

  return {
    register: mutation.mutateAsync,
    status: mutation.status,
    error: mutation.error,
    isPending: mutation.isPending,
  };
};
