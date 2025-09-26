export function useRedirectMiddleware() {
  function redirect(to: string) {
    return () => navigateTo(to);
  }

  return { redirect };
}
