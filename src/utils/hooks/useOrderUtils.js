import { users, products } from "../../mockData";

// Получение заказа по ID
export function getOrderById(orders, orderId) {
  return orders.find((order) => order.id === orderId);
}

// Получение заказов пользователя
export function getUserOrders(orders, userId) {
  return orders.filter((order) => order.userId === userId);
}

// Получение заказов с информацией о пользователе
export function getOrdersWithUserData(orders) {
  return orders.map((order) => ({
    ...order,
    user: users.find((u) => u.id === order.userId),
  }));
}

// Получение заказов с полной информацией
export function getOrdersWithFullDetails(orders) {
  return orders.map((order) => ({
    ...order,
    user: users.find((u) => u.id === order.userId),
    items: order.items.map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    })),
  }));
}
