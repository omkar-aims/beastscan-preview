export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};
