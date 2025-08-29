import apiRoutes from "~/constants/apiRoutes";
import type { UserProfileResponse } from "~/types/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  // const publicPaths = ["/", "/login", "/register"];
  // if (publicPaths.includes(to.path)) return;
  // const token = useCookie<string | null>("token");
  // const { user, setUser } = useAuthStore();
  // if (!token.value) return navigateTo("/login");
  // if (user) return;
  // try {
  //   const routes = apiRoutes();
  //   const { data, error } = await useFetch<UserProfileResponse>(
  //     routes.user.profile,
  //     {
  //       headers: { Authorization: `Bearer ${token.value}` },
  //       key: "current-user",
  //     }
  //   );
  //   if (error.value || !data.value?.result) {
  //     token.value = null;
  //     return navigateTo("/login");
  //   }
  //   setUser(data.value.result, token.value);
  // } catch (err) {
  //   console.error("Failed to fetch user:", err);
  //   token.value = null;
  //   return navigateTo("/login");
  // }
});
