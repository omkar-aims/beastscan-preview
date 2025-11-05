import { useMutation } from "@tanstack/vue-query";
import type { RegisterSchema } from "~/schemas/auth";
import type { RegisterResponse } from "~/types/auth";

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      return await $fetch<RegisterResponse>('https://beta.beastscan.com/api/v1/signup', {
        method: "POST",
        body: credentials,
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