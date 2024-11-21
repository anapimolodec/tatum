// src/lib/store/userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      tasks: [],
      isAuthenticated: false,
      error: null,
      isLoading: false,
      validateSession: () => {
        const state = get();
        if (state.isAuthenticated && !state.user) {
          state.logout();
        }
      },
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/data?type=users");
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const users = await response.json();
          set({ users: users || [], isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          console.log(data);
          set({
            user: data.user,
            users: data.users || [],
            tasks: data.tasks || [],
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            error: error.message,
            isLoading: false,
          });
          return false;
        }
      },
      createTask: (formData) => {
        const taskDescription = `[ ${formData.taskType} ] Description for task ${formData.taskName}`;

        const newTask = {
          taskType: formData.taskType,
          taskName: formData.taskName,
          taskDescription: taskDescription,
          assignee: formData.assignee,
          reporter: formData.reporter,
          status: "Created",
          dueDate: new Date(formData.dueDate).toISOString(),
          createdAt: new Date().toISOString(),
          completedAt: null,
        };

        if (formData.taskType === "물품 구매") {
          newTask.productName = formData.productName || "";
          newTask.productCount = formData.productCount || "";
        } else if (formData.taskType === "택배요청") {
          newTask.recipient = formData.recipient || "";
          newTask.recipientPhone = formData.recipientPhone || "";
          newTask.recipientAddress = formData.recipientAddress || "";
        }

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));

        return newTask;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        tasks: state.tasks,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
