export default () => {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;

  return {
    auth: {
      login: `${BASE}/login_check`,
      register:`${BASE}/register`
    },

    user: {
      profile: `${BASE}/user/profile`,
      profileUpdate : `${BASE}/user/profile/update`
    },
  };
};
