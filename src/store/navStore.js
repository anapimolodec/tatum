import { create } from "zustand";

export const navStore = create((set) => ({
  currentPage: "users",
  setPage: (page) => set({ currentPage: page }),
}));
