export default function useApiRoutes() {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;
  const localPath = `${config.public.host}/api`;
  const localapi = `/api`;

  return {
    auth: {
      login: `${BASE}/login`,
      register: `${BASE}/register`,
    },

    accounts: `https://beta.beastscan.com/api/v1/accounts`,
    projects: `https://beta.beastscan.com/api/v1/accounts[ID]/projects`,

    user: {
      profile: `${BASE}/v1/me`,
      profileUpdate: `${BASE}/user/profile/update`,
    },
    campaigns: `${localPath}/campaigns`,
    leaddata: `${localapi}/leaddata`,
  };
}
