import { getOrdersWithUserData } from "../../utils/hooks/useOrderUtils";
import OrderList from "../OrderList";
import { useMemo, useCallback, memo } from "react";
import { OrderReducerActionsEnums } from "../../hooks/useOrders";
import { getFilteredOrders } from "../../utils/components/orderList";
import { MODALS_TYPES_ENUMS } from "../../hooks/useModal";

function FilteredOrderList({
  orders,
  users,
  filters,
  dispatchOrder,
  openModal,
}) {
  console.log("render FilteredOrderList");

  const ordersWithUserData = useMemo(
    () => getOrdersWithUserData(orders, users),
    [orders, users],
  );

  const filteredOrders = useMemo(
    () => getFilteredOrders(ordersWithUserData, filters),
    [ordersWithUserData, filters],
  );

  const handleDeleteOrder = useCallback(
    (orderId) => {
      if (window.confirm("Вы уверены, что хотите удалить этот заказ?")) {
        dispatchOrder({
          type: OrderReducerActionsEnums.DELETE_ORDER,
          payload: orderId,
        });
      }
    },
    [dispatchOrder],
  );

  const handleViewOrder = useCallback(
    (order) => {
      openModal(order, MODALS_TYPES_ENUMS.DETAILS);
    },
    [openModal],
  );

  return (
    <>
      <OrderList
        orders={filteredOrders}
        onDeleteOrder={handleDeleteOrder}
        onViewOrder={handleViewOrder}
        onEditOrder={openModal}
      />
    </>
  );
}

export default memo(FilteredOrderList);
