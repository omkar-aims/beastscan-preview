export default function useApiRoutes() {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;
  const localapi = `/api`;

  return {
    auth: {
      login: `${BASE}/login`,
      register: `https://beta.beastscan.com/api/v1/signup`,
    },

    accounts: {
      all: `https://beta.beastscan.com/api/v1/accounts`,
      byId: (id: string) => `https://beta.beastscan.com/api/v1/accounts/${id}`,
      update: (id: string) =>
        `https://beta.beastscan.com/api/v1/accounts/${id}`,
    },
    projects: `https://beta.beastscan.com/api/v1/accounts/[ID]/projects`,

    user: {
      profile: `${BASE}/v1/me`,
      profileUpdate: `${BASE}/user/profile/update`,
    },
    campaigns: {
      create: "https://beta.beastscan.com/api/v1/projects/[ID]/campaigns",
      update: "https://beta.beastscan.com/api/v1/campaigns/[ID]",
      projectCampaigns:
        "https://beta.beastscan.com/api/v1/projects/[ID]/campaigns",
      getCampaigns: "https://beta.beastscan.com/api/v1/campaigns/",
      singleCampaign: "https://beta.beastscan.com/api/v1/campaigns/[ID]",
    },
    leaddata: `${localapi}/leaddata`,
  };
}
