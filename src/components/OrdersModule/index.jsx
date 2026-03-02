import { Button } from "@mantine/core";
import { useModal } from "../../hooks/useModal.jsx";
import FilteredOrderList from "../FilteredOrderList/index.jsx";
import OrderModals from "../OrderModals/index.jsx";
import { useEffect } from "react";
import { useOrdersStore } from "../../state/ordersState.jsx";

export function OrdersModule() {
  console.log("OrdersModule render");
  const { modal, openModal, closeModal } = useModal();

  const fetchOrders = useOrdersStore((state) => state.fetchOrders);
  const isLoading = useOrdersStore((state) => state.isLoading);
  const error = useOrdersStore((state) => state.error);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <Button color="green" size="md" onClick={() => openModal(null)} mb="xl">
        + Создать заказ
      </Button>

      {isLoading ? (
        <div>Загрузка заказов...</div>
      ) : error ? (
        <div>Ошибка загрузки заказов: {error}</div>
      ) : (
        <FilteredOrderList openModal={openModal} />
      )}

      <OrderModals
        modal={modal}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
}
