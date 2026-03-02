import { getOrdersWithUserData } from "../../utils/hooks/useOrderUtils";
import OrderList from "../OrderList";
import { useMemo, useCallback, memo } from "react";
import { getFilteredOrders } from "../../utils/components/orderList";
import { MODALS_TYPES_ENUMS } from "../../constants/useModal";
import { useOrdersStore } from "../../state/ordersState.jsx";
import { useFiltersStore } from "../../state/filtersState.jsx";
import { FILTERS_TYPES } from "../../constants/orderFilters.js";
import { useUsersStore } from "../../state/usersState.jsx";

function FilteredOrderList({ openModal }) {
  console.log("render FilteredOrderList");
  const status = useFiltersStore((state) => state[FILTERS_TYPES.STATUS]);
  const userId = useFiltersStore((state) => state[FILTERS_TYPES.USER_ID]);
  const search = useFiltersStore((state) => state[FILTERS_TYPES.SEARCH]);
  const orders = useOrdersStore((state) => state.orders);
  const deleteOrder = useOrdersStore((state) => state.deleteOrder);
  const users = useUsersStore((state) => state.users);

  const filteredOrders = useMemo(() => {
    const ordersWithUserData = getOrdersWithUserData(orders, users);
    return getFilteredOrders(ordersWithUserData, { status, userId, search });
  }, [orders, users, status, userId, search]);

  const handleDeleteOrder = useCallback(
    (orderId) => {
      if (window.confirm("Вы уверены, что хотите удалить этот заказ?"))
        deleteOrder(orderId);
    },
    [deleteOrder],
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
