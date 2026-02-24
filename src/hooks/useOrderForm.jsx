import { useCallback, useState } from "react";

export function useOrderForm() {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const createOrder = useCallback(() => {
    setEditingOrder(null);
    setShowForm(true);
  }, []);

  const updateOrder = useCallback((order) => {
    setEditingOrder(order);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingOrder(null);
  }, []);

  return {
    showForm,
    editingOrder,
    createOrder,
    updateOrder,
    closeForm,
  };
}
