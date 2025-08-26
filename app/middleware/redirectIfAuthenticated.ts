export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>("token");

  const authPages = ["/login", "/register"];

  if (token.value && authPages.includes(useRoute().path)) {
    return navigateTo("/dashboard");
  }
});
