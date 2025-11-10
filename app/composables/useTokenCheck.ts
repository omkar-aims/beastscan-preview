export const useAuth = () => {
  const token = useCookie<string | null>('token',{sameSite:'lax'});
  const isAuthenticated = computed(() => !!token.value);
  
  return {
    token,
    isAuthenticated,
  };
};