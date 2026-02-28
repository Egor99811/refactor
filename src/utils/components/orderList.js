/**
 * возвращает отфильтрованные заказы
 * @param {Object} formData - заказы
 * @param {Object} formData - фильтры
 * @returns {Array} отфильтрованные заказы
 */
export function getFilteredOrders(ordersWithDetails, filters) {
  if (ordersWithDetails.length === 0) return [];

  const { status, userId, search } = filters;
  const normalizedId = parseInt(userId);
  const normalizedSearch = search.toLowerCase();

  return ordersWithDetails.filter((order) => {
    // Фильтр по статусу
    if (status && order.status !== status) return false;

    if (userId && order.userId !== normalizedId) return false;

    // Поиск
    if (search) {
      const matchesOrderId = order.id.toString().includes(normalizedSearch);
      const matchesUserName = order.user?.name
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesUserEmail = order.user?.email
        .toLowerCase()
        .includes(normalizedSearch);

      if (!matchesOrderId && !matchesUserName && !matchesUserEmail) {
        return false;
      }
    }

    return true;
  });
}
