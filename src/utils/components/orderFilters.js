import { CLIENT_OPTIONS_HEADER } from "../../constants/orderFilters.js";

/**
 * Создает опции для селекта клиентов
 * @param {Array} users - Массив пользователей
 * @returns {Array} Массив опций для селекта
 */
export const createUserOptions = (users) => {
  return [
    CLIENT_OPTIONS_HEADER,
    ...users.map((user) => ({
      value: user.id.toString(),
      label: user.name,
    })),
  ];
};

/**
 * Проверяет, есть ли активные фильтры
 * @param {Object} filters - Объект с фильтрами
 * @returns {boolean} true если есть активные фильтры
 */
export const hasActiveFilters = (filters) => {
  return !!(filters.status || filters.userId || filters.search);
};
