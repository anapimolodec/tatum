import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,
      fetchTasks: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/data/task_list.json");
          if (!response.ok) throw new Error("Failed to fetch tasks");
          const tasks = await response.json();
          set({ tasks, isLoading: false, error: null });
        } catch (error) {
          set({ error: error.message, isLoading: false });
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
