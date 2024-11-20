import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      error: null,
      isLoading: false,

      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/data/user_list.json");
          const users = await response.json();
          set({ users, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

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
              users: data,
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
          users: [],
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
      }),
    }
  )
);
