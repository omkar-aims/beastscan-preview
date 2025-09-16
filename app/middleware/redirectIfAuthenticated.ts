export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>("token");
  const refreshTokenExpiration = useCookie<number | null>(
    "refreshTokenExpiration"
  );

  const authPages = ["/login", "/register"];
  const protectedPages = ["/dashboard", "/profile"];

  const isTokenValid =
    !!token.value &&
    !!refreshTokenExpiration.value &&
    refreshTokenExpiration.value > Date.now();

  if (isTokenValid && authPages.includes(to.path)) {
    return navigateTo("/dashboard");
  }

  if (!isTokenValid && protectedPages.includes(to.path)) {
    return navigateTo("/login");
  }
});
