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

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          const newState = {
            user: data.user,
            users: data.users || [],
            tasks: data.tasks || [],
            isAuthenticated: true,
            error: null,
            isLoading: false,
          };

          set(newState);

          return true;
        } catch (error) {
          console.error("Login error:", error);
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

        if (formData.taskType === "물품구매") {
          newTask.productName = formData.productName || "";
          newTask.productCount = formData.productCount || "";
        } else if (formData.taskType === "택배요청") {
          newTask.recipient = formData.recipient || "";
          newTask.recipientPhone = formData.recipientPhone || "";
          newTask.recipientAddress = formData.recipientAddress || "";
        }

        set((state) => {
          const newState = {
            ...state,
            tasks: [...state.tasks, newTask],
          };

          return newState;
        });

        return newTask;
      },

      logout: () => {
        const newState = {
          user: null,
          users: [],
          tasks: [],
          isAuthenticated: false,
          error: null,
          isLoading: false,
        };
        set(newState);
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => {
        const persistedState = {
          user: state.user,
          users: state.users,
          tasks: state.tasks,
          isAuthenticated: state.isAuthenticated,
        };

        return persistedState;
      },
    }
  )
);

userStore.subscribe((state) => {
  console.log("Store updated:", state);
});
