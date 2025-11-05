import { useMutation } from "@tanstack/vue-query";
import type { RegisterSchema } from "~/schemas/auth";
import type { RegisterResponse } from "~/types/auth";

export const useRegister = () => {
  const router = useRouter();
  const routes = useApiRoutes();

  const mutation = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      // Only send fields that have values
      const body: any = {
        email: credentials.email,
        password: credentials.password,
      };

      // Add optional fields if they exist
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

    onSuccess: async () => {
      router.replace("/login");
    },
  });

  return {
    register: mutation.mutateAsync,
    status: mutation.status,
    error: mutation.error,
    isPending: mutation.isPending,
  };
};