import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  users: [],
  filteredUsers: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term }, false);
    get().filterUsers();
  },
}));
