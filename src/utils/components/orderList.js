/**
 * возвращает отфильтрованные заказы
 * @param {Object} formData - заказы
 * @param {Object} formData - фильтры
 * @returns {Array} отфильтрованные заказы
 */
export function getFilteredOrders(ordersWithDetails, filters) {
  return ordersWithDetails.filter((order) => {
    // Фильтр по статусу
    if (filters.status && order.status !== filters.status) return false;

    if (filters.userId && order.userId !== parseInt(filters.userId))
      return false;

    // Поиск
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesOrderId = order.id.toString().includes(searchLower);
      const matchesUserName = order.user?.name
        .toLowerCase()
        .includes(searchLower);
      const matchesUserEmail = order.user?.email
        .toLowerCase()
        .includes(searchLower);

      if (!matchesOrderId && !matchesUserName && !matchesUserEmail) {
        return false;
      }
    }

    return true;
  });
}
