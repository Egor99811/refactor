// Получение заказа по ID
export function getOrderById(orders, orderId) {
  return orders.find((order) => order.id === orderId);
}

// Получение заказов пользователя
export function getUserOrders(orders, userId) {
  return orders.filter((order) => order.userId === userId);
}

// Получение заказов с информацией о пользователе
export function getOrdersWithUserData(orders, users) {
  return orders.map((order) => ({
    ...order,
    user: users.find((u) => u.id === order.userId),
  }));
}

// Получение заказов с полной информацией
export function getOrdersWithFullDetails(orders, users, products) {
  return orders.map((order) => ({
    ...order,
    user: users.find((u) => u.id === order.userId),
    items: order.items.map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    })),
  }));
}

export function createOrder(orders, orderData) {
  return {
    id: Math.max(...orders.map((o) => o.id)) + 1,
    orderDate: new Date().toISOString(),
    status: "pending",
    totalAmount: orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
    ...orderData,
  };
}
