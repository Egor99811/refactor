import { create } from "zustand";
import { users as mockUsers } from "../mockData";

export const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,

  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    set({ isLoading: true });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 100); // Симуляция задержки загрузки данных
    })
      .then((data) => {
        set({ users: data });
      })
      .catch((error) => {
        console.error("Ошибка загрузки пользователей:", error);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
