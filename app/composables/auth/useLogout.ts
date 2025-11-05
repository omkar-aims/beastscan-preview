import { useUserStore } from "~/stores/userStore";

export const useLogout = () => {
  const userStore = useUserStore();
  const router = useRouter();

  const logout = async () => {
    
    // Clear store
    userStore.clearAuth();
    
    // Clear cookies
    const tokenCookie = useCookie("token");
    const refreshTokenCookie = useCookie("refreshToken");
    const refreshTokenExpiration = useCookie("refreshTokenExpiration");
    
    tokenCookie.value = null;
    refreshTokenCookie.value = null;
    refreshTokenExpiration.value = null;
    
    await router.replace("/login");
  };

  return { logout };
};
// import { useRouter } from "vue-router";
// import { useQueryClient } from "@tanstack/vue-query";
// import { useUserStore } from "~/stores/userStore";
// import { useNewFormStore } from "~/stores/useNewFormStore";
// import { useNewOfferStore } from "~/stores/useNewOfferStore";
// import { useNewVCardStore } from "~/stores/useNewVCardStore";
// import { useQRStore } from "~/stores/useQRStore";
// import { useBuilderStore } from "~/stores/useBuilderStore";

// export function useLogout() {
//   const router = useRouter();
//   const queryClient = useQueryClient(); 

//   // Auth/session cookies
//   const tokenCookie = useCookie<string | null>("token");
//   const refreshTokenCookie = useCookie<string | null>("refreshToken");
//   const refreshTokenExpiration = useCookie<number | null>(
//     "refreshTokenExpiration"
//   );
//   const userStore = useUserStore();
//   const formStore = useNewFormStore();
//   const offerStore = useNewOfferStore();
//   const vcardStore = useNewVCardStore();
//   const qrStore = useQRStore();
//   const builderStore = useBuilderStore();

//   async function logout() {
//     try {

//       tokenCookie.value = null;
//       refreshTokenCookie.value = null;
//       refreshTokenExpiration.value = null;

//       userStore.setToken({ token: null, refreshToken: null });
//       userStore.setUser(null as any);
//       userStore.setAccounts([]);
//       userStore.setProjects([]);
//       userStore.setActiveAccount(null);
//       userStore.setActiveProject(null);

//       formStore.resetForm();
//       offerStore.resetOffer();
//       vcardStore.resetVCard();
//       qrStore.resetTheme();
//       builderStore.close();

//       try {
//         if (queryClient && typeof queryClient.clear === "function") {
//           queryClient.clear();
//         }
//       } catch (e) {
//         console.error("Failed to clear query cache:", e);
//       }

//       console.log("Redirecting to login...");
//       await router.replace("/login");
//       console.log("Logout complete!");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       await router.replace("/login");
//     }
//   }
//   return { logout };
// }
