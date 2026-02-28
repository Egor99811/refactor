import { useReducer } from "react";

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS": {
      return action.payload;
    }
    case "CREATE_ORDER": {
      const orderData = action.payload;
      const orders = state;
      const newOrder = {
        id: Math.max(...orders.map((o) => o.id)) + 1,
        orderDate: new Date().toISOString(),
        status: "pending",
        totalAmount: orderData.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
        ...orderData,
      };
      const newState = [...state, newOrder];
      return newState;
    }
    case "UPDATE_ORDER": {
      const orderId = action.payload.id;
      const updates = action.payload.updates;

      return state.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, ...updates };
          // Пересчитываем общую сумму если изменились товары
          if (updates.items) {
            updatedOrder.totalAmount = updates.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );
          }
          return updatedOrder;
        }
        return order;
      });
    }
    case "DELETE_ORDER":
      return state.filter((order) => order.id !== action.payload);
    default:
      return state;
  }
};

export function useOrders() {
  const [orders, dispatchOrder] = useReducer(orderReducer, []);

  return { orders, dispatchOrder };
}
