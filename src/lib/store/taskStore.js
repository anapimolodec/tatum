import { create } from "zustand";
import { persist } from "zustand/middleware";

export const taskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      error: null,
      isLoading: false,

      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/tasks");
          console.log("RES: ", response);
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const tasks = await response.json();
          set({ tasks: tasks || [], isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      getTasks: () => get().tasks,
    }),
    {
      name: "tasks",
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    }
  )
);
