// Константы для компонента OrderForm
export const STATUS_ENUMS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

Object.freeze(STATUS_ENUMS);

export const STATUS_OPTIONS = [
  { value: STATUS_ENUMS.PENDING, label: "Ожидает обработки" },
  { value: STATUS_ENUMS.PROCESSING, label: "Обрабатывается" },
  { value: STATUS_ENUMS.SHIPPED, label: "Отправлен" },
  { value: STATUS_ENUMS.DELIVERED, label: "Доставлен" },
  { value: STATUS_ENUMS.CANCELLED, label: "Отменен" },
];

export const DEFAULT_FORM_STATE = {
  userId: "",
  deliveryAddress: "",
  status: "pending",
  items: [],
};

export const DEFAULT_QUANTITY = 1;
