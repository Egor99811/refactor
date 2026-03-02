import { create } from "zustand";
import { orders as initialOrders } from "../mockData";
import { createOrder } from "../utils/hooks/useOrderUtils";
import { emulateApiCall } from "../utils/api";

export const useOrdersStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  setOrders: (orders) => set({ orders }),
  createOrder: (order) => {
    const newOrder = createOrder(get().orders, order);
    const promise = emulateApiCall(newOrder, "Ошибка при создании заказа");
    promise
      .then(() => {
        set((state) => ({ orders: [...state.orders, newOrder] }));
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error);
      });
  },
  updateOrder: ({ id, updates }) => {
    const index = get().orders.findIndex((order) => order.id === id);
    if (index === -1) {
      console.error("Заказ не найден для обновления:", id);
      return;
    }
    const updatedOrder = { ...get().orders[index], ...updates };
    const promise = emulateApiCall(
      updatedOrder,
      "Ошибка при обновлении заказа",
    );
    promise
      .then(() => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === id) return updatedOrder;
            return order;
          }),
        }));
      })
      .catch((error) => {
        console.error("Ошибка обновления заказа:", error);
      });
  },
  deleteOrder: (id) => {
    const promise = emulateApiCall(id, "Ошибка при удалении заказа");
    promise
      .then(() => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Ошибка удаления заказа:", error);
      });
  },
  fetchOrders: () => {
    set({ isLoading: true });
    const promise = emulateApiCall(
      initialOrders,
      "Ошибка при загрузке заказов",
    );

    promise
      .then((data) => set({ orders: data }))
      .catch((error) => {
        set({ error: error.message });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
