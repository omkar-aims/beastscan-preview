import { defineStore } from "pinia";

import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | User,
    token: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
