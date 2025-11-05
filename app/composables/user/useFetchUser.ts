import { useUserStore } from "~/stores/userStore";
import type { User } from "~/types/user";

interface UserApiResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      email: string;
      public_roles: string[];
    };
  };
}

export const useFetchUser = () => {
  const userStore = useUserStore();

  const fetchUser = async () => {
    try {
      const response = await $fetch<UserApiResponse>(
        "https://beta.beastscan.com/api/v1/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userStore.token?.token ?? ""}`,
          },
        }
      );
      // Transform API response to User type
      const user: User = {
        id: response.data.id,
        email: response.data.attributes.email,
        publicRoles: response.data.attributes.public_roles,
      };
      // Set user in store
      userStore.setUser(user);
      return user;
    } catch (error) {
      console.error("[useFetchUser] Failed to fetch user:", error);
      throw error;
    }
  };

  return { fetchUser };
};
