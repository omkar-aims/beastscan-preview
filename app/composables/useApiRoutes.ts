export default function useApiRoutes() {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;
  const localPath = `${config.public.host}/api`;
  const localapi = `/api`;

  return {
    auth: {
      login: `${BASE}/login_check`,
      register: `${BASE}/register`,
    },
    user: {
      profile: `${BASE}/user/profile`,
      profileUpdate: `${BASE}/user/profile/update`,
    },
    campaigns: `${localPath}/campaigns`,
    leaddata: `${localapi}/leaddata`,
  };  
}
