import { getOrdersWithUserData } from "../../utils/hooks/useOrderUtils";
import OrderList from "../OrderList";
import { useMemo, useCallback, useState, memo } from "react";
import OrderDetails from "../OrderDetails";
import { OrderReducerActionsEnums } from "../../hooks/useOrders";
import { getFilteredOrders } from "../../utils/components/orderList";

function FilteredOrderList({ orders, filters, dispatch, updateOrder }) {
  console.log("render FilteredOrderList");
  const [viewingOrder, setViewingOrder] = useState(null);

  const ordersWithUserData = useMemo(
    () => getOrdersWithUserData(orders),
    [orders]
  );

  const filteredOrders = useMemo(
    () => getFilteredOrders(ordersWithUserData, filters),
    [ordersWithUserData, filters]
  );

  const handleDeleteOrder = useCallback(
    (orderId) => {
      if (window.confirm("Вы уверены, что хотите удалить этот заказ?")) {
        dispatch({
          type: OrderReducerActionsEnums.DELETE_ORDER,
          payload: orderId,
        });
      }
    },
    [dispatch]
  );

  const handleEditOrder = useCallback(
    (order) => {
      updateOrder(order);
      setViewingOrder(null);
    },
    [updateOrder, setViewingOrder]
  );

  const handleCloseDetails = () => {
    setViewingOrder(null);
  };

  return (
    <>
      <OrderList
        orders={filteredOrders}
        onDeleteOrder={handleDeleteOrder}
        onViewOrder={setViewingOrder}
        onEditOrder={handleEditOrder}
      />

      {viewingOrder && (
        <OrderDetails
          order={viewingOrder}
          onClose={handleCloseDetails}
          onEdit={handleEditOrder}
        />
      )}
    </>
  );
}

export default memo(FilteredOrderList);
