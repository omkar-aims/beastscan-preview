export const useAuth = () => {
  const token = useCookie<string | null>('token');
  const isAuthenticated = computed(() => !!token.value);
  
  return {
    token,
    isAuthenticated,
  };
};