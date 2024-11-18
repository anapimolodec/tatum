import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email) => {
    try {
      const response = await fetch("/data/user_list.jsons.");
      const data = await response.json();
      const user = data.users.find((u) => u.userEmail === email);

      if (user) {
        set({ user, isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
