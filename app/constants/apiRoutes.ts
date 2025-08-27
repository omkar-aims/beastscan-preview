export default () => {
  const config = useRuntimeConfig();
  const BASE = config.public.apiBase;

  return {
    auth: {
      login: `${BASE}/login_check`,
    },

    user: {
      profile: `${BASE}/user/profile`,
    },
  };
};
