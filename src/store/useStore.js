import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch("/data/user_list.json");
          const data = await response.json();
          const user = data.find((u) => u.userEmail === email);

          if (user && password) {
            const userSession = {
              userName: user.userName,
              userEmail: user.userEmail,
              userRole: user.userRole,
              lastLoggedInAt: new Date().toISOString(),
            };

            set({
              user: userSession,
              isAuthenticated: true,
              error: null,
            });

            return true;
          } else {
            set({ error: "Invalid credentials" });
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          set({ error: "Login failed. Please try again." });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
