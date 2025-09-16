export default function useApiRoutes() {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;
  const localPath = `${config.public.host}/api`;

  return {
    auth: {
      login: `${BASE}/login_check`,
    },
    user: {
      profile: `${BASE}/user/profile`,
    },
    campaigns: `${localPath}/campaigns`,
  };
}
