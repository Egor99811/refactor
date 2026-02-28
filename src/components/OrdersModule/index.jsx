import { Button } from "@mantine/core";
import { useOrders } from "../../hooks/useOrders.js";
import { useModal } from "../../hooks/useModal.jsx";
import FilteredOrderList from "../FilteredOrderList/index.jsx";
import OrderModals from "../OrderModals/index.jsx";
import { useEffect } from "react";
import { orders as initialOrders } from "../../mockData.js";
import { OrderReducerActionsEnums } from "../../constants/useOrders";

export function OrdersModule({ users, filters }) {
  const { orders, dispatchOrder } = useOrders();
  const { modal, openModal, closeModal } = useModal();

  useEffect(() => {
    setTimeout(() => {
      dispatchOrder({
        type: OrderReducerActionsEnums.SET_ORDERS,
        payload: initialOrders,
      });
    }, 100); // Симуляция задержки загрузки данных
  }, [dispatchOrder]);

  return (
    <>
      <Button color="green" size="md" onClick={() => openModal(null)} mb="xl">
        + Создать заказ
      </Button>

      <FilteredOrderList
        orders={orders}
        users={users}
        filters={filters}
        dispatchOrder={dispatchOrder}
        openModal={openModal}
      />

      <OrderModals
        modal={modal}
        openModal={openModal}
        closeModal={closeModal}
        dispatchOrder={dispatchOrder}
      />
    </>
  );
}
